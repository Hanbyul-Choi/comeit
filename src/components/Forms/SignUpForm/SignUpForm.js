import { useMutation } from "@tanstack/react-query";
import { Button, Input, Label, SignInForm, SIGN_IN_MODAL, useDialog, useModal } from "components";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useInput } from "hooks";
import { useState } from "react";
import { auth, db } from "server/config";
import { FlexColumn } from "styles/mixins";

export const SIGN_UP_MODAL = "SIGN_UP_MODAL";

export const SignUpForm = () => {
  const { unmount, mount } = useModal();
  const { Alert } = useDialog();

  const [errorMessage, setErrorMessage] = useState("");

  const [email, onEmailChange] = useInput(() => setErrorMessage(""));
  const [password, onPasswordChange] = useInput(() => setErrorMessage(""));
  const [confirmPassword, onConfirmPasswordChange] = useInput(() => setErrorMessage(""));
  const [nickname, onNicknameChange] = useInput(() => setErrorMessage(""));

  const signUp = async () => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCredential.user.uid), {
      id: userCredential.user.uid,
      email,
      nickname,
      userImgUrl: null
    });
  };

  const { mutate, reset } = useMutation({
    mutationFn: signUp,
    onSuccess: async () => {
      await Alert("회원가입이 완료되었습니다.");
      unmount(SIGN_UP_MODAL);
      reset();
    },
    onError: error => {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("이미 존재하는 이메일 주소입니다.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("올바른 이메일 형식이 아닙니다.");
      } else {
        setErrorMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    }
  });

  const checkDuplicateNickname = async inputNickname => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("nickname", "==", inputNickname));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size > 0;
  };

  const isValidEmail = id => {
    const emailRegex = /^[a-zA-Z0-9+-_.]+[a-zA-Z0-9-]+[a-zA-Z0-9-.]+$/;
    return emailRegex.test(id);
  };

  const isValidPassword = pw => {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/;
    return passwordRegex.test(pw);
  };

  const submitHandler = async event => {
    event.preventDefault();

    if (
      email.trim() === "" ||
      nickname.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setErrorMessage("빈칸을 모두 작성해 주세요.");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("이메일은 영문자, 숫자, 특수문자 조합이어야 합니다");
      return;
    }

    const isDuplicateNickname = await checkDuplicateNickname(nickname);

    if (isDuplicateNickname) {
      setErrorMessage("이미 존재하는 닉네임입니다.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!isValidPassword(password)) {
      setErrorMessage("비밀번호는 6자리 이상의 숫자와 영어 소문자의 조합이어야 합니다.");
      return;
    }

    mutate();
  };

  return (
    <FlexColumn gap={12} as="form" onSubmit={submitHandler}>
      <Label variant="text">아이디</Label>
      <Input
        variant="outline"
        placeholder="example@naver.com"
        value={email}
        onChange={onEmailChange}
      />

      <Label variant="text">닉네임</Label>
      <Input
        variant="outline"
        placeholder="닉네임 입력"
        value={nickname}
        onChange={onNicknameChange}
      />

      <Label>비밀번호</Label>
      <Input
        variant="outline"
        type="password"
        placeholder="6자리 이상의 숫자와 영어 소문자의 조합"
        value={password}
        onChange={onPasswordChange}
      />

      <Label>비밀번호 확인</Label>
      <Input
        variant="outline"
        type="password"
        placeholder="비밀번호를 한번 더 작성해주세요"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
      />

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <Button type="submit" style={{ marginTop: "15px" }}>
        회원가입
      </Button>
      <Label variant="middle">이미 회원이신가요?</Label>
      <Button
        variant="outline"
        onClick={() => {
          unmount(SIGN_UP_MODAL);
          mount(SIGN_IN_MODAL, <SignInForm />);
        }}
      >
        로그인
      </Button>
    </FlexColumn>
  );
};
