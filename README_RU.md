
# ![BemGo](https://werty1001.github.io/bemgo.svg)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/werty1001/bemgo/master/LICENSE) ![](https://img.shields.io/github/languages/count/werty1001/bemgo.svg?style=flat-square) ![](https://img.shields.io/github/repo-size/werty1001/bemgo.svg?style=flat-square)

[English](https://github.com/werty1001/bemgo) | Описание на русском

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

### Навигация
[Установка](#установка) | [Основные команды](#основные-команды) | [Структура сборки](#структура-сборки) | [Описание работы](#описание-работы) | [Вопросы и ответы](#вопросы-и-ответы) | [Changelog](#changelog)

<p align="center">
  <img align="center" src="https://werty1001.github.io/sep.svg" alt="">
</p>

# Установка
> У вас должен быть установлен [Node.js](https://nodejs.org/) и [Git](https://git-scm.com/)!

[Скачайте архив](https://github.com/werty1001/bemgo/archive/master.zip) или лучше клонируйте репозиторий:
```bash
git clone https://github.com/werty1001/bemgo.git bemgo && cd bemgo
```
Далее нужно установить зависимости из package.json с помощью npm или yarn:
```bash
npm i
```
После можно запустить режим разработки (из коробки доступно простое демо приложение):
```bash
npm start
```

<p align="center">
  <img align="center" src="https://werty1001.github.io/sep.svg" alt="">
</p>

# Основные команды
* `npm i` — установить зависимости
* `npm start` — старт разработки
* `npm start [task]` — запуск gulp таска
* `npm run do` — запуск финальной сборки
* `npm run zip` — создание zip архива со сборкой
* `npm run zip:dev` — создание zip архива со слепком разработки
* `npm run add [command]` — быстрое [создание блоков и файлов](#создание-файлов-и-блоков-из-консоли)
* `npm run init` — старт нового проекта *

> \* **Будьте внимательны!**  
Папка app (со всеми файлами разработки) будет удалена, на ее место будет клонирован новый проект c github (репозиторий можно поменять в package.json, по умолчанию будет клонирован [этот](https://github.com/werty1001/app)).

<p align="center">
  <img align="center" src="https://werty1001.github.io/sep.svg" alt="">
</p>

# Структура сборки

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

<p align="center">
  <img align="center" src="https://werty1001.github.io/sep.svg" alt="">
</p>

# Описание работы

* [Шаблонизаторы и разметка](#шаблонизаторы-и-разметка)
* [Препроцессоры и стили](#препроцессоры-и-стили)
* [Зависимости блока](#зависимости-блока)
* [Автоматическое создание файлов и блоков](#автоматическое-создание-файлов-и-блоков)
* [Генерация Favicons](#генерация-favicons)
* [Уровни переопределения](#уровни-переопределения)
* [Создание файлов и блоков из консоли](#создание-файлов-и-блоков-из-консоли)

<p align="center">
  <img align="center" src="https://werty1001.github.io/sep.svg" alt="">
</p>

# Шаблонизаторы и разметка

В качестве шаблонизатора разметки можно использовать Pug / Twig или обычный HTML с include'ом.  
По умолчанию выбран HTML, но вы можете это изменить в (**app/config.js**)
```js
// app/config.js

extnames: {
  templates: '.pug', // Pug я выбираю тебя!
  scripts: '.js',
  styles: '.scss',
},

```
Теперь сборка будет искать pug файлы.  
### Данные для шаблонов
У каждого блока может быть файл данных **data.json**, эти данные доступны в разметке.  
Допустим у вас есть блок **nav** c json файлом, эти данные легко получить из специального объекта **global**:
```
global.jsons.nav // тут данные из nav/data.json
```
### Плейсхолдеры для путей
У кажодого блока своя папка со статикой, поэтому вам необходимо указывать плейсхолдеры, чтобы было понятно у какого блока нужно искать конкретный файл.
> Плейсхолдер состоит из символа @ (собачки) и имени блока.

Например, у нас есть блок **card** c картинкой assets/man.png, в разметке нужно указать путь так:
```html
<img src="@card/man.png" alt="">
```
Также есть специальные плейсхолдеры:
```html
@styles - папка стилей
@symbol - путь до SVG symbol'a
@scripts - папка скриптов
@favicons - папка фавиконок
```
### Автоматическое подключение скриптов и стилей
Система зависимостей избавляет вас от нужды подключать js и css файлы к странице руками, теперь достаточно указать специальный комментарий и все будет сделано автоматом.
```html
<html>
  <head>
    <!-- BEMGO:styles --> // тут будут подключены CSS файлы
  </head>
  <body>
    <!-- BEMGO:scripts --> // а тут JS файлы
  </body>
</html>
```
<p align="center">
  <img align="center" src="https://werty1001.github.io/sep.svg" alt="">
</p>

# Препроцессоры и стили
Скоро.

<p align="center">
  <img align="center" src="https://werty1001.github.io/sep.svg" alt="">
</p>

# Зависимости блока
Скоро.

<p align="center">
  <img align="center" src="https://werty1001.github.io/sep.svg" alt="">
</p>

# Автоматическое создание файлов и блоков
Вы просто пишите БЭМ код, а блоки и файлы создаются автоматически.  
По умолчанию данная фича выключена, чтобы ее активировать вам нужно добавить настройки в (**app/config.js**)
```js
// app/config.js

autoCreate: {
  folders: [], // список директорий у нового блока, например: 'img', 'assets'
  files: [], // список файлов у нового блока, например: 'style', 'template', 'data', 'deps', 'script'
  levels: [], // уровни, где будут создаваться блоки, например: 'develop'
  ignoreNodes: [], // список сущностей, которые будут проигнорированы полностью *
},

```
> \* Можно использовать регулярные выражения!

Допустим мне нужно создавать блоки на уровне develop, у каждого нового блока должен быть файл стилей & скриптов и папки для картинок, но при этом нужно игнорировать элементы:
```js
// app/config.js

autoCreate: {
  folders: [ 'img', 'assets' ], // у новых блоков будет две директории
  files: [ 'style', 'script' ], // у новых блоков будет стиль и скрипт
  levels: [ 'develop' ], // новые блоки только на уровне develop
  ignoreNodes: [ /__[\w]/i ], // все элементы будут проигнорированы
},

```
Отлично, но при таких настройках для каждого модификатора блока будут созданы отдельные файлы стилей и скриптов, чтобы этого избежать нужно дополнить настройки:
```js
// app/config.js

autoCreate: {
  folders: [ 'img', 'assets' ],
  files: [ 'style', 'script' ],
  levels: [ 'develop' ],
  ignoreNodes: [ /__[\w]/i ],
  ignoreStyle: [ /(_|--)[\w]/i ], // игнорируем модификаторы при создании стилей
  ignoreScript: [ /(_|--)[\w]/i  ], // игнорируем модификаторы при создании скриптов
  ignoreTemplate: [], // по аналогии можно указать и для шаблонов
},

```

<p align="center">
  <img align="center" src="https://werty1001.github.io/sep.svg" alt="">
</p>

# Генерация Favicons

1. Для начала вам необходимо поместить свою иконку в корень папки разработки (**app/icon.png**).
2. Далее в конфинге приложения (**app/config.js**) нужно указать какие иконки нужно создать:

```js
// app/config.js

generateFavicons: {
  android: false,
  appleIcon: false,
  appleStartup: false,
  coast: false,
  favicons: true, // по умолчанию только этот пункт true
  firefox: false,
  windows: false,
  yandex: false,
},

// также можно указать данные для манифеста

manifest: {
  appName: null,
  appShortName: null,
  appDescription: null,
}
```
> Если нет icon.png, то ничего создано не будет, а в режиме разработки эта задача игнорируется всегда! 

Для создания иконок используется [этот плагин](https://github.com/itgalaxy/favicons), можете посмотреть полные настройки по ссылке, замечу, что плагин позволяет указать данные для манифеста, цвет для фона иконок и всякое разное.

<p align="center">
  <img align="center" src="https://werty1001.github.io/sep.svg" alt="">
</p>

# Уровни переопределения
Скоро.

<p align="center">
  <img align="center" src="https://werty1001.github.io/sep.svg" alt="">
</p>

# Создание файлов и блоков из консоли
Если по каким-то причинам не подходит [автоматическое создание файлов и блоков](#автоматическое-создание-файлов-и-блоков), то вы можете быстро создавать блоки и файлы из консоли простой командой `npm run add`.
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

По умолчанию все сущности создаются на основном уровне (св-во **mainLevel** в **app/config.js**), но вы можете указать уровень напрямую через двоеточие:
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

<p align="center">
  <img align="center" src="https://werty1001.github.io/sep.svg" alt="">
</p>

# Вопросы и ответы

### А где хранить глобальные файлы? Есть общая папка для таких целей?
* Нету. Но это вообще не проблема! Для хранения каких-то глобальных файлов можно использовать корневой блок, например page или app, у вас скорее всего такой есть.

### Остались вопросы?
* Вы можете [создать issue](https://github.com/werty1001/bemgo/issues/new) или написать мне напрямую в телеграмм [@werty1001](https://telegram.me/werty1001).

<p align="center">
  <img align="center" src="https://werty1001.github.io/sep.svg" alt="">
</p>

# Changelog

### 1.0.0
* Переписан почти весь код :)
* Обновлены все плагины
* Убран webpack
* Добавлена система зависимостей для блоков
* Добавлено автоматическое подключение скриптов и стилей на основе зависимостей
* Добавлено подробное описание на русском

### 0.1.0
* beta version

