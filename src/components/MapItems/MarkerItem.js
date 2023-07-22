import { useState } from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import { CustomOverlayItem } from "./CustomOverlayItem";
import { useSelectCategory } from "./useSelectCategory";

export const MarkerItem = ({ data, onClick, open, selected }) => {
  const { location, groupName, category, meetingDate, postId } = data;
  const [iconSize, setIconSize] = useState({
    width: 48,
    height: 49
  });
  const { icon } = useSelectCategory(data);

  return (
    <>
      {location !== undefined && (
        <MapMarker
          position={location}
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
      )}

      {selected === groupName && (
        <CustomOverlayItem
          groupName={groupName}
          category={category}
          meetingDate={meetingDate}
          position={location}
          open={open}
          postId={postId}
        />
      )}
    </>
  );
};
