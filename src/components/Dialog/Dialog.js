import { Button, DialogContext } from "components";
import { useContext } from "react";
import { Flex, Typography } from "styles/mixins";
import * as Styled from "./Dialog.styles";

export const Dialog = ({ confirm, close, content }) => {
  const {close, dialog} = useContext(DialogContext)

  return dialog.map((el) => {
    const {component, props} = el
    const {}
  })

  return (
    <div>
      <Styled.DialogBackground />
      <Styled.DialogBody>
        <Typography as="p">{content}</Typography>
        <Flex gap={20}>
          <Button onClick={close} variant="outline">
            취소
          </Button>
          <Button onClick={confirm}>확인</Button>
        </Flex>
      </Styled.DialogBody>
    </div>
  );
};
