export const numberToPx = number => {
  return typeof number === "number" ? `${number}px` : number;
};
