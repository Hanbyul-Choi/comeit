import { Button, Input, Label, Slider, Textarea, useModal } from "components";
import { FlexCenter, FlexColumn } from "styles/mixins";
import img1 from "../../assets/exampleImg/leaves-g2699eb18f_1920.jpg";
import img2 from "../../assets/exampleImg/rose-g248783ca6_1920.jpg";
import img3 from "../../assets/exampleImg/rose-g33c9b5bac_1920.jpg";

export const Home = () => {
  const imgArr = [img1, img2, img3, img1, img2, img3];
  const { mount, unmount } = useModal();

  return (
    <div style={{ paddingBottom: "5000px" }}>
      <FlexCenter>
        <Button
          size="large"
          onClick={() =>
            mount(
              "SAMPLE",
              <div>
                테스트 입니다.
                <Button onClick={() => unmount("SAMPLE")}>닫기</Button>
              </div>
            )
          }
        >
          버튼
        </Button>
      </FlexCenter>

      <FlexColumn>
        <Label variant="text">아이디</Label>
        <Input variant="outline" placeholder="아이디 입력" />
        <Label variant="text">닉네임</Label>
        <Input variant="outline" placeholder="닉네임 입력" />
        <Label>비밀번호</Label>
        <Input variant="outline" type="password" placeholder="비밀번호 입력" />
        <Label>비밀번호 확인</Label>
        <Input variant="outline" type="password" placeholder="비밀번호 확인" />
      </FlexColumn>
      <FlexColumn>
        <Input placeholder="모임 이름" />
        <Input placeholder="모임 날짜" />
        <Input placeholder="모임 장소" />
        <Input placeholder="모임 오픈톡방" />
        <Input placeholder="참석 정원" />
        <Textarea placeholder="모임 소개" />
      </FlexColumn>
      <Slider showContentNum={3} space={5} contents={imgArr} />
      {/* <Icon name="place" /> */}
    </div>
  );
};
