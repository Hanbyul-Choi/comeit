import { Button } from "components/Button";
import { useState } from "react";
import { createPortal } from "react-dom";
import * as Styled from "./Header.styles";
import { UserDropdown } from "./UserDropdown";

export const Header = () => {
  const [openOption, setOpenOption] = useState(false);
  const isloggedIn = false;
  const openMenu = () => {
    setOpenOption(prev => !prev);
  };

  const onLogin = () => {
    alert("로그인하기");
  };
  const onResister = () => {
    alert("회원가입하기");
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
