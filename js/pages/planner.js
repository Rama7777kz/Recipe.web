import { DAYS, getPlanner, addToPlanner, removeFromPlanner, getFavorites } from "../storage.js";
import { getMealById } from "../api.js";
import { setPageActiveNav, setLoading, setError, escapeHtml, toast } from "../ui.js";

setPageActiveNav();

const daySelect = document.querySelector("#day");
const mealSelect = document.querySelector("#mealSelect");
const form = document.querySelector("#addPlanForm");
const grid = document.querySelector("#plannerGrid");

function buildDaySelect(selectEl) {
  selectEl.innerHTML = DAYS.map((d) => `<option value="${d.key}">${d.label}</option>`).join("");
}

function renderPlanner() {
  const planner = getPlanner();

  grid.innerHTML = DAYS.map((d) => {
    const items = planner[d.key] ?? [];
    const list = items.length
      ? `<ul>${items
          .map(
            (x) => `
              <li style="margin-bottom:8px;">
                <a href="recipe.html?id=${encodeURIComponent(x.id)}">${escapeHtml(x.name)}</a>
                <button class="btn btn-danger" type="button" data-day="${d.key}" data-id="${escapeHtml(
                  x.id
                )}" style="margin-left:8px; padding:6px 10px; border-radius:10px;">✕</button>
              </li>
            `
          )
          .join("")}</ul>`
      : `<p class="small">Нет блюд</p>`;

    return `
      <div class="card section">
        <h3 style="margin-top:0;">${d.label}</h3>
        ${list}
      </div>
    `;
  }).join("");
}

async function loadFavMealsIntoSelect() {
  const fav = getFavorites();

  if (fav.length === 0) {
    mealSelect.innerHTML = `<option value="">(сначала добавь что-то в «Избранное»)</option>`;
    mealSelect.disabled = true;
    return;
  }

  mealSelect.disabled = true;
  mealSelect.innerHTML = `<option value="">Загрузка…</option>`;

  const meals = (await Promise.all(fav.map((id) => getMealById(id)))).filter(Boolean);
  mealSelect.innerHTML = meals.map((m) => `<option value="${escapeHtml(m.idMeal)}">${escapeHtml(m.strMeal)}</option>`).join("");
  mealSelect.disabled = false;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  setError("");

  const day = daySelect.value;
  const id = mealSelect.value;

  if (!day || !id) {
    setError("Выберите день и блюдо.");
    return;
  }

  const name = mealSelect.options[mealSelect.selectedIndex]?.textContent || "Блюдо";
  addToPlanner(day, { id, name });
  toast("Добавлено в план!");
  renderPlanner();
});

grid.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-day][data-id]");
  if (!btn) return;

  const day = btn.getAttribute("data-day");
  const id = btn.getAttribute("data-id");
  removeFromPlanner(day, id);
  renderPlanner();
});

async function init() {
  setLoading(true);
  setError("");
  buildDaySelect(daySelect);

  try {
    await loadFavMealsIntoSelect();
    renderPlanner();
  } catch (e) {
    setError("Ошибка: " + e.message);
  } finally {
    setLoading(false);
  }
}

init();
