import communityIcon from "assets/svgs/communityIcon.svg";
import cultureIcon from "assets/svgs/cultureIcon.svg";
import gameIcon from "assets/svgs/gameIcon.svg";
import languageIcon from "assets/svgs/languageIcon.svg";
import placeImage from "assets/svgs/place.svg";
import sportIcon from "assets/svgs/sportIcon.svg";
import tripIcon from "assets/svgs/tripIcon.svg";
import { useMount } from "hooks";
import { useState } from "react";

export const useSelectCategory = category => {
  const [icon, setIcon] = useState(placeImage);
  useMount(() => {
    switch (category) {
      case "sports":
        setIcon(sportIcon);
        break;
      case "game":
        setIcon(gameIcon);
        break;
      case "travel":
        setIcon(tripIcon);
        break;
      case "culture":
        setIcon(cultureIcon);
        break;
      case "language":
        setIcon(languageIcon);
        break;
      case "social":
        setIcon(communityIcon);
        break;
      default:
        setIcon(placeImage);
    }
  });

  return { icon };
};
