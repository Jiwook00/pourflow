import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useRecipe } from '../../hooks/useRecipes';
import { formatTime } from '../../utils/formatTime';

export default function Completion() {
  const { id } = useParams();
  const { recipe, loading } = useRecipe(id);
  const navigate = useNavigate();
  const location = useLocation();
  const actualTime: number = location.state?.actualTime ?? 0;

  if (loading || !recipe) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400">로딩...</p>
      </div>
    );
  }

  const { targetMin, targetMax } = recipe.metadata.time;
  const isWithinTarget = actualTime >= targetMin && actualTime <= targetMax;
  const isFast = actualTime < targetMin;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full text-center space-y-6">
        <div className="text-7xl">✅</div>
        <h1 className="text-2xl font-bold text-gray-900">브루잉 완료!</h1>

        <div>
          <p className="text-gray-400 text-sm">총 소요 시간</p>
          <p className="text-6xl font-bold font-mono text-gray-900 mt-1">
            {formatTime(actualTime)}
          </p>
        </div>

        <hr className="border-gray-200" />

        <div className="bg-gray-50 rounded-2xl p-4 text-left">
          <p className="font-semibold text-gray-900">
            {recipe.type === 'iced' ? '🧊' : '☕'} {recipe.name}
          </p>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-400">목표: {recipe.metadata.time.target}</p>
            <p
              className={`text-sm font-semibold ${
                isWithinTarget
                  ? 'text-emerald-600'
                  : isFast
                    ? 'text-sky-600'
                    : 'text-amber-600'
              }`}
            >
              실제: {formatTime(actualTime)} {isWithinTarget ? '✅' : '⚠️'}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-white border border-gray-200 text-gray-700 py-4 rounded-2xl font-semibold active:bg-gray-100 transition-colors"
          >
            🏠 처음으로
          </button>
          <button
            onClick={() => navigate(`/recipe/${id}/prep`)}
            className="w-full bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white py-4 rounded-2xl font-semibold transition-colors"
          >
            🔄 다시 시작
          </button>
        </div>
      </div>
    </div>
  );
}
