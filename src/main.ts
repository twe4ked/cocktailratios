import "./style.css"

import { Recipe, ratioRecipe, recipes } from "./recipes"

const app = document.querySelector<HTMLDivElement>("#app")!

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

for (const recipe of recipes) {
  const row = cocktailRowTemplate.content.cloneNode(true) as DocumentFragment
  const heading = slot<HTMLElement>(row, "heading")
  heading.insertAdjacentText("beforeend", recipe.name)
  heading.style.color = recipe.color[900]
  const id = recipe.name.toLowerCase().replace(/\W/g, "-").replace(/-+/g, "-")
  slot<HTMLLinkElement>(row, "link").href = `#${id}`
  const div = slot<HTMLElement>(row, "cocktail-row")
  div.style.backgroundColor = recipe.color[100]
  div.id = id
  const directions = slot<HTMLElement>(row, "directions")
  directions.textContent = recipe.directions
  directions.style.color = recipe.color[900]

  for (const ingredient of recipe.ingredients) {
    const ingredientComponent = ingredientTemplate.content.cloneNode(true) as DocumentFragment

    const label = slot<HTMLElement>(ingredientComponent, "label")!
    label.insertAdjacentText("beforeend", ingredient.name)
    label.style.color = recipe.color[900]

    slot<HTMLElement>(ingredientComponent, "button-wrapper").style.backgroundColor = recipe.color[50]

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
