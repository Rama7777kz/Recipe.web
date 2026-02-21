const FAV_KEY = "recipebox:favorites";
const PLAN_KEY = "recipebox:planner";

/** Избранное хранится как массив строк id: ["52772", "52804", ...] */
export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
  } catch {
    return [];
  }
}

export function isFavorite(id) {
  return getFavorites().includes(String(id));
}

export function toggleFavorite(id) {
  const strId = String(id);
  const fav = new Set(getFavorites());
  if (fav.has(strId)) fav.delete(strId);
  else fav.add(strId);

  const arr = [...fav];
  localStorage.setItem(FAV_KEY, JSON.stringify(arr));
  return arr;
}

/**
 * План питания: объект вида
 * { mon:[{id,name}], tue:[...], ... }
 */
export function getPlanner() {
  try {
    const obj = JSON.parse(localStorage.getItem(PLAN_KEY) || "null");
    if (obj && typeof obj === "object") return obj;
  } catch {}
  return { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] };
}

export function savePlanner(planner) {
  localStorage.setItem(PLAN_KEY, JSON.stringify(planner));
}

export function addToPlanner(dayKey, meal) {
  const planner = getPlanner();
  const day = planner[dayKey] ?? [];
  const id = String(meal.id);
  // не добавляем дубль
  if (!day.some((x) => String(x.id) === id)) {
    day.push({ id, name: meal.name });
  }
  planner[dayKey] = day;
  savePlanner(planner);
  return planner;
}

export function removeFromPlanner(dayKey, mealId) {
  const planner = getPlanner();
  const id = String(mealId);
  planner[dayKey] = (planner[dayKey] ?? []).filter((x) => String(x.id) !== id);
  savePlanner(planner);
  return planner;
}

export const DAYS = [
  { key: "mon", label: "Пн" },
  { key: "tue", label: "Вт" },
  { key: "wed", label: "Ср" },
  { key: "thu", label: "Чт" },
  { key: "fri", label: "Пт" },
  { key: "sat", label: "Сб" },
  { key: "sun", label: "Вс" },
];
