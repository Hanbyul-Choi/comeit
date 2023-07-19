import { useEffect, useRef, useState } from "react";
import * as Styled from "./Slider.styles";

export const Slider = ({
  showContentNum = 3,
  space = 1,
  contents,
  contentWidth = 100,
  onClickHandler
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const slideRef = useRef(null);

  const TOTAL_SLIDES = contents.length - 1;
  const sliceWidth = contentWidth * showContentNum + space * (showContentNum - 1);
  const isLastSlide = currentSlide === TOTAL_SLIDES + 1 - showContentNum;

  const nextSlide = () => {
    setCurrentSlide(currentSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide - 1);
  };

  const handleMouseEnter = () => {
    setIsButtonVisible(true);
  };

  const handleMouseLeave = () => {
    setIsButtonVisible(false);
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide * contentWidth}px)`;
  }, [currentSlide, contentWidth]);

  return (
    <Styled.ContainerBlock onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Styled.Container contentWidth={contentWidth} showContentNum={showContentNum} space={space}>
        <Styled.SliderContainer sliceWidth={sliceWidth} ref={slideRef}>
          {contents.map((item, index) => (
            <Styled.SlideItem
              space={space}
              contentWidth={contentWidth}
              key={item.id || index}
              color={item.color}
              onClick={() => onClickHandler(item.id)}
            >
              {typeof item === "string" ? (
                <Styled.Img src={item} space={space} contentWidth={contentWidth} />
              ) : (
                item
              )}
            </Styled.SlideItem>
          ))}
        </Styled.SliderContainer>

        {isButtonVisible && (
          <>
            <Styled.Button className="prev" onClick={prevSlide} disabled={currentSlide === 0}>
              &lt;
            </Styled.Button>
            <Styled.Button className="next" onClick={nextSlide} disabled={isLastSlide}>
              &gt;
            </Styled.Button>
          </>
        )}
      </Styled.Container>
    </Styled.ContainerBlock>
  );
};
