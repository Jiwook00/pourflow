import type { RecipeStep, StepStatus } from '../types/recipe';

export function getStepStatus(step: RecipeStep, elapsedTime: number): StepStatus {
  const duration = step.duration ?? 0;
  const alertBefore = step.alertBefore ?? 0;

  const stepEndTime = step.time + duration;
  const alertStartTime = step.time - alertBefore;

  if (elapsedTime >= stepEndTime) return 'completed';
  if (elapsedTime >= step.time) return 'active';
  if (alertBefore > 0 && elapsedTime >= alertStartTime) return 'upcoming';
  return 'pending';
}
