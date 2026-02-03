import type { RecipeStep } from '../../types/recipe';
import { getStepStatus } from '../../hooks/useStepStatus';
import StepItem from './StepItem';

interface Props {
  steps: RecipeStep[];
  elapsedTime: number;
}

export default function StepList({ steps, elapsedTime }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {steps.map((step) => (
        <StepItem
          key={step.id}
          step={step}
          status={getStepStatus(step, elapsedTime)}
          elapsedTime={elapsedTime}
        />
      ))}
    </div>
  );
}
