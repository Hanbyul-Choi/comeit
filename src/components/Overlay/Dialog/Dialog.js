import { Button } from "components";
import { useLockBodyScroll } from "hooks";
import { Flex, Typography } from "styles/mixins";
import * as Styled from "./Dialog.styles";

export const Dialog = ({ onClose, onSucess, type, children }) => {
  const close = event => {
    const { target, currentTarget } = event;
    if (target !== currentTarget) return;
    onClose();
  };

  useLockBodyScroll(true);

  return (
    <Styled.DialogBackground onClick={close}>
      <Styled.DialogBody>
        <Typography as="p">{children}</Typography>
        {type === "Confirm" ? (
          <Flex gap={20}>
            <Button onClick={onClose} variant="outline">
              취소
            </Button>
            <Button onClick={onSucess}>확인</Button>
          </Flex>
        ) : (
          <Flex gap={20}>
            <Button onClick={close}>확인</Button>
          </Flex>
        )}
      </Styled.DialogBody>
    </Styled.DialogBackground>
  );
};
