import "./style.css"

type Ingredient = {
  name: string,
  amount: number
};

type Recipe = {
  name: string,
  ingredients: Ingredient[],
}

function ratioRecipe(recipe: Recipe, name: string, amount: number): Recipe {
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

const app = document.querySelector<HTMLDivElement>("#app")!

const recipes = [
  {
    name: "Vesper Martini",
    ingredients: [
      { name: "Gin", amount: 3 },
      { name: "Vodka", amount: 1 },
      { name: "Lillet Blanc or Dry Vermouth", amount: 0.5 },
    ],
    directions: "Combine ingredients, shake well, and strain into a chilled cocktail glass. Garnish with a large piece of lemon peel."
  },
  {
    name: "Negroni",
    ingredients: [
      { name: "Gin", amount: 1 },
      { name: "Sweet Vermouth", amount: 1 },
      { name: "Campari", amount: 1 },
    ],
    directions: "TODO"
  },
  {
    name: "Mezcal Margarita",
    ingredients: [
      { name: "Mezcal", amount: 2 },
      { name: "Lime Juice", amount: 1.5 },
      { name: "Cointreau", amount: 1 },
      { name: "Agave Syrup", amount: 0.1 },
    ],
    directions: "TODO"
  },
]

// Write out the full color names so they don't get purged
const colors = [
  { light: "bg-red-50", medium: "bg-red-100", textDark: "text-red-900" },
  { light: "bg-yellow-50", medium: "bg-yellow-100", textDark: "text-yellow-900" },
  { light: "bg-green-50", medium: "bg-green-100", textDark: "text-green-900" },
  { light: "bg-blue-50", medium: "bg-blue-100", textDark: "text-blue-900" },
  { light: "bg-indigo-50", medium: "bg-indigo-100", textDark: "text-indigo-900" },
  { light: "bg-purple-50", medium: "bg-purple-100", textDark: "text-purple-900" },
  { light: "bg-pink-50", medium: "bg-pink-100", textDark: "text-pink-900" },
  { light: "bg-gray-50", medium: "bg-gray-100", textDark: "text-gray-900" },
]

const cocktailRowTemplate = document.querySelector<HTMLTemplateElement>("template#cocktail_row")!;
const ingredientTemplate = document.querySelector<HTMLTemplateElement>("template#ingredient")!;

app.addEventListener("input", (event) => {
  const ingredientName = (event.target! as HTMLElement).dataset["ingredient"]!
  const recipeName = (event.target! as HTMLElement).dataset["recipe"]
  const amount = parseFloat((event.target as HTMLInputElement).value)

  if (!amount) {
    return
  }

  const recipe = recipes.filter((r) => r.name === recipeName)[0]!

  const newRecipe = ratioRecipe(recipe, ingredientName, amount)

  for (const ingredient of newRecipe.ingredients) {
    const ingredientInput = document.querySelector<HTMLInputElement>(`[data-ingredient="${ingredient.name}"][data-recipe="${recipe.name}"]`)!
    ingredientInput.value = ingredient.amount.toFixed(1).endsWith('0') ? ingredient.amount.toString() : ingredient.amount.toFixed(1);
  }
})

let i = 0;
for (const recipe of recipes) {
  let c = colors[i % 8]

  var row = cocktailRowTemplate.content.cloneNode(true) as DocumentFragment
  const heading = row.querySelector<HTMLHeadingElement>("h1")!
  heading.textContent = recipe.name
  heading.classList.add(c.textDark)
  row.querySelector<HTMLElement>("div")!.classList.add(c.medium)

  for (const ingredient of recipe.ingredients) {
    var ingredientComponent = ingredientTemplate.content.cloneNode(true) as DocumentFragment
    const span = ingredientComponent.querySelector<HTMLSpanElement>("span")!
    span.innerText = ingredient.name
    span.classList.add(c.textDark)

    const input = ingredientComponent.querySelector<HTMLInputElement>("input")!
    input.setAttribute("value", ingredient.amount.toString())
    input.setAttribute("data-ingredient", ingredient.name)
    input.setAttribute("data-recipe", recipe.name)
    input.classList.add(c.light)

    row.querySelector<HTMLElement>("#ingredients")!.appendChild(ingredientComponent);
  }

  app.appendChild(row);
  i += 1
}
