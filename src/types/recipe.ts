export interface Ingredient {
  amount: number;
  unit: string;
  unitSymbol: string;
  ingredientName: string;
}

export interface Instruction {
  stepNumber: number;
  instruction: string;
}

export interface Recipe {
  id: string;
  header: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
}
