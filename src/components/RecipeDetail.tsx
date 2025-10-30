import { Recipe } from "@/types/recipe";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
}

export const RecipeDetail = ({ recipe, onBack }: RecipeDetailProps) => {
  return (
    <div className="min-h-screen bg-background p-4">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Tillbaka
      </Button>

      <Card className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">{recipe.header}</h1>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">Ingredienser</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-foreground flex gap-2">
                <span className="text-muted-foreground min-w-[60px]">
                  {ingredient.amount} {ingredient.unitSymbol}
                </span>
                <span>{ingredient.ingredientName}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">Instruktioner</h2>
          <ol className="space-y-3">
            {recipe.instructions.map((instruction) => (
              <li key={instruction.stepNumber} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  {instruction.stepNumber}
                </span>
                <span className="text-foreground pt-0.5">{instruction.instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      </Card>
    </div>
  );
};
