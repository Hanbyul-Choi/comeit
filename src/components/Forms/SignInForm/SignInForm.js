import { useMutation } from "@tanstack/react-query";
import { Button, Input, Label, useModal } from "components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "server/config";
import { FlexColumn } from "styles/mixins";

export const SIGN_IN_MODAL = "SIGN_IN_MODAL";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { unmount } = useModal();

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (userCredential) {
        alert("로그인 되었습니다.");
        unmount(SIGN_IN_MODAL);
      }
    } catch (error) {
      console.log("로그인 에러:", error);
      setErrorMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  const { mutate } = useMutation(signIn, {
    onError: () => {
      console.log("로그인 에러");
      setErrorMessage("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  });

  const onUserEmailChangeHandler = event => {
    setEmail(event.target.value);
    setErrorMessage("");
  };

  const onPasswordChangeHandler = event => {
    setPassword(event.target.value);
    setErrorMessage("");
  };

  const signInHandler = event => {
    event.preventDefault();

    if (email && password) {
      mutate();
    } else {
      setErrorMessage("이메일과 비밀번호를 모두 입력해주세요.");
    }
  };

  return (
    <FlexColumn gap={12} as="form" onSubmit={signInHandler}>
      <Label variant="text">아이디</Label>
      <Input
        variant="outline"
        placeholder="아이디 입력"
        name="email"
        value={email}
        onChange={onUserEmailChangeHandler}
      />
      <Label>비밀번호</Label>
      <Input
        variant="outline"
        type="password"
        placeholder="비밀번호 입력"
        name="password"
        value={password}
        onChange={onPasswordChangeHandler}
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <Button type="submit">로그인</Button>
    </FlexColumn>
  );
};
