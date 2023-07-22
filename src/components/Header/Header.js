import { useQuery } from "@tanstack/react-query";
import logo from "assets/logo/COMEIT.png";
import userImg from "assets/userImg/user.png";
import { SIGN_IN_MODAL, SIGN_UP_MODAL, SignInForm, SignUpForm, useModal } from "components";
import { Button } from "components/Button";
import { doc, getDoc } from "firebase/firestore";
import { useBoolean } from "hooks";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "redux/modules/userSlice";
import { db } from "server/config";
import * as Styled from "./Header.styles";
import { UserDropdown } from "./UserDropdown";

export const Header = () => {
  const dispatch = useDispatch();
  const { mount } = useModal();
  const [isOpen, setIsOpen] = useBoolean(false);
  const user = useSelector(state => state.user.user);
  // const { Alert } = useDialog();

  const loadUser = async () => {
    const uid = sessionStorage.getItem("user");
    if (!uid) {
      // Alert("로그인 하시면 게시물을 작성할 수 있습니다.");
      return;
    }
    const querySnapshot = await getDoc(doc(db, "users", uid));
    dispatch(getUser(querySnapshot.data()));
    return querySnapshot.data();
  };

  const { isLoading } = useQuery(["user"], loadUser);
  if (isLoading) return;

  const onLogin = () => {
    mount(SIGN_IN_MODAL, <SignInForm />);
  };

  const onRegister = () => {
    mount(SIGN_UP_MODAL, <SignUpForm />);
  };
  return (
    <Styled.Container>
      <Styled.Wrapper>
        <Styled.StLink to="/">
          <img src={logo} alt="logo" />
          Come it!
        </Styled.StLink>
        <div className="right">
          {user ? (
            <>
              <p>{user.nickname ?? "닉네임"}</p>
              <Styled.UserImg
                src={user.userImgUrl ?? userImg}
                alt="user Img"
                onClick={setIsOpen.toggle}
              />
              {isOpen &&
                createPortal(
                  <UserDropdown setIsOpen={setIsOpen} />,
                  document.getElementById("portal-root")
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
