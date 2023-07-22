import CheckImage from "assets/svgs/check.svg";
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
        <img src={CheckImage} alt="알림창" style={{ width: "40px" }} />
        <Typography as="p">{children}</Typography>
        {type === "Confirm" ? (
          <Flex gap={15}>
            <Button onClick={onClose} variant="cancel">
              취소
            </Button>
            <Button onClick={onSucess} variant="confirm">
              확인
            </Button>
          </Flex>
        ) : (
          <Flex gap={20}>
            <Button onClick={close} variant="confirm">
              확인
            </Button>
          </Flex>
        )}
      </Styled.DialogBody>
    </Styled.DialogBackground>
  );
};
