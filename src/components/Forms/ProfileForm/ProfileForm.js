import { useMutation } from "@tanstack/react-query";
import { Button, Input, Label, useDialog, useModal } from "components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { css, styled } from "styled-components";
import { FlexColumn } from "styles/mixins";
import userImg from "../../../assets/userImg/user.png";

export const PROFILE_EDIT_MODAL = "PROFILE_EDIT_MODAL";

export const ProfileForm = () => {
  const { unmount } = useModal();
  const { Alert } = useDialog();

  const { user } = useSelector(state => state.user);
  const { email, nickname, userImgUrl } = user;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editNickname, setEditNickname] = useState(nickname);
  const [errorMessage, setErrorMessage] = useState("");

  const updateProfile = async () => {
    // await setDoc(doc(db, "users", userCredential.user.uid), {
    //   id: userCredential.user.uid,
    //   email,
    //   nickname,
    //   userImgUrl: ""
    // });
  };

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      setPassword("");
      setConfirmPassword("");
      setEditNickname("");

      unmount(PROFILE_EDIT_MODAL);
      Alert("프로필이 수정되었습니다.");
    },
    onError: error => {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("이미 존재하는 이메일 주소입니다.");
      } else {
        setErrorMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    }
  });

  const onPasswordChangeHandler = event => {
    setPassword(event.target.value);
    setErrorMessage("");
  };
  const onConfirmPasswordChangeHandler = event => {
    setConfirmPassword(event.target.value);
    setErrorMessage("");
  };
  const onNicknameChangeHandler = event => {
    setEditNickname(event.target.value);
    setErrorMessage("");
  };

  const submitHandler = event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    mutate();
  };

  return (
    <FlexColumn gap={8} as="form" onSubmit={submitHandler}>
      <UserImg src={userImgUrl ?? userImg} />
      <Label variant="text">아이디</Label>
      <Input variant="outline" placeholder="example@naver.com" value={email} disabled />

      <Label variant="text">닉네임</Label>
      <Input
        variant="outline"
        placeholder="닉네임 입력"
        value={editNickname}
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
      <Input
        variant="outline"
        type="password"
        placeholder="비밀번호를 한번 더 작성해주세요"
        value={confirmPassword}
        onChange={onConfirmPasswordChangeHandler}
      />

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <Button variant="outline" type="submit" style={{ marginTop: "15px" }}>
        수정완료
      </Button>
    </FlexColumn>
  );
};

const UserImg = styled.img`
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: 50%;
  cursor: pointer;
  ${({ theme }) => css`
    &:hover {
      border: 2px solid ${theme.colors.blue.hover};
    }
  `}
`;
