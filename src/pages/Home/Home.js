import { Button, Input, Label, Textarea, useDialog } from "components";
import { useNavigate } from "react-router-dom";
import { FlexCenter, FlexColumn } from "styles/mixins";

export const Home = () => {
  const { Alert, Confirm } = useDialog();
  const navigate = useNavigate();

  const testHandler = async () => {
    if (await Confirm("Hello")) {
      await Alert("Ok");
      navigate("/");
    } else {
      return;
    }
  };

  return (
    <div style={{ paddingBottom: "5000px" }}>
      <FlexCenter>
        {/* <Button
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
        </Button> */}
      </FlexCenter>
      {/* <Button onClick={open}>다이얼로그</Button> */}
      <Button onClick={testHandler}>Hi</Button>

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

      {/* <Icon name="place" /> */}
    </div>
  );
};
