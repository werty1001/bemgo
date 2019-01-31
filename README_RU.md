
# BemGo
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/werty1001/bemgo/master/LICENSE) ![](https://img.shields.io/github/languages/count/werty1001/bemgo.svg?style=flat-square) ![](https://img.shields.io/github/repo-size/werty1001/bemgo.svg?style=flat-square) ![](	https://img.shields.io/github/languages/top/werty1001/bemgo.svg?style=flat-square)

[English](README.md) | Русский

---

Сборка упрощает и ускоряет процесс разработки проектов по методологии [БЭМ](https://en.bem.info/), под капотом [Gulp](http://gulpjs.com/).

### Особенности
* Сборка заточена под методологию БЭМ (Блок, Элемент, Модификатор)
* Разделение структуры на независимые блоки
* Можно использовать [уровни переопределения](https://ru.bem.info/methodology/redefinition-levels/)
* Шаблонизатор [Pug](https://pugjs.org) или [Twig](http://twig.sensiolabs.org/), а также обычный HTML для разметки
* Препроцессор [LESS](http://lesscss.org/) или [Sass](http://sass-lang.com/) или [Stylus](http://stylus-lang.com/) + все прелести [PostCSS](http://postcss.org/) для стилей
* Транспайлер Babel 7 для JavaScript
* Сборка растовых и векторных спрайтов (sprite.svg / sprite.png / sprite.2x.png / symbol.svg)
* Можно использовать JSON файлы данных для каждого блока
* Генерация иконок (favicons) для разных платформ 
* Быстрое создание zip архива сборки или слепка разработки
* Ничего лишнего, в итоговую сборку попадут только те файлы, которые  используются
* Автоматическое создание файлов и блоков по вашему HTML коду
* Возможность сборки стилей и скриптов (бандлов) для каждой страницы отдельно

и многое другое :)

---

### Навигация
[Установка](#установка) | [Основные команды](#основные-команды) | [Структура сборки](#структура-сборки) | [Описание работы](#описание-работы) | [Вопросы и ответы](#вопросы-и-ответы)

---

### Установка
> У вас должен быть установлен [Node.js](https://nodejs.org/) и [Git](https://git-scm.com/)!

[Скачайте архив](https://github.com/werty1001/bemgo/archive/master.zip) или лучше клонируйте репозиторий:
```bash
git clone https://github.com/werty1001/bemgo.git bemgo && cd bemgo
```
Далее нужно установить зависимости из package.json с помощью npm или yarn:
```bash
npm i
```
После можно запустить режим разработки (из коробки доступно простое приложение для демонстрации возможностей):
```bash
npm start
```

---

### Основные команды
* `npm i` — установить зависимости
* `npm start` — старт разработки
* `npm start [task]` — запуск gulp таска
* `npm run do` — запуск финальной сборки
* `npm run zip` — создание zip архива со сборкой
* `npm run zip:dev` — создание zip архива со слепком разработки
* `npm run add [command]` — быстрое [создание блоков и файлов](#быстрое-создание-блоков)
* `npm run init` — старт нового проекта *

> \* Будьте внимательны с этой командой! Папка app (со всеми файлами разработки) будет удалена, на ее место будет клонирован новый проект c github (репозиторий можно поменять в package.json, по умолчанию будет клонирован [мой](https://github.com/werty1001/app)).

---

### Структура сборки

```
bemgo/
│
├── app/                 # Файлы разработки
├── dist/                # Итоговая сборка
├── core/                # Ядро
├── tasks/               # Таски
│
├── gulpfile.js
└── package.json
```

Папка разработки:
```
app/
│
├── pages/               # Страницы
│   ├── index.html
│   └── about.html
│
├── blocks/              # Блоки
│   │
│   ├── common/          # Уровень common
│   │   ├── block/
│   │   └── block2/ 
│   │
│   └── develop/         # Уровень develop
│       ├── block/
│       ├── block2/
│       └── block3/
│
├── config.js            # Настройки
│
└── icon.png             # Иконка для создания favicons
```

У блока [flat](https://ru.bem.info/methodology/filestructure/#flat) (плоская) структура, все файлы и папки опциональны:
```
block/
│
├── fonts/               # Шрифты в отдельной папке
│   └── Roboto.woff2
│
├── img/                 # Изображения для стилей
│   │
│   ├── sprite/          # Иконки для создания спрайта (png и svg)
│   │   ├── mail.png
│   │   └── mail@2x.png
│   │
│   └── bg.png
│
├── symbol/              # Иконки для symbol в отдельной папке (только svg)
│   └── icon.svg
│
├── assets/              # Любые файлы
│   └── image.jpg
│
├── block.js
├── block.html
├── block.css
├── block__el.css
├── block__el.js
│
├── deps.js              # Зависимости блока
│
└── data.json            # Можно хранить данные
```

---

### Описание работы

* [Быстрое создание блоков и файлов](#быстрое-создание-блоков)

---

### Быстрое создание блоков
Вы можете быстро создавать блоки и файлы из консоли простой командой `npm run add`.
> Если какие-то файлы и папки уже есть, то они просто будут проигнорированы.

Создадим блок **header** и **footer** с дополнительными файлами:
```bash
npm run add header[.css,.js] footer[.pug]
```
> **Результат:**  
Будет создана папка header  
Будет создан файл header/header.css  
Будет создан файл header/header.js  
Будет создана папка footer  
Будет создан файл footer/footer.pug

Можно создавать элементы и модификаторы:
```bash
npm run add header__logo[.css,.js] footer__inner[.styl] footer_home[.styl]
```
> **Результат:**  
Будет создана папка header  
Будет создан файл header/header__logo.css  
Будет создан файл header/header__logo.js  
Будет создана папка footer  
Будет создан файл footer/footer__inner.styl  
Будет создан файл footer/footer_home.styl

Также можно создавать папки внутри блока:
```bash
npm run add card[img/sprite,assets,.pug,deps.js]
```
> **Результат:**  
Будет создана папка card  
Будет создана папка card/img  
Будет создана папка card/img/sprite  
Будет создана папка card/assets  
Будет создан файл card/card.pug  
Будет создан файл card/deps.js

По умолчанию все сущности создаются на основном уровне (св-во mainLevel в app/config.js), но вы можете указать уровень напрямую через двоеточие:
```bash
npm run add card[.js,.scss] :common
```
> **Результат:**  
Будет создана папка common (уровень)  
Будет создана папка common/card  
Будет создан файл common/card/card.js  
Будет создан файл common/card/card.scss  

Еще можно быстро создавать страницы, для этого нужно указать ключевое слово **page** после add:
```bash
npm run add page index catalog about.html
```
> **Результат:**  
Будет создана папка pages  
Будет создан файл pages/index.pug *  
Будет создан файл pages/catalog.pug *  
Будет создан файл pages/about.html  
\------  
\* Если не указано расширение страницы, то оно будет взято из app/config.js

Чтобы не перечислять каждый раз файлы и папки вы можете создать заготовки в app/config.js:
```js
// app/config.js

fastMake: {
  b: ['.js','.css','.pug','img']
}
```
Теперь совсем хорошо:
```bash
npm run add header[b]
```
> **Результат:**  
Будет создана папка header  
Будет создан файл header/header.js  
Будет создан файл header/header.css  
Будет создан файл header/header.pug  
Будет создана папка header/img

Еще новым файлам можно добавить стартовый контент:
```js
// app/config.js

addContent: {
  page: 'I make [name] page.', // [name] будет заменено на название страницы
  css: '.[name] {}', // [name] будет заменено на название css файла
}
```
---

### Вопросы и ответы

#### А где хранить глобальные файлы? Есть общая папка для таких целей?
* Нету. Но это вообще не проблема :) Для хранения каких-то глобальных файлов можно использовать корневой блок, например page или app, у вас скорее всего такой есть.
