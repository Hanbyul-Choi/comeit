import { useMutation } from "@tanstack/react-query";
import { Button, Input, Label, useDialog, useModal } from "components";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "server/config";
import { FlexColumn } from "styles/mixins";

export const SIGN_UP_MODAL = "SIGN_UP_MODAL";

export const SignUpForm = () => {
  const { unmount } = useModal();
  const { Alert } = useDialog();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      setConfirmPassword("");
      setNickname("");

      unmount(SIGN_UP_MODAL);
      Alert("회원가입이 완료되었습니다.");
    },
    onError: error => {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("이미 존재하는 이메일 주소입니다.");
      } else {
        setErrorMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    }
  });

  const isValidEmail = id => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(id);
  };

  const isValidPassword = pw => {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/;
    return passwordRegex.test(pw);
  };

  const onUseridChangeHandler = event => {
    const enteredEmail = event.target.value;
    setEmail(enteredEmail);
    setErrorMessage("");
  };
  const onPasswordChangeHandler = event => {
    setPassword(event.target.value);
    setErrorMessage("");
  };
  const onConfirmPasswordChangeHandler = event => {
    setConfirmPassword(event.target.value);
    setErrorMessage("");
  };
  const onNicknameChangeHandler = event => {
    setNickname(event.target.value);
    setErrorMessage("");
  };

  const submitHandler = event => {
    event.preventDefault();

    if (!email || !password || !nickname) {
      setErrorMessage("빈칸을 모두 작성해 주세요.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("올바른 이메일 형식이 아닙니다.");
      return;
    }

    if (!isValidPassword(password)) {
      setErrorMessage("비밀번호는 6자리 이상의 숫자와 영어 소문자의 조합이어야 합니다.");
      return;
    }

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
        placeholder="example@naver.com"
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
        placeholder="6자리 이상의 숫자와 영어 소문자의 조합"
        value={password}
        onChange={onPasswordChangeHandler}
      />

      <Label>비밀번호 확인</Label>
      <Input
        variant="outline"
        type="password"
        placeholder="비밀번호를 한번 더 작성해주세요"
        value={confirmPassword}
        onChange={onConfirmPasswordChangeHandler}
      />

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <Button variant="outline" type="submit" style={{ marginTop: "15px" }}>
        회원가입
      </Button>
      <Label variant="middle">이미 회원이신가요?</Label>
      <Button>로그인</Button>
    </FlexColumn>
  );
};
