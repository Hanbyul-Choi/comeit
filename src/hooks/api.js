import axios from "axios";

export const getData = async position => {
  console.log(position);

  const { lat, lng } = position;
  const address = await axios.get(`${process.env.REACT_APP_KAKAO_RESTFUL_URL}?x=${lng}&y=${lat}`, {
    headers: {
      Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_RESTFUL_KEY}`
    }
  });
  return address.data.documents[0].address.address_name;
};
