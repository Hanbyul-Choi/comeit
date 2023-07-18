import { Button } from "components";
import { Flex, Typography } from "styles/mixins";
import * as Styled from "./Dialog.styles";

export const Dialog = () => {
  return (
    <div>
      <Styled.DialogBackground />
      <Styled.DialogBody>
        <Typography as="p">내용</Typography>
        <Flex gap={20}>
          <Button>취소</Button>
          <Button>확인</Button>
        </Flex>
      </Styled.DialogBody>
    </div>
  );
};
