import arrowNext from "assets/svgs/arrowNextWhite.svg";
import arrowPrev from "assets/svgs/arrowPrevWhite.svg";
import { useEffect, useRef, useState } from "react";
import * as Styled from "./Slider.styles";

export const Slider = ({
  type,
  showContentNum = 3,
  space = 1,
  contents,
  contentWidth = 100,
  onClickHandler
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const slideRef = useRef(null);
  const prev = useRef(null);
  const next = useRef(null);

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
    if (prev.current) prev.current.style.display = currentSlide === 0 ? "none" : "block";
    if (next.current) next.current.style.display = isLastSlide ? "none" : "block";

    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide * (contentWidth + space)}px)`;
  }, [currentSlide, isLastSlide, isButtonVisible, contentWidth, space]);

  const renderContent = () => {
    if (type === "intro") {
      return contents.map(item => (
        <Styled.SlideItem
          space={space}
          contentWidth={contentWidth}
          key={item.postId}
          border="1px solid black"
          onClick={() => onClickHandler(item.postId)}
        >
          <Styled.ImgBox space={space} contentWidth={contentWidth}>
            <Styled.IntroImg src={item.groupImgUrl} />
            <Styled.CardContents>
              <p>{item.groupName}</p>
              <p>{item.meetingPlace}</p>
              <p>{item.category}</p>
            </Styled.CardContents>
          </Styled.ImgBox>
        </Styled.SlideItem>
      ));
    }

    if (type === "home") {
      return contents.map(item => (
        <Styled.SlideItem
          space={space}
          contentWidth={contentWidth}
          key={item.postId}
          onClick={() => onClickHandler(item)}
        >
          <Styled.Img src={item} space={space} contentWidth={contentWidth} />
        </Styled.SlideItem>
      ));
    }
  };

  return (
    <Styled.ContainerBlock onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Styled.Container
        contentWidth={contentWidth}
        showContentNum={showContentNum}
        space={space}
        TOTAL_SLIDES={TOTAL_SLIDES}
      >
        <Styled.SliderContainer sliceWidth={sliceWidth} ref={slideRef} space={space}>
          {renderContent()}
        </Styled.SliderContainer>

        {isButtonVisible && (
          <>
            <Styled.Button ref={prev} onClick={prevSlide} position="left">
              <img src={arrowPrev} alt="이전버튼" />
            </Styled.Button>
            <Styled.Button ref={next} onClick={nextSlide} position="right">
              <img src={arrowNext} alt="다음버튼" />
            </Styled.Button>
          </>
        )}
      </Styled.Container>
    </Styled.ContainerBlock>
  );
};
