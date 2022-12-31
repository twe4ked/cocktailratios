import "./style.css"

import { Recipe, Ingredient, ratioRecipe, recipes } from "./recipes"

const app = document.querySelector<HTMLDivElement>("#app")!

const cocktailRowTemplate = document.querySelector<HTMLTemplateElement>("template#cocktail_row")!;
const ingredientTemplate = document.querySelector<HTMLTemplateElement>("template#ingredient")!;
const headerTemplate = document.querySelector<HTMLTemplateElement>("template#header")!;
const footerTemplate = document.querySelector<HTMLTemplateElement>("template#footer")!;

const update = (event: Event, setCurrentField: boolean) => {
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

  setFields(newRecipe, setCurrentField ? undefined : ingredientName)
}

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

  setFields(newRecipe, undefined)
}

const setFields = (recipe: Recipe, skipIngredientName: string | undefined) => {
  for (const ingredient of recipe.ingredients) {
    if (ingredient.name === skipIngredientName) {
      continue
    }
    const input = app.querySelector<HTMLInputElement>(`[data-ingredient="${ingredient.name}"][data-recipe="${recipe.name}"]`)!
    input.value = ingredient.amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
  }
}

const parameterize = (text: string): string => {
  return text.toLowerCase().replace(/\W/g, "-").replace(/-+/g, "-").replace(/-$/, "")
}

const slot = <T extends Element>(d: DocumentFragment, name: string): T => {
  return d.querySelector<T>(`[slot="${name}"]`)!
}

const renderRecipe = (recipe: Recipe): Node => {
  const row = cocktailRowTemplate.content.cloneNode(true) as DocumentFragment

  const id = parameterize(recipe.name)

  const link = slot<HTMLLinkElement>(row, "link")
  link.href = `#${id}`
  link.insertAdjacentText("beforeend", recipe.name)

  const div = slot<HTMLElement>(row, "cocktail-row")
  div.classList.add(`bg-${recipe.color}-100`)
  div.classList.add(`text-${recipe.color}-900`)
  div.id = id

  const directions = slot<HTMLElement>(row, "directions")
  directions.textContent = recipe.directions

  for (const ingredient of recipe.ingredients) {
    slot(row, "ingredients").appendChild(
      renderIngredient(recipe, ingredient)
    );
  }

  return row
}

const renderIngredient = (recipe: Recipe, ingredient: Ingredient): Node => {
  const ingredientComponent = ingredientTemplate.content.cloneNode(true) as DocumentFragment

  const ingredientId = `${parameterize(recipe.name)}-${parameterize(ingredient.name)}`

  const label = slot<HTMLElement>(ingredientComponent, "label")!
  label.insertAdjacentText("beforeend", ingredient.name)
  label.setAttribute("for", ingredientId)

  slot<HTMLElement>(ingredientComponent, "button-wrapper").classList.add(`bg-${recipe.color}-50`)

  slot<HTMLButtonElement>(ingredientComponent, "up").onclick = (e) => changeAmount(e, true)
  slot<HTMLButtonElement>(ingredientComponent, "down").onclick = (e) => changeAmount(e, false)

  const input = slot<HTMLInputElement>(ingredientComponent, "input")
  input.oninput = (e) => update(e, false)
  input.onblur = (e) => update(e as Event, true)
  input.classList.add(`focus:ring-${recipe.color}-600`)
  input.setAttribute("value", ingredient.amount.toString())
  input.setAttribute("data-ingredient", ingredient.name)
  input.setAttribute("data-recipe", recipe.name)
  input.setAttribute("id", ingredientId)

  return ingredientComponent
}

// https://stackoverflow.com/a/15252131
const fuzzySearch = (hay: string, searchTerm: string): boolean => {
  hay = hay.toLowerCase()
  searchTerm = searchTerm.toLowerCase().trim();
  var i = 0, n = -1, l
  for (; l = searchTerm[i++];) {
    if (!~(n = hay.indexOf(l, n + 1))) {
      return false
    }
  }
  return true
}

const search = (event: Event) => {
  const input = event.target! as HTMLInputElement
  for (const recipe of recipes) {
    const id = parameterize(recipe.name)
    const element = document.getElementById(id)!
    element.style.display = fuzzySearch(recipe.name, input.value) ? "block" : "none";
  }
}

const headerComponent = headerTemplate.content.cloneNode(true) as DocumentFragment
slot<HTMLInputElement>(headerComponent, "search").oninput = search
app.appendChild(headerComponent);

for (const recipe of recipes.sort((a, b) => a.name.localeCompare(b.name))) {
  app.appendChild(
    renderRecipe(recipe)
  );
}

const footerComponent = footerTemplate.content.cloneNode(true) as DocumentFragment
app.appendChild(footerComponent);
