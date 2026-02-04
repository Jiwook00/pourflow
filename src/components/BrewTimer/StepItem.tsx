import type { RecipeStep, StepStatus } from '../../types/recipe';
import { formatTime } from '../../utils/formatTime';
import { calculateStepProgress } from '../../utils/calculateProgress';

interface Props {
  step: RecipeStep;
  status: StepStatus;
  elapsedTime: number;
}

export default function StepItem({ step, status, elapsedTime }: Props) {
  const stepDuration = step.duration ?? 0;
  const stepProgress = calculateStepProgress(elapsedTime, step.time, stepDuration);

  if (status === 'completed') {
    return (
      <div className="flex items-start gap-2.5 bg-warm-100 rounded-xl px-3 py-2.5 border border-warm-200">
        <span className="text-base mt-0.5">✅</span>
        <div>
          <p className="text-warm-400 text-sm font-medium">{step.action}</p>
          {step.water > 0 && (
            <p className="text-xs text-warm-300">
              {step.water}g (누적 {step.cumulative}g)
            </p>
          )}
        </div>
      </div>
    );
  }

  if (status === 'active') {
    return (
      <div className="bg-blue-500 rounded-xl px-4 py-3.5 border border-blue-500 ring-2 ring-blue-200">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔵</span>
          <p className="text-white font-bold text-base">
            {step.action}{' '}
            <span className="text-blue-200 font-normal text-sm">(진행 중)</span>
          </p>
        </div>

        <div className="mt-2">
          {step.water > 0 && (
            <p className="text-blue-100 text-sm">
              {step.water}g 부어주세요 · 누적 {step.cumulative}g
            </p>
          )}
          {step.note && (
            <p className="text-blue-200 text-xs mt-1 italic">"{step.note}"</p>
          )}
        </div>

        <div className="mt-3">
          <div className="w-full h-1.5 bg-blue-400 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${stepProgress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (status === 'upcoming') {
    const secondsUntil = Math.ceil(step.time - elapsedTime);
    return (
      <div className="bg-orange-400 rounded-xl px-4 py-3 border border-orange-400 animate-pulse-soft">
        <div className="flex items-center gap-2">
          <span className="text-lg">⏰</span>
          <p className="text-white font-bold text-sm">준비: {step.action}</p>
        </div>

        <p className="text-orange-100 text-xs font-semibold mt-1">🔔 {secondsUntil}초 후!</p>

        <div className="mt-1.5">
          {step.water > 0 && (
            <p className="text-orange-100 text-sm">
              {step.water}g (누적 {step.cumulative}g)
            </p>
          )}
          {step.note && (
            <p className="text-orange-200 text-xs mt-0.5 italic">"{step.note}"</p>
          )}
        </div>
      </div>
    );
  }

  // pending
  return (
    <div className="flex items-start gap-2.5 bg-warm-100 rounded-xl px-3 py-2.5 border border-warm-200 opacity-60">
      <span className="text-base mt-0.5">⚪</span>
      <div>
        <p className="text-warm-600 text-sm font-medium">{step.action}</p>
        <p className="text-xs text-warm-400">
          {formatTime(step.time)}에 ·{' '}
          {step.water > 0 ? `${step.water}g (누적 ${step.cumulative}g)` : `누적 ${step.cumulative}g`}
        </p>
      </div>
    </div>
  );
}
