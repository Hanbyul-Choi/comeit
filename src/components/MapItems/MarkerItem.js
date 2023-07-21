import { useState } from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import { CustomOverlayItem } from "./CustomOverlayItem";
import { useSelectCategory } from "./useSelectCategory";

export const MarkerItem = ({ data, onClick, open, selected }) => {
  const { latlng, title, postId } = data;
  const [iconSize, setIconSize] = useState({
    width: 48,
    height: 49
  });
  const { icon } = useSelectCategory(data);

  return (
    <>
      <MapMarker
        position={latlng}
        image={{
          src: icon,
          size: {
            width: iconSize.width,
            height: iconSize.height
          }
        }}
        clickable
        onClick={onClick}
        onMouseOver={() => setIconSize({ width: 55, height: 55 })}
        onMouseOut={() => setIconSize({ width: 48, height: 49 })}
      />
      {selected === title && (
        <CustomOverlayItem title={title} position={latlng} open={open} postId={postId} />
      )}
    </>
  );
};
