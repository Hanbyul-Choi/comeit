import { Button } from "components/Button";
import { SIGN_IN_MODAL, SIGN_UP_MODAL, SignInForm, SignUpForm } from "components/Forms";
import { useModal } from "components/Overlay";
import { useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../assets/logo/COMEIT.png";
import userImg from "../../assets/userImg/user.png";
import * as Styled from "./Header.styles";
import { UserDropdown } from "./UserDropdown";

export const Header = () => {
  const { mount } = useModal();
  const [openOption, setOpenOption] = useState(false);
  const user = useSelector(state => state.user.user);

  const openMenu = () => {
    setOpenOption(() => true);
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
        <div className="logo">
          <img src={logo} alt="logo" />
          Come it!
        </div>
        <div className="right">
          {user ? (
            <>
              <p>{user.nickname ?? "닉네임"}</p>
              <Styled.UserImg src={user.userImgUrl ?? userImg} alt="user Img" onClick={openMenu} />
              {openOption && (
                // createPortal(
                //   <UserDropdown setOpenOption={setOpenOption} />,
                //   document.getElementById("portal-root")
                // )
                <UserDropdown setOpenOption={setOpenOption} />
              )}
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
