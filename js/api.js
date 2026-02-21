const BASE = "https://www.themealdb.com/api/json/v1/1";

/**
 * Универсальная функция запроса JSON.
 * Важно: fetch не считает HTTP 404/500 "ошибкой" сам по себе, поэтому мы проверяем response.ok.
 */
export async function getJSON(path) {
  const res = await fetch(`${BASE}${path}`);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return await res.json();
}

export async function getRandomMeal() {
  const data = await getJSON("/random.php");
  return data.meals?.[0] ?? null;
}

export async function searchMealsByName(query) {
  const q = encodeURIComponent(query.trim());
  const data = await getJSON(`/search.php?s=${q}`);
  return data.meals ?? [];
}

export async function getMealById(id) {
  const i = encodeURIComponent(String(id));
  const data = await getJSON(`/lookup.php?i=${i}`);
  return data.meals?.[0] ?? null;
}

export async function listCategories() {
  const data = await getJSON("/categories.php");
  return data.categories ?? [];
}

export async function filterMealsByCategory(categoryName) {
  const c = encodeURIComponent(categoryName);
  const data = await getJSON(`/filter.php?c=${c}`);
  return data.meals ?? [];
}
