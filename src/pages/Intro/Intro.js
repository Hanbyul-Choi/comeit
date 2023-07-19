import { Button, SIGN_IN_MODAL, SIGN_UP_MODAL, SignInForm, SignUpForm, useModal } from "components";

export const Intro = () => {
  const { mount } = useModal();

  return (
    <div>
      소개
      <Button onClick={() => mount(SIGN_IN_MODAL, <SignInForm />)}>로그인</Button>
      <Button onClick={() => mount(SIGN_UP_MODAL, <SignUpForm />)}>회원가입</Button>
    </div>
  );
};
