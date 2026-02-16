import { useRef, useEffect } from 'react';
import type { RecipeStep } from '../../types/recipe';
import { getStepStatus } from '../../hooks/useStepStatus';
import StepItem from './StepItem';

interface Props {
  steps: RecipeStep[];
  elapsedTime: number;
}

export default function StepList({ steps, elapsedTime }: Props) {
  const activeIndex = steps.findIndex(
    (step) => getStepStatus(step, elapsedTime) === 'active',
  );

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevActiveIndexRef = useRef<number>(-1);

  useEffect(() => {
    if (
      activeIndex >= 0 &&
      activeIndex !== prevActiveIndexRef.current &&
      stepRefs.current[activeIndex]
    ) {
      stepRefs.current[activeIndex]!.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
    prevActiveIndexRef.current = activeIndex;
  }, [activeIndex]);

  return (
    <div className="flex flex-col gap-2">
      {steps.map((step, index) => {
        const status = getStepStatus(step, elapsedTime);
        const isNextPreview =
          activeIndex >= 0 &&
          index === activeIndex + 1 &&
          status === 'pending';

        return (
          <div key={step.id} ref={(el) => { stepRefs.current[index] = el; }}>
            <StepItem
              step={step}
              status={status}
              elapsedTime={elapsedTime}
              isNextPreview={isNextPreview}
            />
          </div>
        );
      })}
    </div>
  );
}
