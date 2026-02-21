import { getRandomMeal, listCategories } from "../api.js";
import { setPageActiveNav, setLoading, setError, escapeHtml } from "../ui.js";

setPageActiveNav();

const randomBox = document.querySelector("#randomMeal");
const chips = document.querySelector("#categoryChips");

async function init() {
  setLoading(true);
  setError("");

  try {
    const [meal, categories] = await Promise.all([
      getRandomMeal(),
      listCategories(),
    ]);

    renderRandom(meal);
    renderCategoryChips(categories.slice(0, 8));
  } catch (e) {
    setError("Не удалось загрузить данные: " + e.message);
  } finally {
    setLoading(false);
  }
}

function renderRandom(meal) {
  if (!meal) {
    randomBox.innerHTML = `<p class="small">Не удалось получить рецепт дня.</p>`;
    return;
  }

  const id = meal.idMeal;
  randomBox.innerHTML = `
    <div class="grid grid-2" style="align-items:start;">
      <div>
        <img src="${escapeHtml(meal.strMealThumb)}" alt="Фото блюда: ${escapeHtml(meal.strMeal)}" style="border-radius:16px; border:1px solid var(--border);">
      </div>
      <div>
        <h3 style="margin:0 0 10px;">${escapeHtml(meal.strMeal)}</h3>
        <div class="meta">
          ${meal.strCategory ? `<span class="badge">🏷️ ${escapeHtml(meal.strCategory)}</span>` : ""}
          ${meal.strArea ? `<span class="badge">🌍 ${escapeHtml(meal.strArea)}</span>` : ""}
        </div>
        <p class="small">Открой карточку рецепта, чтобы добавить в избранное и (через модальное окно) добавить в план питания.</p>
        <div class="actions">
          <a class="btn btn-primary" href="recipe.html?id=${encodeURIComponent(id)}">Открыть</a>
          <a class="btn" href="recipe.html?id=${encodeURIComponent(id)}&plan=1">➕ В план</a>
          <a class="btn" href="search.html?q=${encodeURIComponent(meal.strMeal.split(" ")[0])}">Похожие</a>
        </div>
      </div>
    </div>
  `;
}

function renderCategoryChips(categories) {
  chips.innerHTML = categories.map((c) => `
    <a class="btn" href="categories.html?c=${encodeURIComponent(c.strCategory)}">🏷️ ${escapeHtml(c.strCategory)}</a>
  `).join("");
}

init();
