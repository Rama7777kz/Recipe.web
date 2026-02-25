import { getMealById } from "../api.js";
import { toggleFavorite, isFavorite, DAYS, addToPlanner } from "../storage.js";
import { setPageActiveNav, setLoading, setError, getQueryParam, escapeHtml, toast } from "../ui.js";

setPageActiveNav();

const headerBox = document.querySelector("#recipeHeader");
const ingList = document.querySelector("#ingredients");
const instructions = document.querySelector("#instructions");

// modal
const modal = document.querySelector("#planModal");
const closeModalBtn = document.querySelector("#closeModal");
const cancelBtn = document.querySelector("#cancelBtn");
const planForm = document.querySelector("#planForm");
const daySelect = document.querySelector("#daySelect");

let currentMeal = null;

let ruMapCache = null;

async function loadRuTranslations() {
  if (ruMapCache) return ruMapCache;
  try {
    const res = await fetch("./data/ru_instructions.json");
    if (!res.ok) return (ruMapCache = {});
    ruMapCache = await res.json();
  } catch {
    ruMapCache = {};
  }
  return ruMapCache;
}


function buildDaysSelect() {
  daySelect.innerHTML = DAYS.map((d) => `<option value="${d.key}">${d.label}</option>`).join("");
}

function openModal() {
  modal.classList.remove("hidden");
  daySelect.focus();
}

function closeModal() {
  modal.classList.add("hidden");
}

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
closeModalBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);

planForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!currentMeal) return;

  const dayKey = daySelect.value;
  addToPlanner(dayKey, { id: currentMeal.idMeal, name: currentMeal.strMeal });
  closeModal();
  toast("Добавлено в план питания!");
});

async function init() {
  const id = getQueryParam("id");
  if (!id) {
    setError("Нет параметра id в URL. Пример: recipe.html?id=52772");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const meal = await getMealById(id);
    if (!meal) {
      setError("Рецепт не найден.");
      return;
    }
    currentMeal = meal;

    const ruMap = await loadRuTranslations();

    renderHeader(meal);
    renderIngredients(meal);
    renderInstructions(meal, ruMap);

    const openPlan = getQueryParam("plan") === "1";
    if (openPlan) openModal();
  } catch (e) {
    setError("Ошибка загрузки рецепта: " + e.message);
  } finally {
    setLoading(false);
  }
}

function renderHeader(meal) {
  const favText = isFavorite(meal.idMeal) ? "❤️ Убрать из избранного" : "🤍 В избранное";

  headerBox.innerHTML = `
    <div>
      <img src="${escapeHtml(meal.strMealThumb)}" alt="Фото блюда: ${escapeHtml(meal.strMeal)}"
           style="border-radius:16px; border:1px solid var(--border);">
    </div>
    <div>
      <h2 style="margin-top:0;">${escapeHtml(meal.strMeal)}</h2>
      <div class="meta">
        ${meal.strCategory ? `<span class="badge">🏷️ ${escapeHtml(meal.strCategory)}</span>` : ""}
        ${meal.strArea ? `<span class="badge">🌍 ${escapeHtml(meal.strArea)}</span>` : ""}
        ${meal.strTags ? `<span class="badge">🏁 ${escapeHtml(meal.strTags)}</span>` : ""}
      </div>

      <p class="small">
        Эта страница демонстрирует: async/await + try/catch, работу с API, LocalStorage (избранное/план),
        а также модальное окно (выбор дня).
      </p>

      <div class="actions">
        <button id="favBtn" class="btn btn-primary" type="button">${favText}</button>
        <button id="planBtn" class="btn" type="button">➕ Добавить в план</button>
        ${meal.strYoutube ? `<a class="btn" href="${escapeHtml(meal.strYoutube)}" target="_blank" rel="noreferrer">▶ Видео</a>` : ""}
      </div>
    </div>
  `;

  headerBox.querySelector("#favBtn").addEventListener("click", () => {
    toggleFavorite(meal.idMeal);
    toast(isFavorite(meal.idMeal) ? "Добавлено в избранное!" : "Удалено из избранного!");
    renderHeader(meal); // обновим кнопку
  });

  headerBox.querySelector("#planBtn").addEventListener("click", () => openModal());
}

function renderIngredients(meal) {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    const ing = (meal[`strIngredient${i}`] || "").trim();
    const msr = (meal[`strMeasure${i}`] || "").trim();
    if (!ing) continue;
    items.push(`${escapeHtml(ing)}${msr ? ` — <span class="small">${escapeHtml(msr)}</span>` : ""}`);
  }

  ingList.innerHTML = items.length
    ? items.map((x) => `<li>${x}</li>`).join("")
    : `<li class="small">Список ингредиентов недоступен.</li>`;
}

function renderInstructions(meal, ruMap) {
  const id = String(meal.idMeal || "");
  const ru = ruMap && ruMap[id];
  const text = (ru || meal.strInstructions || "").trim();
  instructions.textContent = text || "Инструкция недоступна.";
}

buildDaysSelect();
init();
