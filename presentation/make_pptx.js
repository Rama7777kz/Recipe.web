const pptxgen = require("pptxgenjs");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "RecipeBox";

function titleSlide(title, subtitle) {
  const s = pptx.addSlide();
  s.addText(title, { x: 0.7, y: 1.4, w: 12, h: 1, fontSize: 44, bold: true });
  s.addText(subtitle, { x: 0.7, y: 2.5, w: 12, h: 1, fontSize: 20, color: "666666" });
}

function bulletSlide(title, bullets) {
  const s = pptx.addSlide();
  s.addText(title, { x: 0.7, y: 0.6, w: 12, h: 0.6, fontSize: 34, bold: true });
  const text = bullets.map(b => `• ${b}`).join("\n");
  s.addText(text, { x: 1.0, y: 1.5, w: 12, h: 5, fontSize: 20, color: "333333", lineSpacingMultiple: 1.2 });
}

titleSlide("RecipeBox", "Учебный проект: HTML / CSS / JavaScript");

bulletSlide("Идея проекта", [
  "Книга рецептов: поиск → детали → избранное → план питания",
  "Цель: показать практические навыки HTML/CSS/JS",
  "Фокус: API (fetch), async/await, LocalStorage, адаптивная верстка",
]);

bulletSlide("Структура (6 страниц)", [
  "Главная: рецепт дня + категории",
  "Поиск: форма + валидация + результаты",
  "Категории: фильтрация рецептов по категории",
  "Рецепт: детали + избранное + модалка «добавить в план»",
  "Избранное: список из LocalStorage + подгрузка по id",
  "План: неделя (LocalStorage) + удаление/добавление",
]);

bulletSlide("Верстка и UI", [
  "HTML5 семантика: header / nav / main / section / footer",
  "Адаптивность: mobile / tablet / desktop",
  "Flexbox: шапка и навигация",
  "Grid: сетка карточек рецептов",
]);

bulletSlide("API + асинхронность", [
  "Источник данных: TheMealDB API",
  "fetch() возвращает Promise → используем async/await",
  "try/catch + состояния Loading / Error",
  "Примеры: random.php, search.php?s=..., lookup.php?i=..., filter.php?c=...",
]);

bulletSlide("LocalStorage + GitHub", [
  "favorites: массив id рецептов",
  "planner: объект «день → список блюд»",
  "GitHub: регулярные коммиты (1 задача = 1 коммит)",
  "README: описание, функции, технологии, запуск, автор",
  "Ссылка на репозиторий: https://github.com/Rama7777kz/Recipe.web?tab=readme-ov-file"​,
]);

pptx.writeFile({ fileName: "presentation/RecipeBox.pptx" });
