import { ProfileForm, PROFILE_EDIT_MODAL } from "components/Forms/ProfileForm";
import { useDialog, useModal } from "components/Overlay";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { initializeUser } from "redux/modules/userSlice";
import { Option, UserDropdownWrapper } from "./UserDropdown.styles";

export const UserDropdown = ({ setOpenOption }) => {
  const dispatch = useDispatch();
  const { Alert, Confirm } = useDialog();
  const { mount } = useModal();

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handler = event => {
      const { current } = dropdownRef;
      if (!current) return;
      if (current.contains(event.target)) return;
      if (current !== event.target) setOpenOption(() => false);
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const onLogout = async () => {
    if (!(await Confirm("나갈거임?"))) return;
    await Alert("로그아웃 되었습니다.");
    dispatch(initializeUser());
    localStorage.removeItem("user");
  };

  const onEditProfile = () => {
    mount(PROFILE_EDIT_MODAL, <ProfileForm />);
  };
  return (
    <UserDropdownWrapper ref={dropdownRef}>
      <Option onClick={onEditProfile}>내정보 수정</Option>
      <Option onClick={onLogout}>로그아웃</Option>
    </UserDropdownWrapper>
  );
};
