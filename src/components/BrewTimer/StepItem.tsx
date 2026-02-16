import type { RecipeStep, StepStatus } from '../../types/recipe';
import { formatTime } from '../../utils/formatTime';
import { calculateStepProgress } from '../../utils/calculateProgress';

interface Props {
  step: RecipeStep;
  status: StepStatus;
  elapsedTime: number;
  isNextPreview?: boolean;
}

export default function StepItem({ step, status, elapsedTime, isNextPreview }: Props) {
  const stepDuration = step.duration ?? 0;
  const stepProgress = calculateStepProgress(elapsedTime, step.time, stepDuration);

  if (status === 'completed') {
    return (
      <div className="flex items-center gap-3 bg-emerald-50 rounded-xl px-4 py-3 border border-emerald-200">
        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm">✓</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-emerald-600 font-semibold">{step.action}</p>
          {step.water > 0 && (
            <p className="text-sm text-emerald-500">
              {step.water}g (누적 {step.cumulative}g)
            </p>
          )}
        </div>
        <span className="text-emerald-400 text-sm font-timer">{formatTime(step.time)}</span>
      </div>
    );
  }

  if (status === 'active') {
    return (
      <div className="bg-blue-50 rounded-xl px-4 py-4 border-2 border-blue-400 animate-pulse-soft">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full border-2 border-blue-500 flex items-center justify-center flex-shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            </div>
            <p className="text-blue-600 text-sm font-medium">
              진행 중: {step.action}
            </p>
          </div>
          <span className="text-warm-400 text-sm font-timer">{formatTime(step.time)}</span>
        </div>

        <div className="mt-3 ml-9">
          {step.water > 0 && (
            <p className="text-warm-900">
              <span className="text-2xl font-bold font-timer">{step.water}g</span>
              <span className="text-warm-500 text-base ml-2">(누적 {step.cumulative}g)</span>
            </p>
          )}
          {step.note && (
            <p className="text-warm-600 text-base mt-2">"{step.note}"</p>
          )}
        </div>

        <div className="mt-4 ml-9">
          <div className="w-full h-1.5 bg-warm-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${stepProgress}%` }}
            />
          </div>
          <p className="text-warm-400 text-sm text-right mt-1">{Math.round(elapsedTime - step.time)}초</p>
        </div>
      </div>
    );
  }

  if (status === 'upcoming') {
    const secondsUntil = Math.ceil(step.time - elapsedTime);
    return (
      <div className="bg-orange-50 rounded-xl px-4 py-3 border-2 border-orange-400 animate-pulse-soft">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-orange-400 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs">⏰</span>
            </div>
            <p className="text-orange-600 text-sm font-medium">
              준비: {step.action}
            </p>
          </div>
          <span className="text-orange-500 text-sm font-semibold">{secondsUntil}초 후</span>
        </div>

        <div className="mt-2 ml-9">
          {step.water > 0 && (
            <p className="text-warm-700">
              <span className="text-xl font-bold font-timer">{step.water}g</span>
              <span className="text-warm-500 text-sm ml-2">(누적 {step.cumulative}g)</span>
            </p>
          )}
          {step.note && (
            <p className="text-warm-500 text-sm mt-1">"{step.note}"</p>
          )}
        </div>
      </div>
    );
  }

  // next preview — pending but immediately after active step
  if (isNextPreview) {
    return (
      <div className="bg-warm-50 rounded-xl px-4 py-3 border border-warm-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-warm-200 flex items-center justify-center flex-shrink-0">
              <span className="text-warm-400 text-xs">⏱</span>
            </div>
            <p className="text-warm-600 text-sm font-medium">
              다음: {step.action}
            </p>
          </div>
          <span className="text-warm-400 text-sm font-timer">{formatTime(step.time)}</span>
        </div>

        <div className="mt-2 ml-9">
          {step.water > 0 && (
            <p className="text-warm-600">
              <span className="text-xl font-bold font-timer">{step.water}g</span>
              <span className="text-warm-400 text-sm ml-2">(누적 {step.cumulative}g)</span>
            </p>
          )}
          {step.note && (
            <p className="text-warm-400 text-sm mt-1">"{step.note}"</p>
          )}
        </div>
      </div>
    );
  }

  // pending
  return (
    <div className="flex items-center gap-3 bg-warm-100 rounded-xl px-4 py-3 border border-warm-200">
      <div className="w-8 h-8 rounded-full bg-warm-200 flex items-center justify-center flex-shrink-0">
        <span className="text-warm-400 text-xs">⏱</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-warm-500 font-medium">{step.action}</p>
      </div>
      <span className="text-warm-400 text-sm font-timer">{formatTime(step.time)}</span>
    </div>
  );
}
