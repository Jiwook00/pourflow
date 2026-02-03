import type { RecipeStep } from '../../types/recipe';
import { formatTime } from '../../utils/formatTime';

interface Props {
  steps: RecipeStep[];
}

export default function StepPreview({ steps }: Props) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">
        📝 브루잉 단계 미리보기
      </h3>

      <div>
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {index + 1}
              </div>
              {index < steps.length - 1 && <div className="w-0.5 h-5 bg-gray-200" />}
            </div>

            <div className="pb-5">
              <p className="font-medium text-gray-900 text-sm">
                {step.action}
                <span className="text-gray-400 font-normal ml-2">({formatTime(step.time)})</span>
              </p>
              <p className="text-xs text-gray-500">
                {step.water > 0
                  ? `${step.water}g → 누적 ${step.cumulative}g`
                  : `누적 ${step.cumulative}g`}
              </p>
              {step.note && <p className="text-xs text-gray-400 mt-0.5 italic">{step.note}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
