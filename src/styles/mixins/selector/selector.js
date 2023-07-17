import { toKebabCase } from "styles/utils";

export const selector = (property, selectors) =>
  Object.entries(selectors).map(
    ([key, value]) => `&:${key} { ${toKebabCase(property)} : ${value} };`
  );
