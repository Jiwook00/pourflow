export interface Recipe {
  id: string;
  name: string;
  type: 'hot' | 'iced';
  metadata: {
    coffee: {
      amount: string;
      grindSize: string;
      grindClicks: number | null;
    };
    water: {
      temperature: string;
      totalAmount: string;
    };
    equipment: {
      dripper: string;
      filter?: string;
    };
    time: {
      target: string;
      targetMin: number;
      targetMax: number;
    };
    source?: {
      url: string;
      label: string;
    };
  };
  steps: RecipeStep[];
  createdAt: string;
  updatedAt: string;
}

export interface RecipeStep {
  id: number;
  time: number;
  action: string;
  water: number;
  cumulative: number;
  note?: string;
  duration?: number;
  alertBefore?: number;
}

export type StepStatus = 'completed' | 'active' | 'upcoming' | 'pending';
