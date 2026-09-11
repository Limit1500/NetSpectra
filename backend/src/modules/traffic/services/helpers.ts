export function getConfidence(maxScore: number, scoresSum: number) {
  return scoresSum > 0 ? maxScore / scoresSum : 0;
}

import { MatchOperator } from "../types";

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
  } else {
    return sourceText.endsWith(target);
  }
}

export function normalizeString(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_\s-]+/g, "");
}
