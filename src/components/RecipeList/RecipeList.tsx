import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../../hooks/useRecipes';
import RecipeCard from './RecipeCard';

export default function RecipeList() {
  const { recipes, loading } = useRecipes();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400">로딩...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <header className="py-6">
        <h1 className="text-2xl font-bold text-gray-900">☕ BrewTimer</h1>
      </header>

      <p className="text-sm font-medium text-gray-400 mb-3">내 레시피 ({recipes.length})</p>

      <div className="flex flex-col gap-3">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onClick={() => navigate(`/recipe/${recipe.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
