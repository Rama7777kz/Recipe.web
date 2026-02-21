import { searchMealsByName } from "../api.js";
import { setPageActiveNav, setLoading, setError, renderCards, getQueryParam } from "../ui.js";

setPageActiveNav();

const form = document.querySelector("#searchForm");
const input = document.querySelector("#q");
const results = document.querySelector("#results");
const info = document.querySelector("#resultsInfo");

function setInfo(text) {
  info.textContent = text || "";
}

async function runSearch(query) {
  setLoading(true);
  setError("");
  setInfo("");
  results.innerHTML = "";

  try {
    const meals = await searchMealsByName(query);

    if (meals.length === 0) {
      setInfo(`Ничего не найдено по запросу: "${query}".`);
      return;
    }

    setInfo(`Найдено: ${meals.length}.`);
    renderCards(results, meals);
  } catch (e) {
    setError("Ошибка поиска: " + e.message);
  } finally {
    setLoading(false);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const q = input.value.trim();
  if (q.length < 2) {
    setError("Введите минимум 2 символа.");
    input.focus();
    return;
  }

  // Обновляем URL, чтобы можно было показать это на защите:
  history.replaceState({}, "", `search.html?q=${encodeURIComponent(q)}`);

  await runSearch(q);
});

const initial = getQueryParam("q");
if (initial) {
  input.value = initial;
  runSearch(initial);
}
