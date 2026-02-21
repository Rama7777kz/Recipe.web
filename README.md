# RecipeBox — учебный проект (HTML/CSS/JavaScript)

RecipeBox — небольшое веб‑приложение «Книга рецептов»: поиск рецептов, фильтрация по категориям, страница деталей, избранное и план питания на неделю.

Проект сделан так, чтобы закрывать требования итогового проекта:
- минимум 6 страниц
- семантическая и валидная HTML‑разметка
- адаптивная верстка (mobile / tablet / desktop)
- Flexbox + Grid
- минимум 6 JS‑сценариев
- API через fetch + async/await + try/catch + состояния loading/error
- LocalStorage
- подходит для GitHub Pages

## Страницы
1. `index.html` — главная (рецепт дня + быстрые ссылки)
2. `search.html` — поиск рецептов по названию
3. `categories.html` — категории + фильтрация
4. `recipe.html` — детали рецепта (избранное + добавление в план через модалку)
5. `favorites.html` — избранное (LocalStorage + подгрузка карточек по id)
6. `planner.html` — план питания на неделю (LocalStorage)

## Функции (что можно показать на защите)
- Поиск рецептов по названию (форма + валидация + API)
- Фильтрация рецептов по категории (API)
- Открытие карточки рецепта по `?id=...` (API)
- Добавление/удаление из избранного (LocalStorage)
- Добавление в план питания (LocalStorage) + модальное окно выбора дня
- Состояния: загрузка (Loading…) и обработка ошибок (try/catch)

## Технологии
- HTML5 (семантика)
- CSS3 (адаптивность, Flexbox, Grid)
- JavaScript (ES Modules, fetch, async/await)
- LocalStorage
- Git/GitHub

## API
Данные о рецептах берутся из TheMealDB (учебный тестовый ключ `1`):  
https://www.themealdb.com/api.php

## Запуск проекта
Важно: из‑за модулей ES (`type="module"`) проект нужно открывать через локальный сервер, а не двойным кликом по файлу.

### Вариант A (самый простой) — VS Code Live Server
1) Открой папку проекта в VS Code  
2) Поставь расширение **Live Server**  
3) ПКМ по `index.html` → **Open with Live Server**

### Вариант B — через Node.js
Если Node.js установлен:
```bash
npx http-server .
```
Открой адрес, который покажет терминал (обычно `http://localhost:8080`).

## Автор
- Имя: (впиши своё)
- Группа/курс: (впиши)

## Полезные ссылки (для пояснений на защите)
- Fetch API (MDN): https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- Web Storage API (MDN): https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
- git commit (git-scm): https://git-scm.com/docs/git-commit
- Валидатор HTML (W3C): https://validator.w3.org/
