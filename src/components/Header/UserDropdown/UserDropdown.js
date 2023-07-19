import { useDialog } from "components/Overlay";
import { useDispatch } from "react-redux";
import { initializeUser } from "redux/modules/userSlice";
import { Option, UserDropdownWrapper } from "./UserDropdown.styles";

export const UserDropdown = () => {
  const dispatch = useDispatch();
  const { Alert } = useDialog();

  const onLogout = () => {
    dispatch(initializeUser());
    Alert("로그아웃 되었습니다.");
  };

  const onEditProfile = () => {
    Alert("유저 프로필 수정!");
  };
  return (
    <UserDropdownWrapper>
      <Option onClick={onEditProfile}>내정보 수정</Option>
      <Option onClick={onLogout}>로그아웃</Option>
    </UserDropdownWrapper>
  );
};
