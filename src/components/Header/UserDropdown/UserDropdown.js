import { Option, UserDropdownWrapper } from "./UserDropdown.styles";

export const UserDropdown = () => {
  const onLogout = () => {
    alert("로그아웃!");
  };
  const onEditProfile = () => {
    alert("유저 프로필 수정!");
  };
  return (
    <UserDropdownWrapper>
      <Option onClick={onEditProfile}>내정보 수정</Option>
      <Option onClick={onLogout}>로그아웃</Option>
    </UserDropdownWrapper>
  );
};
