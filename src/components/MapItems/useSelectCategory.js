import communityIcon from "assets/svgs/communityIcon.svg";
import cultureIcon from "assets/svgs/cultureIcon.svg";
import gameIcon from "assets/svgs/gameIcon.svg";
import languageIcon from "assets/svgs/languageIcon.svg";
import myIcon from "assets/svgs/my5.svg";
import placeImage from "assets/svgs/place.svg";
import sportIcon from "assets/svgs/sportIcon.svg";
import tripIcon from "assets/svgs/tripIcon.svg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useSelectCategory = data => {
  const [icon, setIcon] = useState(placeImage);
  const currentId = useSelector(state => state.user.user);
  const { category, uid } = data;

  useEffect(() => {
    if (currentId?.id === uid) return setIcon(myIcon);
    switch (category) {
      case "운동/스포츠":
        setIcon(sportIcon);
        break;
      case "게임":
        setIcon(gameIcon);
        break;
      case "아웃도어/여행":
        setIcon(tripIcon);
        break;
      case "문화/공연":
        setIcon(cultureIcon);
        break;
      case "외국/언어":
        setIcon(languageIcon);
        break;
      case "친목":
        setIcon(communityIcon);
        break;
      default:
        setIcon(placeImage);
    }
  }, [category, currentId, uid]);

  return { icon };
};
