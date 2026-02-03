import type { Recipe } from '../../types/recipe';

interface Props {
  recipe: Recipe;
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400 font-medium">{label}</p>
      <p className="text-gray-900 text-sm">{value}</p>
    </div>
  );
}

export default function RecipeMetadata({ recipe }: Props) {
  return (
    <div className="space-y-4">
      <span
        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
          recipe.type === 'iced' ? 'bg-sky-100 text-sky-600' : 'bg-orange-100 text-orange-600'
        }`}
      >
        {recipe.type === 'iced' ? '🧊 ICED' : '☕ HOT'}
      </span>

      <div className="space-y-3 pt-1">
        <MetaRow
          label="🫘 원두"
          value={`${recipe.metadata.coffee.amount} (${recipe.metadata.coffee.grindSize} 분쇄)`}
        />
        <MetaRow
          label="💧 물"
          value={`${recipe.metadata.water.temperature}, 총 ${recipe.metadata.water.totalAmount}`}
        />
        <MetaRow label="🔹 드리퍼" value={recipe.metadata.equipment.dripper} />
        <MetaRow label="⏱️ 예상 시간" value={recipe.metadata.time.target} />

        {recipe.metadata.source?.url && (
          <div>
            <p className="text-xs text-gray-400 font-medium">📎 출처</p>
            <a
              href={recipe.metadata.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 text-sm hover:underline"
            >
              {recipe.metadata.source.label} →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
