import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecipe } from '../../hooks/useRecipes';
import { formatTime } from '../../utils/formatTime';

export default function PrepCountdown() {
  const { id } = useParams();
  const { recipe, loading } = useRecipe(id);
  const navigate = useNavigate();
  const [count, setCount] = useState(2);

  useEffect(() => {
    if (loading || !recipe) return;

    const timer = setTimeout(() => {
      if (count <= 1) {
        navigate(`/recipe/${id}/timer`);
      } else {
        setCount((prev) => prev - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, loading, recipe, id, navigate]);

  if (loading || !recipe) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400">로딩...</p>
      </div>
    );
  }

  const firstStep = recipe.steps[0];
  const secondStep = recipe.steps.length > 1 ? recipe.steps[1] : null;

  return (
    <div className="min-h-screen flex flex-col p-6 gap-8 pt-20">
      {/* Countdown number */}
      <div className="text-center">
        <p className="text-gray-400 text-lg">시작까지</p>
        <p className="text-9xl font-bold text-indigo-500 mt-2 leading-none">{count}</p>
        <p className="text-gray-300 text-sm mt-3">(자동 시작)</p>
      </div>

      {/* First step — highlighted */}
      <div className="w-full bg-indigo-50 border border-indigo-200 rounded-2xl p-5">
        <p className="text-indigo-600 font-bold text-lg flex items-center gap-2">
          <span>🔵</span>
          첫 단계: {firstStep.action}
        </p>
        {firstStep.water > 0 && (
          <p className="text-gray-700 text-base mt-1.5">{firstStep.water}g 부어주세요</p>
        )}
        {firstStep.note && (
          <p className="text-gray-500 text-sm mt-2 italic">"{firstStep.note}"</p>
        )}
      </div>

      {/* Second step — preview */}
      {secondStep && (
        <div className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-5">
          <p className="text-gray-500 font-semibold flex items-center gap-2">
            <span>⚪</span>
            다음: {secondStep.action}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            {formatTime(secondStep.time)}에 시작 · {secondStep.water}g (누적{' '}
            {secondStep.cumulative}g)
          </p>
          {secondStep.note && (
            <p className="text-gray-400 text-xs mt-1 italic">"{secondStep.note}"</p>
          )}
        </div>
      )}
    </div>
  );
}
