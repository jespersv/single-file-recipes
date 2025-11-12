import { Recipe } from "@/types/recipe";
import { Card } from "@/components/ui/card";

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

export const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
  return (
    <Card 
      className="p-4 cursor-pointer hover:bg-accent transition-colors"
      onClick={onClick}
    >
      <h2 className="text-lg font-semibold text-foreground">{recipe.header}</h2>
      <p className="text-sm text-muted-foreground mt-1">
        {recipe.ingredients.length} ingredienser · {recipe.instructions.length} steg
      </p>
    </Card>
  );
};
