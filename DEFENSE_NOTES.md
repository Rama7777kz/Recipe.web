# Конспект для защиты (что показывать в проекте RecipeBox)

## 1) API — что это
API = «набор правил/адресов», через которые один сервис даёт данные другому.
В проекте: сервис TheMealDB отдаёт рецепты в формате JSON.

Где в коде:
- `js/api.js` — все запросы к API.

Примеры эндпоинтов (TheMealDB):
- `/random.php` — рецепт дня
- `/search.php?s=...` — поиск
- `/lookup.php?i=...` — детали по id
- `/categories.php` — категории
- `/filter.php?c=...` — фильтр по категории

## 2) fetch — как работает
`fetch(url)` отправляет HTTP‑запрос и возвращает Promise.
Дальше:
- `await fetch(...)` ждёт ответ
- `await res.json()` превращает ответ в JSON

Где в коде:
- `js/api.js` → `getJSON()` (проверяем `res.ok`, иначе бросаем ошибку)

## 3) Асинхронность — зачем
Запросы в сеть занимают время. Если делать это синхронно, страница «зависнет».
Асинхронность позволяет:
- показывать Loading
- обрабатывать ошибки
- не блокировать интерфейс

Где в коде:
- в страницах `js/pages/*.js` используется `async/await` + `try/catch/finally`
- состояния: `setLoading(true/false)`, `setError(...)`

## 4) LocalStorage — хранение данных
LocalStorage хранит пары ключ‑значение (строки) в браузере.
Чтобы хранить массив/объект:
- `JSON.stringify()` при сохранении
- `JSON.parse()` при чтении

Где в коде:
- `js/storage.js`
  - favorites: `recipebox:favorites` (массив id)
  - planner: `recipebox:planner` (объект «день → блюда»)

## 5) Валидная разметка
Валидная разметка = HTML без ошибок структуры (вложенность, атрибуты, заголовки).
Проверяется валидатором W3C: https://validator.w3.org/

Где в проекте:
- все страницы используют семантические теги: `header`, `nav`, `main`, `section`, `footer`
- есть `h1` на странице и далее `h2` в секциях

## 6) Flexbox и Grid
- Flexbox — удобно для «в ряд»: шапка и меню.
- Grid — удобно для «сеток»: карточки рецептов.

Где в коде:
- `css/styles.css`
  - `header nav` и `.header-inner` — Flex
  - `.cards` — Grid + media queries для адаптива

## 7) Коммиты (Git)
Коммит = снимок изменений. Хорошие коммиты:
- 1 коммит = 1 логическая задача
- короткое сообщение (что сделано)

Примеры сообщений:
- `chore: init project structure`
- `feat: add search page and API integration`
- `feat: favorites with localStorage`
- `feat: planner modal and weekly view`
- `fix: handle HTTP errors (response.ok)`
