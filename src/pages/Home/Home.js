import { Button, SIGN_IN_MODAL, SIGN_UP_MODAL, SignInForm, SignUpForm, useModal } from "components";

export const Home = () => {
  const { mount } = useModal();

  return (
    <div>
      <Button onClick={() => mount(SIGN_UP_MODAL, <SignUpForm />)}>버튼</Button>
      <Button onClick={() => mount(SIGN_IN_MODAL, <SignInForm />)}>로그인</Button>
    </div>
  );
};
