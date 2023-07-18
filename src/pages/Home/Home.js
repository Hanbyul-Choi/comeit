import { Button, Input, Label, Textarea } from "components";

import { FlexCenter, FlexColumn } from "styles/mixins";

export const Home = () => {
  return (
    <div>
      <FlexCenter>
        <Button variant="text">버튼</Button>
        <Button variant="outline">버튼</Button>
        <Button size="small">버튼</Button>
        <Button disabled>버튼</Button>
        <Button size="large">버튼</Button>
      </FlexCenter>
      <FlexColumn>
        <Label variant="text">아이디</Label>
        <Input variant="outline" placeholder="아이디 입력" />
        <Label variant="text">닉네임</Label>
        <Input variant="outline" />
        <Label variant="text">비밀번호</Label>
        <Input variant="outline" type="password" />
        <Label variant="text">비밀번호 확인</Label>
        <Input variant="outline" type="password" />
      </FlexColumn>
      <FlexColumn>
        <Input placeholder="모임 이름" />
        <Input placeholder="모임 날짜" />
        <Input placeholder="모임 장소" />
        <Input placeholder="모임 오픈톡방" />
        <Input placeholder="참석 정원" />
        <Textarea variant="outline" placeholder="모임 소개" />
      </FlexColumn>

      {/* <Icon name="place" /> */}
    </div>
  );
};
