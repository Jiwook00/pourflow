import { useState, useEffect } from 'react';
import type { Recipe } from '../types/recipe';

let cachedRecipes: Recipe[] | null = null;

function normalizeRecipes(recipes: Recipe[]): Recipe[] {
  return recipes.map((recipe) => {
    if (!recipe.steps || recipe.steps.length === 0) return recipe;

    const timeMeta = recipe.metadata?.time;
    const targetTotal =
      (timeMeta && (timeMeta.targetMax ?? timeMeta.targetMin)) ?? 0;

    const normalizedSteps = recipe.steps.map((step, index) => {
      const next = recipe.steps[index + 1];

      let duration = step.duration;
      if (duration == null) {
        if (next) {
          duration = Math.max(0, next.time - step.time);
        } else if (targetTotal > step.time) {
          duration = targetTotal - step.time;
        } else {
          duration = 0;
        }
      }

      const alertBefore = step.alertBefore ?? 0;

      return {
        ...step,
        duration,
        alertBefore,
      };
    });

    return {
      ...recipe,
      steps: normalizedSteps,
    };
  });
}

function fetchRecipes(): Promise<Recipe[]> {
  if (cachedRecipes) return Promise.resolve(cachedRecipes);
  return fetch('/data/recipes.json')
    .then((res) => res.json())
    .then((data) => {
      const normalized = normalizeRecipes(data.recipes);
      cachedRecipes = normalized;
      return normalized;
    });
}

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes().then((data) => {
      setRecipes(data);
      setLoading(false);
    });
  }, []);

  return { recipes, loading };
}

export function useRecipe(id: string | undefined) {
  const { recipes, loading } = useRecipes();
  const recipe = id ? recipes.find((r) => r.id === id) : undefined;
  return { recipe, loading };
}
