import { Button, Modal } from "components";
import { useModal } from "hooks/useModal";
import { FlexCenter } from "styles/mixins";

export const Home = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <FlexCenter>
        <Button variant="text">버튼</Button>
        <Button variant="outline">버튼</Button>
        <Button size="small">버튼</Button>
        <Button disabled>버튼</Button>
        <Button size="large" onClick={openModal}>
          버튼
        </Button>

        {isOpen && (
          <Modal>
            <input type="text" placeholder="인풋" />
            <Button onClick={closeModal}>닫기</Button>
          </Modal>
        )}
      </FlexCenter>

      {/* <Icon name="place" /> */}
    </div>
  );
};
