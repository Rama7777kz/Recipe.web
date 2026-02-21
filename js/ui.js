import { isFavorite } from "./storage.js";

export function qs(sel, root = document) {
  return root.querySelector(sel);
}
export function qsa(sel, root = document) {
  return [...root.querySelectorAll(sel)];
}

export function setPageActiveNav() {
  const file = location.pathname.split("/").pop() || "index.html";
  qsa("a.nav-link").forEach((a) => {
    const href = a.getAttribute("href") || "";
    const hrefFile = href.split("/").pop();
    if (hrefFile === file) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

export function setLoading(isLoading, text = "Загрузка…") {
  const el = qs("#loading");
  if (!el) return;
  el.textContent = text;
  el.classList.toggle("hidden", !isLoading);
}

export function setError(message = "") {
  const el = qs("#error");
  if (!el) return;
  el.textContent = message;
  el.classList.toggle("hidden", !message);
}

export function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function mealCardHTML(meal, { showFav = true } = {}) {
  const id = meal.idMeal ?? meal.id;
  const name = meal.strMeal ?? meal.name ?? "Без названия";
  const thumb = meal.strMealThumb ?? meal.thumb ?? "";
  const area = meal.strArea ? `<span class="badge">🌍 ${escapeHtml(meal.strArea)}</span>` : "";
  const cat = meal.strCategory ? `<span class="badge">🏷️ ${escapeHtml(meal.strCategory)}</span>` : "";
  const fav = showFav
    ? `<span class="badge" title="Состояние избранного">${isFavorite(id) ? "❤️ В избранном" : "🤍 Не в избранном"}</span>`
    : "";

  return `
    <article class="card meal-card">
      <a class="thumb" href="recipe.html?id=${encodeURIComponent(String(id))}" aria-label="Открыть рецепт ${escapeHtml(name)}">
        ${thumb ? `<img src="${escapeHtml(thumb)}" alt="Фото блюда: ${escapeHtml(name)}" loading="lazy">` : ""}
      </a>
      <div class="body">
        <h3 class="meal-title">${escapeHtml(name)}</h3>
        <div class="meta">${cat}${area}${fav}</div>
        <div class="actions">
          <a class="btn btn-primary" href="recipe.html?id=${encodeURIComponent(String(id))}">Открыть</a>
        </div>
      </div>
    </article>
  `;
}

export function renderCards(container, meals) {
  container.innerHTML = meals.map((m) => mealCardHTML(m)).join("");
}

export function getQueryParam(name) {
  return new URLSearchParams(location.search).get(name);
}

export function toast(message) {
  // очень простой "тост" через alert — на защите можно заменить на красивый блок.
  // Здесь сделано так, чтобы работало везде без библиотек.
  alert(message);
}
