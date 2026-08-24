import { MatchOperator } from "../types/device.types";

export function matchString(
  sourceText: string,
  operator: MatchOperator,
  target: string
) {
  if (operator === "EQUALS") {
    return sourceText === target;
  } else if (operator === "CONTAINS") {
    return sourceText.includes(target);
  } else if (operator === "STARTS_WITH") {
    return sourceText.startsWith(target);
  } else if (operator === "ENDS_WITH") {
    return sourceText.endsWith(target);
  }
}

export function normalizeString(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_\s-]+/g, "");
}
