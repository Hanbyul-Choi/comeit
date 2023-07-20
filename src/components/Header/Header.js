import { SIGN_IN_MODAL, SIGN_UP_MODAL, SignInForm, SignUpForm, useModal } from "components";
import { Button } from "components/Button";
import { useState } from "react";
import { createPortal } from "react-dom";
import * as Styled from "./Header.styles";
import { UserDropdown } from "./UserDropdown";

export const Header = () => {
  const [openOption, setOpenOption] = useState(false);
  const isloggedIn = false;
  const { mount } = useModal();

  const openMenu = () => {
    setOpenOption(prev => !prev);
  };

  const onLogin = () => {
    mount(SIGN_IN_MODAL, <SignInForm />);
  };
  const onResister = () => {
    mount(SIGN_UP_MODAL, <SignUpForm />);
  };
  return (
    <Styled.Container>
      <Styled.Wrapper>
        <div className="logo">커밋</div>
        <div className="right">
          {isloggedIn ? (
            <>
              <Styled.UserImg onClick={openMenu}>user</Styled.UserImg>
              {openOption && createPortal(<UserDropdown />, document.getElementById("portal-root"))}
            </>
          ) : (
            <>
              <Styled.SigninButton size="small" onClick={onLogin}>
                로그인
              </Styled.SigninButton>
              <Button size="small" onClick={onResister}>
                회원가입
              </Button>
            </>
          )}
        </div>
      </Styled.Wrapper>
    </Styled.Container>
  );
};
