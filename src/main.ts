import "./style.css"

import { Recipe, ratioRecipe, recipes } from "./recipes"

const app = document.querySelector<HTMLDivElement>("#app")!

// Write out the full color names so they don't get purged
import colors from "tailwindcss/colors"
const colorClasses = [
  { light: "bg-red-50", medium: "bg-red-100", textDark: "text-red-900", button: colors.red[400] },
  { light: "bg-yellow-50", medium: "bg-yellow-100", textDark: "text-yellow-900", button: colors.yellow[400] },
  { light: "bg-green-50", medium: "bg-green-100", textDark: "text-green-900", button: colors.green[400] },
  { light: "bg-blue-50", medium: "bg-blue-100", textDark: "text-blue-900", button: colors.blue[400] },
  { light: "bg-indigo-50", medium: "bg-indigo-100", textDark: "text-indigo-900", button: colors.indigo[400] },
  { light: "bg-purple-50", medium: "bg-purple-100", textDark: "text-purple-900", button: colors.purple[400] },
  { light: "bg-pink-50", medium: "bg-pink-100", textDark: "text-pink-900", button: colors.pink[400] },
  { light: "bg-gray-50", medium: "bg-gray-100", textDark: "text-gray-900", button: colors.gray[400] },
]

const cocktailRowTemplate = document.querySelector<HTMLTemplateElement>("template#cocktail_row")!;
const ingredientTemplate = document.querySelector<HTMLTemplateElement>("template#ingredient")!;

app.addEventListener("input", (event) => {
  const input = event.target! as HTMLInputElement
  const ingredientName = input.dataset["ingredient"]!
  const recipeName = input.dataset["recipe"]

  if (input.value.endsWith(".")) {
    return
  }
  const newValue = parseFloat(input.value)
  if (!newValue) {
    return
  }

  const recipe = recipes.filter((r) => r.name === recipeName)[0]!
  const newRecipe = ratioRecipe(recipe, ingredientName, newValue)

  setFields(newRecipe)
})

app.addEventListener("click", (event) => {
  if (event.target instanceof HTMLButtonElement) {
    const up = event.target.classList.contains("up-button")
    const down = event.target.classList.contains("down-button")

    if (up || down) {
      const label = event.target.parentElement as HTMLLabelElement
      const input = label.querySelector<HTMLInputElement>("input")!
      const ingredientName = input.dataset["ingredient"]!
      const recipeName = input.dataset["recipe"]

      const value = parseFloat(input.value)
      const newValue = up ? Math.floor(value + 1) : Math.ceil(value - 1)
      if (newValue <= 0) {
        return
      }

      const recipe = recipes.filter((r) => r.name === recipeName)[0]!
      const newRecipe = ratioRecipe(recipe, ingredientName, newValue)

      setFields(newRecipe)
    }
  }
})

const setFields = (recipe: Recipe) => {
  for (const ingredient of recipe.ingredients) {
    const ingredientInput = document.querySelector<HTMLInputElement>(`[data-ingredient="${ingredient.name}"][data-recipe="${recipe.name}"]`)!
    ingredientInput.value = ingredient.amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
  }
}

for (const [i, recipe] of recipes.entries()) {
  let c = colorClasses[i % 8]

  const row = cocktailRowTemplate.content.cloneNode(true) as DocumentFragment
  const heading = row.querySelector<HTMLHeadingElement>("h1")!
  heading.textContent = recipe.name
  heading.classList.add(c.textDark)
  row.querySelector<HTMLElement>("div")!.classList.add(c.medium)
  const directions = row.querySelector<HTMLSpanElement>(`[slot="directions"]`)!
  directions.textContent = recipe.directions
  directions.classList.add(c.textDark)

  for (const ingredient of recipe.ingredients) {
    const ingredientComponent = ingredientTemplate.content.cloneNode(true) as DocumentFragment

    const label = ingredientComponent.querySelector<HTMLLabelElement>("label")!
    label.insertAdjacentText("beforeend", ingredient.name)
    label.classList.add(c.textDark)
    label.querySelector<HTMLLabelElement>("div")!.classList.add(c.light)

    const paths = ingredientComponent.querySelectorAll<HTMLElement>("button svg path")!
    for (const p of Array.from(paths)) {
      p.setAttribute("fill", c.button)
    }

    const input = ingredientComponent.querySelector<HTMLInputElement>("input")!
    input.setAttribute("value", ingredient.amount.toString())
    input.setAttribute("data-ingredient", ingredient.name)
    input.setAttribute("data-recipe", recipe.name)

    row.querySelector<HTMLElement>(`[slot="ingredients"]`)!.appendChild(ingredientComponent);
  }

  app.appendChild(row);
}
