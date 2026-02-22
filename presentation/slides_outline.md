# Презентация (5–6 слайдов) — RecipeBox

## Слайд 1 — Идея проекта
- RecipeBox — книга рецептов: поиск → детали → избранное → план питания
- Цель: показать навыки HTML/CSS/JS + API + LocalStorage

## Слайд 2 — Структура (6 страниц)
- index — рецепт дня + категории
- search — поиск по названию
- categories — фильтрация по категории
- recipe — детали рецепта + модалка «добавить в план»
- favorites — избранное
- planner — план на неделю

## Слайд 3 — Технологии и верстка
- HTML5 семантика: header/nav/main/section/footer
- Адаптив: mobile/tablet/desktop
- Flexbox: шапка/навигация
- Grid: сетка карточек

## Слайд 4 — API + fetch + асинхронность
- TheMealDB API
- fetch → Promise → async/await
- try/catch + состояния: Loading / Error
- Примеры эндпоинтов: random.php, search.php?s=..., lookup.php?i=...

## Слайд 5 — LocalStorage
- favorites: массив id
- planner: объект «день → блюда»
- Данные сохраняются между перезагрузками

## Слайд 6 — GitHub
- Регулярные коммиты: один коммит = одна логическая задача
- README: описание, функции, технологии, запуск
- Ссылка на репозиторий: (https://github.com/Rama7777kz/Recipe.web?tab=readme-ov-file​)
