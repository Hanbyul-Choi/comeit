import { useMutation } from "@tanstack/react-query";
import { Button, Input, Label, useModal } from "components";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "server/config";
import { FlexColumn } from "styles/mixins";

export const SIGN_UP_MODAL = "SIGN_UP_MODAL";

export const SignUpForm = () => {
  const { unmount } = useModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const signUp = async () => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCredential.user.uid), {
      id: userCredential.user.uid,
      email,
      nickname,
      userImgUrl: ""
    });
  };

  const { mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      setEmail("");
      setPassword("");
      setNickname("");

      unmount(SIGN_UP_MODAL);
    },
    onError: () => {
      console.log("에러");
    }
  });

  const onUseridChangeHandler = event => {
    setEmail(event.target.value);
  };
  const onPasswordChangeHandler = event => {
    setPassword(event.target.value);
  };
  const onNicknameChangeHandler = event => {
    setNickname(event.target.value);
  };

  const submitHandler = event => {
    event.preventDefault();

    mutate();
  };

  // (1) signUp 함수 실행해서 회원가입 ㅇ
  // firebase db에 있는 유저 정보를 가지고 있어야 되니까
  // (2) 유즈 쿼리로 유저 정보 받아오기 (데이터 안에 받음) --> 필요없다
  // 누가 회원가입하면 db에 새로운 유저정보 입력됨
  // 업데이트된 db 유저정보와 직전에 유즈쿼리로 받은 정보는 달라짐
  // (3) 그러니까 다시 데이터 무효화시키고 새로운 데이터로 갈아끼우기 위해 api 함수 실행

  return (
    <FlexColumn gap={12} as="form" onSubmit={submitHandler}>
      <Label variant="text">아이디</Label>
      <Input
        variant="outline"
        placeholder="아이디 입력"
        value={email}
        onChange={onUseridChangeHandler}
      />

      <Label variant="text">닉네임</Label>
      <Input
        variant="outline"
        placeholder="닉네임 입력"
        value={nickname}
        onChange={onNicknameChangeHandler}
      />

      <Label>비밀번호</Label>
      <Input
        variant="outline"
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={onPasswordChangeHandler}
      />

      <Label>비밀번호 확인</Label>
      <Input variant="outline" type="password" placeholder="비밀번호 확인" />

      <Button variant="outline" type="submit">
        회원가입
      </Button>
    </FlexColumn>
  );
};
