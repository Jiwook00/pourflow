import type { RecipeStep } from '../../types/recipe';
import { formatTime } from '../../utils/formatTime';

interface Props {
  steps: RecipeStep[];
}

export default function StepPreview({ steps }: Props) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-warm-400 mb-3 uppercase tracking-wide">
        📝 브루잉 단계 미리보기
      </h3>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex items-start gap-3 bg-warm-100 rounded-xl p-4"
          >
            <div className="w-8 h-8 rounded-full bg-brew-100 text-brew-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
              {index + 1}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-warm-900">{step.action}</p>
                <span className="text-warm-500 text-sm font-timer">{formatTime(step.time)}</span>
              </div>
              <p className="text-sm text-warm-500 mt-1">
                {step.water > 0
                  ? `${step.water}g → 누적 ${step.cumulative}g`
                  : `누적 ${step.cumulative}g`}
              </p>
              {step.note && (
                <p className="text-xs text-warm-400 mt-1 italic">{step.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
