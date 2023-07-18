import { Button, SignUpForm, SIGN_UP_MODAL, useModal } from "components";

export const Home = () => {
  const { mount } = useModal();

  return (
    <div>
      <Button onClick={() => mount(SIGN_UP_MODAL, <SignUpForm />)}>버튼</Button>
    </div>
  );
};
