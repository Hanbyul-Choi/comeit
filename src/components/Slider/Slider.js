import { useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  ContainerBlock,
  Img,
  SlideItem,
  SliderContainer
} from "./Slider.styles";

export const Slider = ({
  showContentNum = 3,
  space = 1,
  contents,
  contentWidth = 100,
  onClickHandler
}) => {
  const TOTAL_SLIDES = contents.length - 1;
  const sliceWidth = contentWidth * showContentNum + space * (showContentNum - 1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const isLastSlide = currentSlide === TOTAL_SLIDES + 1 - showContentNum;
  const nextSlide = () => {
    setCurrentSlide(currentSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide - 1);
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide * contentWidth}px)`;
  }, [currentSlide, contentWidth]);

  return (
    <ContainerBlock>
      <Button className="prev" onClick={prevSlide} disabled={currentSlide === 0}>
        &lt;
      </Button>

      <Container contentWidth={contentWidth} showContentNum={showContentNum} space={space}>
        <SliderContainer sliceWidth={sliceWidth} ref={slideRef}>
          {contents.map((item, index) => (
            <SlideItem
              space={space}
              contentWidth={contentWidth}
              key={item.id || index} // 아이템에 id가 없을 경우 index를 사용하여 key 설정
              color={item.color}
              onClick={() => onClickHandler(item.id)}
            >
              {typeof item === "string" ? ( // item이 문자열인 경우 이미지 소스로 가정하고 이미지 태그 렌더링
                <Img src={item} space={space} contentWidth={contentWidth} />
              ) : (
                item // 이미지가 아닌 다른 요소라면 그대로 렌더링
              )}
            </SlideItem>
          ))}
        </SliderContainer>
      </Container>
      <Button className="next" onClick={nextSlide} disabled={isLastSlide}>
        &gt;
      </Button>
    </ContainerBlock>
  );
};
