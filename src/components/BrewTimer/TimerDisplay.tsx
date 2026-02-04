import { formatTime } from '../../utils/formatTime';
import type { RecipeStep } from '../../types/recipe';

interface Props {
  elapsedTime: number;
  nextStep: RecipeStep | null;
}

export default function TimerDisplay({ elapsedTime, nextStep }: Props) {
  const timeUntilNext = nextStep ? nextStep.time - elapsedTime : null;

  return (
    <div className="text-center py-2">
      <p className="text-7xl font-bold font-timer text-warm-900 leading-none">
        {formatTime(elapsedTime)}
      </p>

      {nextStep && timeUntilNext !== null && timeUntilNext > 0 && (
        <p
          className={`text-sm mt-2 font-medium ${
            timeUntilNext <= 5 ? 'text-orange-500 animate-pulse-soft' : 'text-warm-400'
          }`}
        >
          다음: {formatTime(nextStep.time)} ({Math.ceil(timeUntilNext)}초 후)
        </p>
      )}
    </div>
  );
}
