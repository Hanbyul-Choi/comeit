import { Button } from "components/Button";
import { SIGN_IN_MODAL, SIGN_UP_MODAL, SignInForm, SignUpForm } from "components/Forms";
import { useModal } from "components/Overlay";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import * as Styled from "./Header.styles";
import { UserDropdown } from "./UserDropdown";

export const Header = () => {
  const [openOption, setOpenOption] = useState(false);
  const { mount } = useModal();
  const user = useSelector(state => state.user.user);

  const openMenu = () => {
    setOpenOption(prev => !prev);
  };

  const onLogin = () => {
    mount(SIGN_IN_MODAL, <SignInForm />);
  };

  const onRegister = () => {
    mount(SIGN_UP_MODAL, <SignUpForm />);
  };

  return (
    <Styled.Container>
      <Styled.Wrapper>
        <div className="logo">커밋</div>
        <div className="right">
          {user !== null ? (
            <>
              <Styled.UserImg onClick={openMenu}>user</Styled.UserImg>
              {openOption && createPortal(<UserDropdown />, document.getElementById("portal-root"))}
            </>
          ) : (
            <>
              <Styled.SigninButton size="small" onClick={onLogin}>
                로그인
              </Styled.SigninButton>
              <Button size="small" onClick={onRegister}>
                회원가입
              </Button>
            </>
          )}
        </div>
      </Styled.Wrapper>
    </Styled.Container>
  );
};
