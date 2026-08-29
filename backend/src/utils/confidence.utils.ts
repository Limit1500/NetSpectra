export function getConfidence(maxScore: number, scoresSum: number) {
  return scoresSum > 0 ? maxScore / scoresSum : 0;
}
