import { doc, updateDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { useMutation } from "@tanstack/react-query";
import userImg from "assets/userImg/user.png";
import { Button, Input, Label, useDialog, useModal } from "components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNickname, updateProfileImg } from "redux/modules/userSlice";
import { auth, db, storage } from "server/config";
import { css, styled } from "styled-components";
import { FlexColumn, flex } from "styles/mixins";

export const PROFILE_EDIT_MODAL = "PROFILE_EDIT_MODAL";

export const ProfileForm = () => {
  const { unmount } = useModal();
  const { Alert } = useDialog();

  const { user } = useSelector(state => state.user);
  const { email, nickname, userImgUrl, id } = user;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editNickname, setEditNickname] = useState(nickname);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const updateProfile = async () => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (userCredential) {
      await updateDoc(doc(db, "users", id), {
        nickname: editNickname
      });
    }
  };

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      dispatch(updateNickname(editNickname));
      setPassword("");
      setConfirmPassword("");
      setEditNickname("");

      unmount(PROFILE_EDIT_MODAL);
      Alert("프로필이 수정되었습니다.");
    },
    onError: error => {
      if (error.code === "auth/wrong-password") {
        setErrorMessage("비밀번호가 틀립니다.");
      } else {
        setErrorMessage("중복된 닉네임 입니다."); // 회원가입 시 닉네임 중복 검사부분 작성 필요
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

  const onFileChange = async e => {
    const {
      target: { files }
    } = e;
    const theFile = files[0];
    const imageRef = ref(storage, `profileImg/${id}`);
    await uploadBytes(imageRef, theFile);
    const attachmentUrl = await getDownloadURL(ref(storage, imageRef));
    updateDoc(doc(db, "users", id), { userImgUrl: attachmentUrl });
    dispatch(updateProfileImg(attachmentUrl));
  };

  const submitHandler = async event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (password.trim() === "" || confirmPassword.trim() === "") {
      setErrorMessage("비밀번호를 입력해주세요");
      return;
    }
    mutate();
  };

  return (
    <FlexColumn gap={8} as="form" onSubmit={submitHandler}>
      <FileLabel htmlFor="fileInput">
        <UserImg src={userImgUrl ?? userImg} />
      </FileLabel>
      <FileInput type="file" id="fileInput" accept="image/*" onChange={onFileChange} />
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

const FileInput = styled.input`
  display: none;
`;
const FileLabel = styled.label`
  ${flex({ justify: "center" })}
`;
