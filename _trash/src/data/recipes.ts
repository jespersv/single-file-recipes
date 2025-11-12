import { Recipe } from "@/types/recipe";

export const recipes: Recipe[] = [
  {
    id: "1",
    header: "Indisk gryta",
    ingredients: [
      { amount: 100, unit: "grams", unitSymbol: "g", ingredientName: "smör" },
      { amount: 1, unit: "tablespoon", unitSymbol: "msk", ingredientName: "olja" },
      { amount: 2, unit: "pieces", unitSymbol: "st", ingredientName: "gula lökar, hackade" },
      { amount: 4, unit: "cloves", unitSymbol: "klyftor", ingredientName: "vitlök, pressade" },
      { amount: 50, unit: "grams", unitSymbol: "g", ingredientName: "färsk ingefära, riven" },
      { amount: 2, unit: "tablespoon", unitSymbol: "msk", ingredientName: "garam masala" },
      { amount: 1, unit: "tablespoon", unitSymbol: "msk", ingredientName: "gurkmeja" },
      { amount: 1, unit: "tablespoon", unitSymbol: "msk", ingredientName: "spiskummin" },
      { amount: 3, unit: "tablespoon", unitSymbol: "msk", ingredientName: "tomatpuré" },
      { amount: 800, unit: "grams", unitSymbol: "g", ingredientName: "krossade tomater" },
      { amount: 400, unit: "milliliters", unitSymbol: "ml", ingredientName: "kokosmjölk" },
      { amount: 600, unit: "grams", unitSymbol: "g", ingredientName: "kycklingfilé, tärnad" },
      { amount: 1, unit: "pieces", unitSymbol: "st", ingredientName: "salt och peppar" }
    ],
    instructions: [
      { stepNumber: 1, instruction: "Fräs lök, vitlök och ingefära i smör och olja tills löken är mjuk" },
      { stepNumber: 2, instruction: "Tillsätt kryddor och tomatpuré, fräs i 1 minut" },
      { stepNumber: 3, instruction: "Häll i krossade tomater och kokosmjölk, låt sjuda i 10 minuter" },
      { stepNumber: 4, instruction: "Tillsätt kycklingen och låt koka tills den är genomstekt, ca 15-20 minuter" },
      { stepNumber: 5, instruction: "Smaka av med salt och peppar. Servera med ris eller naanbröd" }
    ]
  },
  {
    id: "2",
    header: "Klassisk köttfärssås",
    ingredients: [
      { amount: 500, unit: "grams", unitSymbol: "g", ingredientName: "nötfärs" },
      { amount: 1, unit: "pieces", unitSymbol: "st", ingredientName: "gul lök, hackad" },
      { amount: 2, unit: "cloves", unitSymbol: "klyftor", ingredientName: "vitlök, pressade" },
      { amount: 400, unit: "grams", unitSymbol: "g", ingredientName: "krossade tomater" },
      { amount: 2, unit: "tablespoon", unitSymbol: "msk", ingredientName: "tomatpuré" },
      { amount: 2, unit: "teaspoon", unitSymbol: "tsk", ingredientName: "oregano" },
      { amount: 1, unit: "teaspoon", unitSymbol: "tsk", ingredientName: "basilika" },
      { amount: 1, unit: "pieces", unitSymbol: "st", ingredientName: "salt och peppar" }
    ],
    instructions: [
      { stepNumber: 1, instruction: "Bryn färsen i en kastrull på hög värme tills den får färg" },
      { stepNumber: 2, instruction: "Tillsätt lök och vitlök, fräs i 2-3 minuter" },
      { stepNumber: 3, instruction: "Tillsätt tomatpuré och fräs i 1 minut" },
      { stepNumber: 4, instruction: "Häll i krossade tomater och kryddor" },
      { stepNumber: 5, instruction: "Låt sjuda i minst 20 minuter. Smaka av med salt och peppar" }
    ]
  },
  {
    id: "3",
    header: "Pannkakor",
    ingredients: [
      { amount: 3, unit: "pieces", unitSymbol: "st", ingredientName: "ägg" },
      { amount: 300, unit: "milliliters", unitSymbol: "ml", ingredientName: "mjöl" },
      { amount: 600, unit: "milliliters", unitSymbol: "ml", ingredientName: "mjölk" },
      { amount: 0.5, unit: "teaspoon", unitSymbol: "tsk", ingredientName: "salt" },
      { amount: 2, unit: "tablespoon", unitSymbol: "msk", ingredientName: "smör, smält" }
    ],
    instructions: [
      { stepNumber: 1, instruction: "Vispa ihop ägg och hälften av mjölken" },
      { stepNumber: 2, instruction: "Tillsätt mjöl och salt, vispa tills smeten är slät" },
      { stepNumber: 3, instruction: "Rör ner resten av mjölken och det smälta smöret" },
      { stepNumber: 4, instruction: "Låt smeten vila i 30 minuter om möjligt" },
      { stepNumber: 5, instruction: "Stek tunna pannkakor i smör på medelvärme" }
    ]
  },
  {
    id: "4",
    header: "Caesarsallad",
    ingredients: [
      { amount: 2, unit: "pieces", unitSymbol: "st", ingredientName: "romansallad" },
      { amount: 300, unit: "grams", unitSymbol: "g", ingredientName: "kycklingfilé" },
      { amount: 100, unit: "grams", unitSymbol: "g", ingredientName: "parmesanost" },
      { amount: 100, unit: "grams", unitSymbol: "g", ingredientName: "krutonger" },
      { amount: 150, unit: "milliliters", unitSymbol: "ml", ingredientName: "caesardressing" },
      { amount: 1, unit: "pieces", unitSymbol: "st", ingredientName: "salt och peppar" }
    ],
    instructions: [
      { stepNumber: 1, instruction: "Krydda kycklingfiléerna med salt och peppar" },
      { stepNumber: 2, instruction: "Stek kycklingen tills den är genomstekt, låt svalna och skär i strimlor" },
      { stepNumber: 3, instruction: "Skölj och dela salladen i lagom stora bitar" },
      { stepNumber: 4, instruction: "Blanda sallad, kyckling, krutonger och dressing" },
      { stepNumber: 5, instruction: "Toppa med riven parmesan och servera" }
    ]
  }
];
