import type { Recipe } from '../../types/recipe';

interface Props {
  recipe: Recipe;
  onClick: () => void;
}

export default function RecipeCard({ recipe, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-xl shadow-sm border border-gray-100 p-4 active:bg-gray-50 transition-colors"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {recipe.type === 'iced' ? '🧊' : '☕'} {recipe.name}
        </h3>
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            recipe.type === 'iced'
              ? 'bg-sky-100 text-sky-600'
              : 'bg-orange-100 text-orange-600'
          }`}
        >
          {recipe.type === 'iced' ? 'ICED' : 'HOT'}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
        <span>🌡️ {recipe.metadata.water.temperature}</span>
        <span>🫘 {recipe.metadata.coffee.amount}</span>
        <span>⏱️ {recipe.metadata.time.target}</span>
      </div>

      <p className="mt-1 text-xs text-gray-400">🔹 {recipe.metadata.equipment.dripper}</p>
    </button>
  );
}
