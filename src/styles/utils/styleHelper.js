import { numberToPx } from "./numberToPx";
import { toKebabCase } from "./toKebabCase";

export const styleHelper = (property, value) => {
  return `${toKebabCase(property)}: ${numberToPx(value)};`;
};
