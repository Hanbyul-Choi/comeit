import plusbutton from "assets/svgs/add_circle.svg";
import PlaceImage from "assets/svgs/my.svg";
import { getData } from "hooks/api";
import { useEffect, useState } from "react";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";
import { useDispatch } from "react-redux";
import { setPlace, setPostPosition } from "redux/modules/centerSlice";
import * as Styled from "./Map.styles";

export const ClickedMarker = ({ position, openPost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [iconSize, setIconSize] = useState({
    width: 48,
    height: 49
  });

  const dispatch = useDispatch();

  const handleCreate = async () => {
    const data = await getData(position);
    dispatch(setPlace(data));
    dispatch(setPostPosition(position));
    openPost();
  };

  useEffect(() => {
    setIsOpen(false);
  }, [position]);
  return (
    <>
      <MapMarker
        position={position}
        image={{
          src: PlaceImage,
          size: {
            width: iconSize.width,
            height: iconSize.height
          }
        }}
        clickable
        onClick={() => setIsOpen(prev => !prev)}
        onMouseOver={() => setIconSize({ width: 55, height: 55 })}
        onMouseOut={() => setIconSize({ width: 48, height: 49 })}
      />
      {isOpen && (
        <CustomOverlayMap position={position} clickable>
          <Styled.PlusButton onClick={handleCreate}>
            <img src={plusbutton} alt="게시물 등록" style={{ width: "40px" }} />
          </Styled.PlusButton>
        </CustomOverlayMap>
      )}
    </>
  );
};
