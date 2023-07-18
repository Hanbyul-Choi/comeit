import { useEffect, useRef, useState } from "react";
import { Button, Container, ContainerBlock, Img, SliderContainer } from "./Slider.styles";

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
          {contents.map(item => (
            <Img
              space={space}
              contentWidth={contentWidth}
              key={item.id}
              src={item.imgUrl}
              onClick={() => onClickHandler(item.id)}
            />
          ))}
        </SliderContainer>
      </Container>
      <Button className="next" onClick={nextSlide} disabled={isLastSlide}>
        &gt;
      </Button>
    </ContainerBlock>
  );
};
