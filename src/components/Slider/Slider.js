import { useEffect, useRef, useState } from "react";
import { Container, Img, SliderContainer } from "./Slider.styles";

const { styled } = require("styled-components");

export const Slider = ({ showContentNum = 3, contents }) => {
  const TOTAL_SLIDES = contents.length - 1;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  return (
    <Container variant="outline">
      {currentSlide + 1}
      <Button className="prev" onClick={prevSlide}>
        &lt;
      </Button>
      <SliderContainer ref={slideRef}>
        {contents.map(item => (
          <Img showContentNum={showContentNum} key={item} src={item} />
        ))}
      </SliderContainer>
      <Button className="next" onClick={nextSlide}>
        &gt;
      </Button>
    </Container>
  );
};

const Button = styled.button`
  all: unset;
  border: 1px solid coral;
  position: absolute;
  padding: 0.5em;
  color: coral;
  background-color: #fff;
  border-radius: 10px;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: coral;
    color: #fff;
  }
`;
