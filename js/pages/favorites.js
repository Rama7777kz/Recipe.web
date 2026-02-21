import { getFavorites, toggleFavorite } from "../storage.js";
import { getMealById } from "../api.js";
import { setPageActiveNav, setLoading, setError, escapeHtml, toast } from "../ui.js";

setPageActiveNav();

const box = document.querySelector("#favList");

function emptyState() {
  box.innerHTML = `
    <div class="card section">
      <h3 style="margin-top:0;">Пока пусто</h3>
      <p class="small">Добавь рецепт в избранное на странице «Детали рецепта».</p>
      <div class="actions">
        <a class="btn btn-primary" href="search.html">🔎 Перейти к поиску</a>
      </div>
    </div>
  `;
}

function favCard(meal) {
  const id = meal.idMeal;
  const name = meal.strMeal;
  const thumb = meal.strMealThumb;

  return `
    <article class="card meal-card">
      <a class="thumb" href="recipe.html?id=${encodeURIComponent(id)}" aria-label="Открыть рецепт ${escapeHtml(name)}">
        <img src="${escapeHtml(thumb)}" alt="Фото блюда: ${escapeHtml(name)}" loading="lazy">
      </a>
      <div class="body">
        <h3 class="meal-title">${escapeHtml(name)}</h3>
        <div class="meta">
          ${meal.strCategory ? `<span class="badge">🏷️ ${escapeHtml(meal.strCategory)}</span>` : ""}
          ${meal.strArea ? `<span class="badge">🌍 ${escapeHtml(meal.strArea)}</span>` : ""}
        </div>
        <div class="actions">
          <a class="btn btn-primary" href="recipe.html?id=${encodeURIComponent(id)}">Открыть</a>
          <button class="btn btn-danger" type="button" data-remove="${escapeHtml(id)}">Удалить</button>
        </div>
      </div>
    </article>
  `;
}

async function init() {
  const fav = getFavorites();
  if (fav.length === 0) {
    emptyState();
    return;
  }

  setLoading(true);
  setError("");

  try {
    const meals = (await Promise.all(fav.map((id) => getMealById(id)))).filter(Boolean);

    box.innerHTML = meals.map(favCard).join("");

    box.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-remove]");
      if (!btn) return;

      const id = btn.getAttribute("data-remove");
      toggleFavorite(id);
      toast("Удалено из избранного.");
      init(); // перерисуем
    });
  } catch (e) {
    setError("Не удалось загрузить избранное: " + e.message);
  } finally {
    setLoading(false);
  }
}

init();
