type Color = "red" | "yellow" | "green" | "blue" | "indigo" | "purple" | "pink" | "gray"

export type Ingredient = {
  name: string,
  amount: number
}

export type Recipe = {
  name: string,
  directions: string,
  content: string | null,
  ingredients: Ingredient[],
  color: Color
}

export const ratioRecipe = (recipeName: string, name: string, amount: number): Recipe => {
  const recipe = recipes.filter((r) => r.name === recipeName)[0]!
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
    name: "Espresso Martini",
    directions: "Combine ingredients in cocktail shaker with 1/3rd ice, shake really hard, and strain into a chilled cocktail glass. Garnish with a coffee bean.",
    content: null,
    color: "gray",
    ingredients: [
      { name: "Serves", amount: 1 },
      { name: "Coffee Liqueur", amount: 1 },
      { name: "Vodka", amount: 1 },
      { name: "Espresso", amount: 1 }
    ],
  },
  {
    name: "Vesper Martini",
    directions: "Combine ingredients, stir (20s), and strain into a chilled cocktail glass. Garnish with a large piece of lemon peel.",
    content: "Err on the lower side for the Lillet.",
    color: "gray",
    ingredients: [
      { name: "Serves", amount: 1 },
      { name: "Gin", amount: 1.5 },
      { name: "Vodka", amount: 0.5 },
      { name: "Lillet Blanc or Dry Vermouth", amount: 0.125 },
    ],
  },
  {
    name: "Martini (Dirty)",
    directions: "Combine ingredients, stir, and strain into a chilled cocktail glass. Garnish with an olive.",
    content: null,
    color: "gray",
    ingredients: [
      { name: "Serves", amount: 1 },
      { name: "Vodka or Gin", amount: 2 },
      { name: "Dry Vermouth", amount: 0.25 },
      { name: "Olive brine", amount: 0.25 },
    ],
  },
  {
    name: "Negroni",
    directions: "Combine ingredients, stir, then pour into a glass with a large piece of ice. Garnish with a slice of orange and a dash of bitters.",
    content: null,
    color: "red",
    ingredients: [
      { name: "Serves", amount: 1 },
      { name: "Gin", amount: 1 },
      { name: "Sweet Vermouth", amount: 1 },
      { name: "Campari", amount: 1 },
    ],
  },
  {
    name: "Mezcal Margarita",
    directions: "Combine ingredients, shake well, and strain into a chilled cocktail glass.",
    content: null,
    color: "yellow",
    ingredients: [
      { name: "Serves", amount: 1 },
      { name: "Mezcal", amount: 2 },
      { name: "Lime Juice", amount: 1.5 },
      { name: "Cointreau", amount: 1 },
      { name: "Agave Syrup", amount: 0.1 },
    ],
  },
  {
    name: "Tommy's Margarita",
    directions: "Combine, shake well, pour into a salt-rimmed glass with ice.",
    content: null,
    color: "green",
    ingredients: [
      { name: "Serves", amount: 1 },
      { name: "Tequila", amount: 2 },
      { name: "Lime Juice", amount: 1 },
      { name: "Agave Syrup", amount: 0.5 },
    ],
  },
  {
    name: "Aviation",
    directions: "Combine ingredients, shake well, and strain into a chilled cocktail glass. Garnish with a flamed lemon peel.",
    content: null,
    color: "purple",
    ingredients: [
      { name: "Serves", amount: 1 },
      { name: "Gin", amount: 2 },
      { name: "Maraschino Liqueur", amount: 0.25 },
      { name: "Crème De Violette Liqueur", amount: 0.25 },
      { name: "Lemon Juice", amount: 0.25 },
    ],
  },
  {
    name: "Gin & It",
    directions: "Combine ingredients at room temperature. Strain into a glass and garnish with a twist of orange and a dash of orange bitters.",
    content: null,
    color: "indigo",
    ingredients: [
      { name: "Serves", amount: 1 },
      { name: "Gin", amount: 1.5 },
      { name: "Sweet Vermouth", amount: 0.75 },
    ],
  },
  {
    name: "Whiskey Sour",
    directions: "Combine ingredients with ice, shake well, and strain into a chilled cocktail glass with ice.",
    content: null,
    color: "yellow",
    ingredients: [
      { name: "Serves", amount: 3 },
      { name: "Whiskey", amount: 6 },
      { name: "Lemon Juice", amount: 2.25 },
      { name: "Simple Syrup", amount: 2.25 },
      { name: "Egg (worth of) White", amount: 1 },
    ],
  },
  {
    name: "Gimlet",
    directions: "Combine ingredients with ice, shake well, and strain into a chilled cocktail glass with ice.",
    content: null,
    color: "green",
    ingredients: [
      { name: "Serves", amount: 1 },
      { name: "Gin", amount: 2 },
      { name: "Lime Juice", amount: 0.75 },
      { name: "Simple Syrup", amount: 0.5 },
    ],
  },
  {
    name: "Aperol Spritz",
    directions: "Pour into a glass with ice and garnish with a slice of orange.",
    content: null,
    color: "red",
    ingredients: [
      { name: "Serves", amount: 1 },
      { name: "Prosecco", amount: 3 },
      { name: "Aperol", amount: 2 },
      { name: "Soda Water", amount: 1 },
    ],
  },
  {
    name: "Fluffy Duck",
    directions: "Combine and shake.",
    content: null,
    color: "yellow",
    ingredients: [
      { name: "Serves", amount: 1 },
      { name: "Gin", amount: 1 },
      { name: "Advocaat", amount: 1 },
      { name: "Cointreau", amount: 0.66 },
      { name: "Orange Juice", amount: 0.66 },
      { name: "Soda Water", amount: 1 },
    ],
  },
  {
    name: "Harvey Wallbanger",
    directions: "Combine and stir.",
    content: null,
    color: "red",
    ingredients: [
      { name: "Serves", amount: 1 },
      { name: "Vodka", amount: 1 },
      { name: "Orange Juice", amount: 3 },
      { name: "Galliano", amount: 0.5 },
    ],
  },
  {
    name: "Mojito",
    directions: "Combine and shake with ice or muddle.",
    content: "Suggest using Malibu Rum for the coconut flavour.",
    color: "green",
    ingredients: [
      { name: "Serves", amount: 1 },
      { name: "White Rum", amount: 2 },
      { name: "Lime Juice", amount: 1 },
      { name: "Soda Water", amount: 1 },
      { name: "Sugar Syrup", amount: 0.5 },
      { name: "Mint Leaves", amount: 5 },
    ],
  },
  {
    name: "White Russian",
    directions: "Add Kahlua and vodka to a glass with ice, stir. Layer the cream on top.",
    content: null,
    color: "gray",
    ingredients: [
      { name: "Serves", amount: 1 },
      { name: "Kahlua", amount: 1 },
      { name: "Vodka", amount: 1 },
      { name: "Heavy cream (or milk)", amount: 1 },
    ],
  },
  {
    name: "Limencello Spritz",
    directions: "Fill a large wine glass with ice and then layer ingredients. Garnish with a slice of Orange.",
    content: null,
    color: "yellow",
    ingredients: [
      { name: "Serves", amount: 1 },
      { name: "Prosecco", amount: 3 },
      { name: "Limencello", amount: 2 },
      { name: "Soda", amount: 1 },
    ]
  }
]
