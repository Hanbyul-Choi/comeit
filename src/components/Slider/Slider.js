import arrowNext from "assets/svgs/arrowNextWhite.svg";
import arrowPrev from "assets/svgs/arrowPrevWhite.svg";
import { useMount } from "hooks";

import { useEffect, useRef, useState } from "react";
import * as Styled from "./Slider.styles";

export const Slider = ({
  type,
  showContentNum = 3,
  space = 1,
  contents,
  contentWidth = 100,
  onClickHandler,
  auto = false
}) => {
  let overContents = true;
  if (contents.length <= showContentNum) {
    overContents = false;
  }
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const cloneContents = [...contents];
  if (auto && overContents) {
    for (let i = 0; i < showContentNum; i += 1) {
      cloneContents.push(contents[i]);
    }
  }
  const slideRef = useRef(null);
  const prevButton = useRef(null);
  const nextButton = useRef(null);
  let interval;

  const TOTAL_SLIDES = cloneContents.length - 1;
  const sliceWidth = contentWidth * showContentNum + space * (showContentNum - 1);
  const lastSlide = TOTAL_SLIDES + 1 - showContentNum;
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

  const autoplay = ({ duration }) => {
    interval = setInterval(autoplayIterator, duration);
  };

  const autoplayIterator = () => {
    setCurrentSlide(prev => {
      const newSlide = prev + 1;
      slideRef.current.style.transition = "all 0.5s ease-in-out";
      slideRef.current.style.transform = `translateX(-${newSlide * (contentWidth + space)}px)`;
      if (newSlide > lastSlide) {
        clearInterval(interval);
        slideRef.current.style.transition = "";
        slideRef.current.style.transform = `translateX(-0px)`;
        // slideRef.current.style.transition = "all 0.5s ease-in-out";
        // slideRef.current.style.transform = `translateX(-${1 * (contentWidth + space)}px)`;
        setCurrentSlide(0);
        autoplay({ duration: 2000 });
      }
      return newSlide;
    });
  };
  useMount(() => {
    if (type === "intro" && overContents) {
      autoplay({ duration: 2000 });
    }
  });

  useEffect(() => {
    if (type === "home") {
      if (prevButton.current)
        prevButton.current.style.display = currentSlide === 0 ? "none" : "block";
      if (nextButton.current) nextButton.current.style.display = isLastSlide ? "none" : "block";

      slideRef.current.style.transition = "all 0.5s ease-in-out";
      slideRef.current.style.transform = `translateX(-${currentSlide * (contentWidth + space)}px)`;
    }
  }, [currentSlide, isLastSlide, isButtonVisible, contentWidth, space, type]);

  const renderContent = () => {
    if (type === "intro") {
      return cloneContents.map(item => (
        <Styled.SlideItem
          space={space}
          contentWidth={contentWidth}
          key={`${item.postId + Date.now() * Math.random()}`}
          border="1px solid black"
          onClick={() => onClickHandler(item.postId)}
        >
          <Styled.ImgBox space={space} contentWidth={contentWidth}>
            <Styled.IntroImg src={item.groupImgUrl} />
            <Styled.CardContents>
              <Styled.NameText>{item.groupName}</Styled.NameText>
              <Styled.AdressText>{item.meetingPlace}</Styled.AdressText>
              <Styled.ThemeText>#{item.category}</Styled.ThemeText>
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
          key={`${10 * Math.random()}`}
          onClick={() => onClickHandler(item)}
        >
          <Styled.Img src={item} space={space} contentWidth={contentWidth} />
        </Styled.SlideItem>
      ));
    }
  };

  return (
    <Styled.ContainerBlock onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Styled.Container contentWidth={contentWidth} showContentNum={showContentNum} space={space}>
        <Styled.SliderContainer sliceWidth={sliceWidth} ref={slideRef} space={space}>
          {renderContent()}
        </Styled.SliderContainer>

        {isButtonVisible && !auto && (
          <>
            <Styled.Button ref={prevButton} onClick={prevSlide} position="left">
              <img src={arrowPrev} alt="이전버튼" />
            </Styled.Button>
            <Styled.Button ref={nextButton} onClick={nextSlide} position="right">
              <img src={arrowNext} alt="다음버튼" />
            </Styled.Button>
          </>
        )}
      </Styled.Container>
    </Styled.ContainerBlock>
  );
};
