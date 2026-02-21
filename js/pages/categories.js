import { listCategories, filterMealsByCategory } from "../api.js";
import { setPageActiveNav, setLoading, setError, escapeHtml, getQueryParam, renderCards } from "../ui.js";

setPageActiveNav();

const catBox = document.querySelector("#categories");
const title = document.querySelector("#catTitle");
const info = document.querySelector("#catInfo");
const mealsBox = document.querySelector("#catMeals");

function setInfo(text) {
  info.textContent = text || "";
}

async function init() {
  setLoading(true);
  setError("");
  try {
    const categories = await listCategories();
    renderCategories(categories);

    const initial = getQueryParam("c");
    if (initial) {
      await selectCategory(initial);
      highlightActive(initial);
    } else {
      setInfo("Выберите категорию выше, чтобы загрузить рецепты.");
    }
  } catch (e) {
    setError("Не удалось загрузить категории: " + e.message);
  } finally {
    setLoading(false);
  }
}

function renderCategories(categories) {
  catBox.innerHTML = categories.map((c) => `
    <button class="btn" type="button" data-cat="${escapeHtml(c.strCategory)}">🏷️ ${escapeHtml(c.strCategory)}</button>
  `).join("");

  catBox.addEventListener("click", async (e) => {
    const btn = e.target.closest("button[data-cat]");
    if (!btn) return;
    const c = btn.getAttribute("data-cat");
    history.replaceState({}, "", `categories.html?c=${encodeURIComponent(c)}`);
    highlightActive(c);
    await selectCategory(c);
  });
}

function highlightActive(cat) {
  [...catBox.querySelectorAll("button[data-cat]")].forEach((b) => {
    const is = b.getAttribute("data-cat") === cat;
    b.classList.toggle("btn-primary", is);
  });
}

async function selectCategory(cat) {
  title.textContent = cat;
  setLoading(true, "Загружаем рецепты…");
  setError("");
  setInfo("");
  mealsBox.innerHTML = "";

  try {
    const meals = await filterMealsByCategory(cat);

    if (meals.length === 0) {
      setInfo("В этой категории нет рецептов.");
      return;
    }

    setInfo(`Рецептов в категории: ${meals.length}.`);
    // filter.php возвращает только id/name/thumb — тоже норм для карточек
    renderCards(mealsBox, meals);
  } catch (e) {
    setError("Не удалось загрузить рецепты: " + e.message);
  } finally {
    setLoading(false);
  }
}

init();
