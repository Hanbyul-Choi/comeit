import { Button } from "components";
import { FlexCenter } from "styles/mixins";

export const Home = () => {
  return (
    <div>
      <FlexCenter>
        <Button variant="hover">버튼</Button>
        <Button variant="outline">버튼</Button>
        <Button size="small">버튼</Button>
        <Button disabled>버튼</Button>
        <Button size="large">버튼</Button>
      </FlexCenter>
    </div>
  );
};
