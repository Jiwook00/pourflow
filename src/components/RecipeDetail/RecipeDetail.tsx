import { useNavigate, useParams } from 'react-router-dom';
import { useRecipe } from '../../hooks/useRecipes';
import { initAudioContext } from '../../utils/audioContext';
import RecipeMetadata from './RecipeMetadata';
import StepPreview from './StepPreview';

export default function RecipeDetail() {
  const { id } = useParams();
  const { recipe, loading } = useRecipe(id);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400">로딩...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400">레시피를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const handleStart = () => {
    initAudioContext();
    navigate(`/recipe/${id}/prep`);
  };

  return (
    <div className="p-4 pb-28">
      <header className="flex items-center gap-2 py-4 mb-4">
        <button onClick={() => navigate('/')} className="text-gray-400 text-xl px-1">
          ←
        </button>
        <h1 className="text-base font-bold text-gray-900 truncate">
          {recipe.type === 'iced' ? '🧊' : '☕'} {recipe.name}
        </h1>
      </header>

      <div className="space-y-6">
        <RecipeMetadata recipe={recipe} />
        <hr className="border-gray-200" />
        <StepPreview steps={recipe.steps} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleStart}
            className="w-full bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white py-4 rounded-2xl text-lg font-semibold transition-colors"
          >
            🚀 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
