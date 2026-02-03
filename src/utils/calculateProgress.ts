export function calculateOverallProgress(elapsedTime: number, totalTime: number): number {
  if (totalTime === 0) return 0;
  return Math.min((elapsedTime / totalTime) * 100, 100);
}

export function calculateStepProgress(
  elapsedTime: number,
  stepStart: number,
  stepDuration: number
): number {
  if (stepDuration === 0) return 100;
  if (elapsedTime < stepStart) return 0;
  if (elapsedTime >= stepStart + stepDuration) return 100;
  return ((elapsedTime - stepStart) / stepDuration) * 100;
}
