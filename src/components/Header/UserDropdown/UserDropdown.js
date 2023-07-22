import { PROFILE_EDIT_MODAL, ProfileForm } from "components/Forms/ProfileForm";
import { useDialog, useModal } from "components/Overlay";
import { useClickAway } from "hooks";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initializeUser } from "redux/modules/userSlice";
import { Option, UserDropdownWrapper } from "./UserDropdown.styles";

export const UserDropdown = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const { Alert, Confirm } = useDialog();
  const { mount } = useModal();

  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  useClickAway(dropdownRef, setIsOpen.off);

  const onLogout = async () => {
    if (!(await Confirm("로그아웃 하시겠습니까?"))) return;
    navigate("/");
    await Alert("로그아웃 되었습니다.");
    dispatch(initializeUser());
    sessionStorage.removeItem("user");
  };

  const onEditProfile = () => {
    mount(PROFILE_EDIT_MODAL, <ProfileForm />);
  };
  return (
    <UserDropdownWrapper ref={dropdownRef}>
      <Option onClick={onEditProfile}>내 정보</Option>
      <Option onClick={onLogout}>로그아웃</Option>
    </UserDropdownWrapper>
  );
};
