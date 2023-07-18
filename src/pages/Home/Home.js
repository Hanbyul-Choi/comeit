import { Button, Slider } from "components";
import { FlexCenter } from "styles/mixins";
import img1 from "../../assets/exampleImg/leaves-g2699eb18f_1920.jpg";
import img2 from "../../assets/exampleImg/rose-g248783ca6_1920.jpg";
import img3 from "../../assets/exampleImg/rose-g33c9b5bac_1920.jpg";

export const Home = () => {
  const imgArr = [img1, img2, img3, img1, img2, img3];
  return (
    <div>
      <FlexCenter>
        <Button variant="text">버튼</Button>
        <Button variant="outline">버튼</Button>
        <Button size="small">버튼</Button>
        <Button disabled>버튼</Button>
        <Button size="large">버튼</Button>
      </FlexCenter>
      <Slider showContentNum="4" contents={imgArr} />
      {/* <Icon name="place" /> */}
    </div>
  );
};
