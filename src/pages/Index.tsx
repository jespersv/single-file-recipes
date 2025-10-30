import { useState } from "react";
import { recipes } from "@/data/recipes";
import { Recipe } from "@/types/recipe";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeDetail } from "@/components/RecipeDetail";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Index = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = recipes.filter(recipe =>
    recipe.header.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedRecipe) {
    return (
      <RecipeDetail 
        recipe={selectedRecipe} 
        onBack={() => setSelectedRecipe(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 pt-4">
          <h1 className="text-3xl font-bold text-foreground mb-6">Recept</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Sök recept..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </header>

        <div className="space-y-3">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={() => setSelectedRecipe(recipe)}
              />
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Inga recept hittades
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
