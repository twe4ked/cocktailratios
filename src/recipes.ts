type Ingredient = {
  name: string,
  amount: number
}

export type Recipe = {
  name: string,
  directions: string,
  ingredients: Ingredient[],
}

export function ratioRecipe(recipe: Recipe, name: string, amount: number): Recipe {
  const keyIngredient = recipe.ingredients.filter((ingredient) => ingredient.name === name)[0]!

  return {
    ...recipe,
    ingredients: recipe.ingredients.map((ingredient) => {
      return {
        name: ingredient.name,
        amount: (ingredient.amount / keyIngredient.amount) * amount
      }
    }),
  }
}

export const recipes: Recipe[] = [
  {
    name: "Vesper Martini",
    directions: "Combine ingredients, shake well, and strain into a chilled cocktail glass. Garnish with a large piece of lemon peel.",
    ingredients: [
      { name: "Gin", amount: 3 },
      { name: "Vodka", amount: 1 },
      { name: "Lillet Blanc or Dry Vermouth", amount: 0.5 },
    ],
  },
  {
    name: "Negroni",
    directions: "Combine ingredients, stir, then pour into a glass with a large piece of ice. Garnish with a slice of orange and a dash of bitters.",
    ingredients: [
      { name: "Gin", amount: 1 },
      { name: "Sweet Vermouth", amount: 1 },
      { name: "Campari", amount: 1 },
    ],
  },
  {
    name: "Mezcal Margarita",
    directions: "Combine ingredients, shake well, and strain into a chilled cocktail glass.",
    ingredients: [
      { name: "Mezcal", amount: 2 },
      { name: "Lime Juice", amount: 1.5 },
      { name: "Cointreau", amount: 1 },
      { name: "Agave Syrup", amount: 0.1 },
    ],
  },
  {
    name: "Tommy's Margarita",
    directions: "Combine, shake well, pour into a salt-rimmed glass with ice.",
    ingredients: [
      { name: "Tequila", amount: 2 },
      { name: "Lime juice", amount: 1 },
      { name: "Agave syrup", amount: 0.5 },
    ],
  },
  {
    name: "Aviation",
    directions: "Combine ingredients, shake well, and strain into a chilled cocktail glass. Garnish with a flamed lemon peel.",
    ingredients: [
      { name: "Gin", amount: 2 },
      { name: "Maraschino liqueur", amount: 0.25 },
      { name: "Crème de violette liqueur", amount: 0.25 },
      { name: "Lemon juice", amount: 0.25 },
    ],
  },
  {
    name: "Gin & It",
    directions: "Combine ingredients and stir with ice. Strain into a chilled glass and garnish with a twist of orange and a dash of orange bitters.",
    ingredients: [
      { name: "Gin", amount: 2 },
      { name: "Sweet vermouth", amount: 1.5 },
    ],
  },
].sort(() => 0.5 - Math.random());
