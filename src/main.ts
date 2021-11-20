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
const headerTemplate = document.querySelector<HTMLTemplateElement>("template#header")!;

const headerComponent = headerTemplate.content.cloneNode(true) as DocumentFragment
app.appendChild(headerComponent);

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
    const input = app.querySelector<HTMLInputElement>(`[data-ingredient="${ingredient.name}"][data-recipe="${recipe.name}"]`)!
    input.value = ingredient.amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
  }
}

const slot = <T extends Element>(d: DocumentFragment, name: string): T => {
  return d.querySelector<T>(`[slot="${name}"]`)!
}

for (const [i, recipe] of recipes.entries()) {
  let c = colorClasses[i % 8]

  const row = cocktailRowTemplate.content.cloneNode(true) as DocumentFragment
  const heading = slot(row, "heading")
  heading.insertAdjacentText("beforeend", recipe.name)
  heading.classList.add(c.textDark)
  const id = recipe.name.toLowerCase().replace(/\W/g, "-").replace(/-+/g, "-")
  slot<HTMLLinkElement>(row, "link").href = `#${id}`
  const div = slot(row, "cocktail-row")
  div.classList.add(c.medium)
  div.id = id
  const directions = slot(row, "directions")
  directions.textContent = recipe.directions
  directions.classList.add(c.textDark)

  for (const ingredient of recipe.ingredients) {
    const ingredientComponent = ingredientTemplate.content.cloneNode(true) as DocumentFragment

    const label = slot(ingredientComponent, "label")!
    label.insertAdjacentText("beforeend", ingredient.name)
    label.classList.add(c.textDark)

    slot(ingredientComponent, "button-wrapper").classList.add(c.light)

    slot<HTMLButtonElement>(ingredientComponent, "up").onclick = (e) => changeAmount(e, true)
    slot<HTMLButtonElement>(ingredientComponent, "down").onclick = (e) => changeAmount(e, false)

    const input = slot(ingredientComponent, "input")
    input.setAttribute("value", ingredient.amount.toString())
    input.setAttribute("data-ingredient", ingredient.name)
    input.setAttribute("data-recipe", recipe.name)

    slot(row, "ingredients").appendChild(ingredientComponent);
  }

  app.appendChild(row);
}
