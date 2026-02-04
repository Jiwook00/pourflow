import type { Recipe } from '../../types/recipe';

interface Props {
  recipe: Recipe;
}

interface MetaBoxProps {
  icon: string;
  label: string;
  value: string;
  subValue?: string;
}

function MetaBox({ icon, label, value, subValue }: MetaBoxProps) {
  return (
    <div className="bg-warm-50 rounded-xl p-4 shadow-card">
      <div className="flex items-center gap-2 text-warm-400 text-xs mb-1">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <p className="text-warm-900 font-semibold">{value}</p>
      {subValue && <p className="text-warm-500 text-xs mt-0.5">{subValue}</p>}
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

      <div className="grid grid-cols-2 gap-3">
        <MetaBox
          icon="🫘"
          label="원두"
          value={recipe.metadata.coffee.amount}
          subValue={recipe.metadata.coffee.grindSize}
        />
        <MetaBox
          icon="💧"
          label="물"
          value={recipe.metadata.water.temperature}
          subValue={`총 ${recipe.metadata.water.totalAmount}`}
        />
        <MetaBox
          icon="◆"
          label="드리퍼"
          value={recipe.metadata.equipment.dripper}
        />
        <MetaBox
          icon="⏱"
          label="예상 시간"
          value={recipe.metadata.time.target}
        />
      </div>

      {recipe.metadata.source?.url && (
        <a
          href={recipe.metadata.source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-brew-500 text-sm hover:underline"
        >
          <span>↗</span>
          <span>{recipe.metadata.source.label}</span>
        </a>
      )}
    </div>
  );
}
