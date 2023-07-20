import PlaceImage from "assets/svgs/place.svg";
import { MapMarker } from "react-kakao-maps-sdk";
import { CustomOverlayItem } from "./CustomOverlayItem";

export const MarkerItem = ({ data, onClick, selected }) => {
  const { latlng, title } = data;
  return (
    <>
      <MapMarker
        position={latlng}
        image={{
          src: PlaceImage,
          size: {
            width: 48,
            height: 49
          }
        }}
        clickable
        onClick={onClick}
      />
      {selected === title && <CustomOverlayItem title={title} position={latlng} />}
    </>
  );
};
