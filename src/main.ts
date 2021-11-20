import "./style.css"

import { Recipe, ratioRecipe, recipes } from "./recipes"

const app = document.querySelector<HTMLDivElement>("#app")!

// Write out the full color names so they don't get purged
const colorClasses = [
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
  const input = event.target! as HTMLInputElement
  const ingredientName = input.dataset["ingredient"]!
  const recipeName = input.dataset["recipe"]!

  if (input.value.endsWith(".")) {
    return
  }
  const newValue = parseFloat(input.value)
  if (!newValue) {
    return
  }

  const newRecipe = ratioRecipe(recipeName, ingredientName, newValue)

  setFields(newRecipe)
})

const changeAmount = (event: MouseEvent, isUp: boolean) => {
  const button = event.target! as HTMLButtonElement
  const label = button.parentElement as HTMLLabelElement
  const input = label.querySelector<HTMLInputElement>("input")!
  const ingredientName = input.dataset["ingredient"]!
  const recipeName = input.dataset["recipe"]!

  const value = parseFloat(input.value)
  const newValue = isUp ? Math.floor(value + 1) : Math.ceil(value - 1)
  if (newValue <= 0) {
    return
  }

  const newRecipe = ratioRecipe(recipeName, ingredientName, newValue)

  setFields(newRecipe)
}

const setFields = (recipe: Recipe) => {
  for (const ingredient of recipe.ingredients) {
    const ingredientInput = app.querySelector<HTMLInputElement>(`[data-ingredient="${ingredient.name}"][data-recipe="${recipe.name}"]`)!
    ingredientInput.value = ingredient.amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
  }
}

for (const [i, recipe] of recipes.entries()) {
  let c = colorClasses[i % 8]

  const row = cocktailRowTemplate.content.cloneNode(true) as DocumentFragment
  const heading = row.querySelector<HTMLHeadingElement>("h1")!
  heading.textContent = recipe.name
  heading.classList.add(c.textDark)
  const id = recipe.name.toLowerCase().replace(/\W/g, "-").replace(/-+/g, "-")
  row.querySelector<HTMLLinkElement>("a")!.href = `#${id}`
  const div = row.querySelector<HTMLElement>("div")!
  div.classList.add(c.medium)
  div.id = id
  const directions = row.querySelector<HTMLSpanElement>(`[slot="directions"]`)!
  directions.textContent = recipe.directions
  directions.classList.add(c.textDark)

  for (const ingredient of recipe.ingredients) {
    const ingredientComponent = ingredientTemplate.content.cloneNode(true) as DocumentFragment

    const label = ingredientComponent.querySelector<HTMLLabelElement>("label")!
    label.insertAdjacentText("beforeend", ingredient.name)
    label.classList.add(c.textDark)
    label.querySelector<HTMLLabelElement>("div")!.classList.add(c.light)

    ingredientComponent.querySelector<HTMLButtonElement>("button.up")!.onclick = (e) => changeAmount(e, true)
    ingredientComponent.querySelector<HTMLButtonElement>("button.down")!.onclick = (e) => changeAmount(e, false)

    const input = ingredientComponent.querySelector<HTMLInputElement>("input")!
    input.setAttribute("value", ingredient.amount.toString())
    input.setAttribute("data-ingredient", ingredient.name)
    input.setAttribute("data-recipe", recipe.name)

    row.querySelector<HTMLElement>(`[slot="ingredients"]`)!.appendChild(ingredientComponent);
  }

  app.appendChild(row);
}
