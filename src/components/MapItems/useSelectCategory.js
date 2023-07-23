import { useQuery } from "@tanstack/react-query";
import { culture, game, language, social, sports, travel } from "assets/marker";
import myIcon from "assets/svgs/my5.svg";
import placeImage from "assets/svgs/place.svg";
import likedIcon from "assets/svgs/star.svg";
import { and, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "server/config";

export const useSelectCategory = data => {
  const [icon, setIcon] = useState(placeImage);
  const [isLike, setIsLike] = useState(0);
  const currentUser = useSelector(state => state.user.user);

  const { data: likeData } = useQuery({
    queryKey: ["markerIcon", data.postId],
    queryFn: async () => {
      const q = query(
        collection(db, "likes"),
        and(where("uid", "==", currentUser?.id), where("postId", "==", data.postId))
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.size;
    },
    enabled: !!currentUser?.id
  });

  useEffect(() => {
    setIsLike(likeData > 0);
  }, [likeData]);

  useEffect(() => {
    if (currentUser?.id === data.uid) return setIcon(myIcon);
    if (isLike) return setIcon(likedIcon);
    switch (data.category) {
      case "운동/스포츠":
        setIcon(sports);
        break;
      case "게임":
        setIcon(game);
        break;
      case "아웃도어/여행":
        setIcon(travel);
        break;
      case "문화/공연":
        setIcon(culture);
        break;
      case "외국/언어":
        setIcon(language);
        break;
      case "친목":
        setIcon(social);
        break;
      default:
        setIcon(placeImage);
    }
  }, [currentUser, data, isLike]);

  return { icon };
};
