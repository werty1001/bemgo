<p align="right">
  <a href="https://github.com/werty1001/bemgo">English →</a>
</p>

# ![BemGo](https://werty1001.github.io/bemgo.svg)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/werty1001/bemgo/master/LICENSE) ![](https://img.shields.io/github/repo-size/werty1001/bemgo.svg?style=flat-square) ![](https://img.shields.io/github/stars/werty1001/bemgo.svg?style=flat-square) ![](https://img.shields.io/github/forks/werty1001/bemgo.svg?style=flat-square) ![](https://img.shields.io/travis/werty1001/bemgo.svg?style=flat-square)

Сборка упрощает и ускоряет процесс разработки проектов по методологии [БЭМ](https://ru.bem.info/), под капотом [Gulp](http://gulpjs.com/).

### Особенности
* Сборка заточена под методологию БЭМ (Блок, Элемент, Модификатор)
* Разделение структуры на независимые блоки
* Можно использовать [уровни переопределения](https://ru.bem.info/methodology/redefinition-levels/)
* Шаблонизатор [Pug](https://pugjs.org) или [Twig](http://twig.sensiolabs.org/), а также обычный HTML для разметки
* Препроцессор [LESS](http://lesscss.org/) или [Sass](http://sass-lang.com/) или [Stylus](http://stylus-lang.com/) + все прелести [PostCSS](http://postcss.org/) для стилей
* Транспайлер Babel 7 для JavaScript
* Сборка растовых и векторных спрайтов (sprite.svg / sprite.png / sprite<span></span>@2x.png / symbol.svg)
* Можно использовать JSON файлы данных для каждого блока
* Генерация иконок (Favicons) для разных платформ 
* Быстрое создание zip архива сборки или слепка разработки
* Ничего лишнего, в итоговую сборку попадут только те файлы, которые  используются
* Автоматическое создание файлов и блоков по вашему HTML коду
* Возможность сборки стилей и скриптов (бандлов) для каждой страницы отдельно

и многое другое :)

### Как это работает
Вы просто пишите БЭМ код, на основе разметки страниц формируется структура, учитываются зависимости и происходит сборка нужных файлов.


### Навигация
* [Установка](#установка)
* [Основные команды](#основные-команды)
* [Структура](#структура)
* [Описание работы](#описание-работы)
* [Вопросы и ответы](#вопросы-и-ответы)
* [Changelog](#changelog)

<p align="center">
  <a href="#навигация"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Установка

[Скачайте архив](https://github.com/werty1001/bemgo/archive/master.zip) или лучше клонируйте репозиторий:
```bash
git clone https://github.com/werty1001/bemgo.git bemgo && cd bemgo
```
Далее нужно установить зависимости из package.json с помощью npm или yarn:
```bash
npm i или yarn install
```
После можно запустить режим разработки (из коробки доступно простое демо приложение):
```bash
npm start
```

<p align="center">
  <a href="#навигация"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Основные команды
* `npm i` — установить зависимости
* `npm start` — старт разработки
* `npm run do` — запуск финальной сборки
* `npm run zip` — создание zip архива со сборкой
* `npm run zip:dev` — создание zip архива со слепком разработки
* `npm run task [name]` — запуск gulp таска по имени
* `npm run add [command]` — быстрое [создание блоков и файлов](#создание-файлов-и-блоков-из-консоли)
* `npm run clean` — [удаление неиспользуемых блоков и элементов](#удаление-неиспользуемых-блоков) *
* `npm run init` — старт нового проекта **

### Будьте внимательны!
> \* Неиспользованные в коде блоки и элементы будут удалены сразу со всех уровней!  

> \** Папка app (со всеми файлами разработки) будет удалена полностью, на ее место будет клонирован новый проект c github (репозиторий можно поменять в package.json, по умолчанию будет клонирован [этот](https://github.com/werty1001/app)).

<p align="center">
  <a href="#навигация"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Структура

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
├── fonts/               # Шрифты
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
├── symbols/             # Иконки для symbol спрайта (только svg)
│   └── arrow.svg
│
├── assets/              # Любые файлы, которые нужны блоку
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
└── data.json            # В json можно хранить данные
```

<p align="center">
  <a href="#навигация"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Описание работы

* [Настройки приложения](#настройки-приложения)
* [Шаблонизаторы и разметка](#шаблонизаторы-и-разметка)
* [Препроцессоры и стили](#препроцессоры-и-стили)
* [Растровые и векторные спрайты](#растровые-и-векторные-спрайты)
* [SVG symbols](#svg-symbols)
* [Зависимости блока](#зависимости-блока)
* [Автоматическое создание файлов и блоков](#автоматическое-создание-файлов-и-блоков)
* [Создание Favicons](#создание-favicons)
* [Уровни переопределения](#уровни-переопределения)
* [Оптимизация изображений](#оптимизация-изображений)
* [Создание файлов и блоков из консоли](#создание-файлов-и-блоков-из-консоли)
* [Стартовый контент для новых файлов](#стартовый-контент-для-новых-файлов)
* [Создание бандлов](#создание-бандлов)
* [Удаление неиспользованных блоков](#удаление-неиспользованных-блоков)
* [Создание нового таска](#создание-нового-таска)

<p align="center">
  <a href="#навигация"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Настройки приложения
Все основные настройки хранятся в одном файле **app/config.js**, такой подход позволяет использовать одну сборку для разных проектов и настраивать каждое приложение индивидуально.
> Если config.js нет, то будут использованы настройки по умолчанию, после любых изменений в конфинге, нужно перезапускать режим разработки!

### Настройки по умолчанию:
```js
module.exports = {
  
  // Используемые технологии
  use: {
    templates: '.html', // шаблонизатор, можно '.html' или '.pug' или '.twig'
    scripts: '.js',     // скрипты, только '.js'
    styles: '.css',     // препроцессор, можно '.css' или '.styl' или '.less' или '.scss' или '.sass'
  },

  // Основные настройки сборки
  build: {

    autoprefixer: [ 'last 3 versions' ], // настройки автопрефиксера
    babel: false, // нужен ли транспайлер Babel для JS
    BEML: false, // нужен ли BEM постпроцессор в HTML
    
    bundles: [], // сборка CSS/JS бандлов для страниц, можно [ 'css', 'js' ]
    sourcemaps: [], // нужны ли sourcemap'ы, можно [ 'css', 'js' ]
    imagemin: [], // нужно ли сжимать изображения, можно [ 'png', 'jpg', 'svg', 'gif' ]

    mainBundle: 'app', // название основного бандла проекта
    mainLevel: 'develop', // название основного уровня
    
    pugMap: false, // путь (от корня) для создания PUG карты
    globalStyles: false, // путь (от корня) до глобального файла стилей
    
    addVersions: true, // нужно ли добавлять версию (?v=23413) при подключении стилей и скриптов
    HTMLRoot: './', // корень для путей у статики в HTML
 
  },

  // Структура финальной сборки
  dist: {
    styles: 'styles',
    fonts: 'styles/fonts',
    img: 'styles/img',
    symbol: 'styles/img',
    scripts: 'scripts',
    static: 'static',
    favicons: 'favicons',
  },
  
  // Настройки форматирования HTML (подробности ниже)
  HTMLBeautify: {},

  // Настройки для автоматического создания файлов (подробности ниже)
  autoCreate: {},

  // Настройки стартого контента для файлов (подробности ниже)
  addContent: {},

  // Заготовки для создания блоков из консоли (подробности ниже)
  fastMake: {},

  // Настройки для создания Favicons (подробности ниже)
  favicons: {},

  // Данные для манифеста (подробности ниже)
  manifest: {},

  // Порядок подключения файлов с разных уровней (подробности ниже)
  levels: {},

  // Настройки для оптимизации изображений (подробности ниже)
  optimization: {},
  
  // Список блоков под защитой от удаления (подробности ниже)
  cleanProtect: [],

}
```

<p align="center">
  <a href="#навигация"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Шаблонизаторы и разметка

В качестве шаблонизатора разметки можно использовать Pug / Twig или обычный HTML.  
По умолчанию выбран HTML, но вы можете это изменить в [config.js](#настройки-приложения)
```js
// app/config.js

use: {
  templates: '.pug', // Pug я выбираю тебя!
  ...
},

```
Теперь сборка будет искать pug файлы.  
### JSON данные в разметке
У каждого блока может быть файл данных **data.json**, эти данные доступны в разметке, например у нас есть блок **message** c json файлом:
```json
// message/data.json

{
  "greeting": "Привет, мир!"
}
```
Эти данные легко получить из специального объекта **global.jsons**
```pug
// page.pug

h1= global.jsons.message.greeting

```
```html
// page.html

<h1>@@global.jsons.message.greeting</h1>

```
```twig
// page.twig

<h1>{{ global.jsons.message.greeting }}</h1>

```
### Плейсхолдеры для путей
У каждого блока своя папка со статикой, поэтому вам необходимо указывать плейсхолдеры, чтобы было понятно у какого блока нужно искать конкретный файл.
> Плейсхолдер состоит из символа @ (собачки) и имени блока.

Например, у нас есть блок c картинкой **card/assets/man.png**, в разметке нужно указать путь так:
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
[Система зависимостей](#зависимости-блока) избавляет вас от нужды подключать JS и CSS файлы к странице руками, теперь достаточно указать специальный комментарий и все будет сделано автоматом.
```html
<html>
  <head>
    <!-- BEMGO:styles --> // тут будут подключены CSS файлы
  </head>
  <body>
    ...
    <!-- BEMGO:scripts --> // а тут JS файлы
  </body>
</html>
```

### Шаблонизатор PUG
При работе с PUG удобно выносить какие-то блоки в миксины и вызывать их, но есть одна проблема – в шаблонизаторе нет динамического подключения, а каждый раз подключать миксин руками больно :)  

В сборке предусмотрено автоматическое подключение всех PUG файлов в одном. Это полностью решает проблему, а вам достаточно указать путь куда писать карту файлов в [config.js](#настройки-приложения) и затем подключить ее себе в layout.
```js
// app/config.js

build: {
  ...

  pugMap: 'app/blocks/map.pug', // путь от корня сборки **
},
```
> \** Эта карта будет обновляться автоматически, менять что-то руками не требуется!

### Расширенные возможности HTML
Можно отказаться от шаблонизаторов и писать разметку на обычном HTML, плюс в сборке встроен дополнительный плагин, который позволяет загружать куски HTML кода, использовать переменные и циклы, а также условные конструкции, подробнее о работе этого плагина можно [узнать тут](https://www.npmjs.com/package/gulp-file-include).

### БЭМ разметка
Если вы не любите писать БЭМ код руками, то в сборке сразу есть несколько плагинов, которые упрощают эту задачу.
* [Bemto](https://github.com/kizu/bemto) - для Pug
```pug
include /node_modules/bemto.pug/bemto

+b.block
  +e.element Text
```

* [BemPug](https://github.com/werty1001/bempug) - для Pug
```pug
include /node_modules/bempug/index

+b( 'block' )
  +e( 'element' ) Text
```

* [BEML](https://github.com/zenwalker/node-beml) - универсальный плагин, его можно активировать в [config.js](#настройки-приложения)
```html
<div block="block">
  <div elem="element">Text</div>
</div>
```
```js
// app/config.js

build: {
  ...

  BEML: true,
},
```
### Форматирование HTML

Вы можете настроить красивое форматирование HTML кода с помощью [js-beautify](https://github.com/beautify-web/js-beautify), для этого нужно указать настройки в [config.js](#настройки-приложения)
```js
// app/config.js

HTMLBeautify: {
  indent_size: 2, // размер отступа
  indent_char: ' ', // знак отступа
  indent_with_tabs: false, // отступ табами
  indent_inner_html: true, // нужны ли отступы внутри тега html
  end_with_newline: false, // нужна ли пустая строка в конце файла
  extra_liners: [], // список тегов с пустой строкой перед собой
  preserve_newlines: true, // можно ли использовать пустые строки
  max_preserve_newlines: 2, // максимальное кол-во пустых строк подряд
  inline: [], // список строчных тегов (по умолчанию по стандарту w3c)
  unformatted: [], // список тегов, которые не нужно форматировать (по умолчанию inline)
  content_unformatted: [ 'pre', 'textarea' ], // список тегов, у которых не нужно форматировать содержимое
},
```
Полные настройки вы можете найти [по ссылке](https://github.com/beautify-web/js-beautify#css--html).


<p align="center">
  <a href="#навигация"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Препроцессоры и стили
В качестве препроцессора для стилей можно использовать LESS / Sass / Stylus или обойтись обычным CSS.  
По умолчанию выбран CSS, но вы можете это изменить в [config.js](#настройки-приложения)
```js
// app/config.js

use: {
  ...
  styles: '.styl', // Stylus я выбираю тебя!
},
```
Скорее всего у вас есть какой-то общий файл с переменными или миксинами, но в условиях независимости блоков его придется импортировать в каждый стиль отдельно. Мягко говоря не самый удобный вариант, поэтому есть способ лучше – вы можете указать определенный файл (или массив файлов) в настройках и он будет импортирован при сборке автоматически.
```js
// app/config.js

build: {
  ...

  globalStyles: 'app/blocks/global.styl' // Путь от корня сборки до файла с переменными
},
```

### PostCSS
В сборку встроены следующие плагины:
* [autoprefixer](https://github.com/postcss/autoprefixer) - работает всегда
* [postcss-sprites](https://github.com/2createStudio/postcss-sprites) - только в финальной сборке
* [stylefmt](https://github.com/morishitter/stylefmt) - только в финальной сборке

Дополнительные плагины вы всегда сможете встроить самостоятельно это несложно.


<p align="center">
  <a href="#навигация"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Растровые и векторные спрайты
Вы легко можете собирать векторные спрайты, а также растровые спрайты для разных экранов, для этого используется замечательный [PostCSS плагин](https://github.com/2createStudio/postcss-sprites).
> Важно, в режиме разработки спрайты не создаются, только при финальной сборке! 

Все иконки для спрайта необходимо хранить в отдельной директории блока (img/sprite) и просто использовать как обычные изображения, при финальной сборке все иконки в CSS, которые находятся в этой директории будут собраны в спрайт.
```css
/* zoom/zoom.css */

.zoom {
  width: 24px;
  height: 24px;
  background: url('img/sprite/zoom.png') no-repeat center;
}

.zoom_active {
  background: url('img/sprite/zoom_active.png') no-repeat center;
}
```
В итоге в финальной сборке будет так:

```css

.zoom {
  width: 24px;
  height: 24px;
  background-image: url('img/sprite.png');
  background-position: 0 0;
  background-size: 48px 24px;
}

.zoom_active {
  background-image: url('img/sprite.png');
  background-position: -24px 0;
  background-size: 48px 24px;
}
```
Раньше приходилось создавать карту с переменными для каждого препроцессора, а теперь простой и понятный CSS код, а все лишнее под капотом.

### Для ретины
Можно создавать спрайты для экранов с высокой плотностью пикселей (2x, 3x, 4x и.т.д), для этого достаточно сделать иконку в нужном размере и добавить плотность перед расширением файла, например для 2x и 3x:
```css
/* zoom/zoom.css */

.zoom {
  width: 24px;
  height: 24px;
  background: url('img/sprite/zoom.png') no-repeat top center;
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .zoom {
    background: url('img/sprite/zoom@2x.png') no-repeat center/cover;
  }
}

@media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi) {
  .zoom {
    background: url('img/sprite/zoom@3x.png') no-repeat center/cover;
  }
}
```
В финальной сборке будет три спрайта – обычный и для ретина экранов (для 192dpi и 288dpi).
### Вектор
Одновременно с растовыми спрайтами можно создавать и векторные, принцип тот же, только с SVG иконками:
```css

.zoom {
  width: 24px;
  height: 24px;
  background: url('img/sprite/zoom.svg') no-repeat center;
}
```

<p align="center">
  <a href="#навигация"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# SVG symbols
Помимо обычных спрайтов для стилей, можно использовать SVG символы в HTML, иконки для этого спрайта нужно хранить в отдельной папке блока (symbols). Для каждой иконки будет сгенерирован свой ID по шаблону **blockName__iconName**, например:
```
card/symbols/arrow.svg → #card__arrow
```
### Подключение SVG
Есть несколько вариантов подключения SVG, можно встроить прямо в HTML код, для этого вам нужно указать специальный комментарий:
```html
<!-- BEMGO:symbol -->
```
Тогда в теге use достаточно только ID:
```html
<svg>
  <use xlink:href="#card__arrow"></use>
</svg>
```
Второй вариант внешний файл, тогда в теге use необходимо указывать специальный плейсхолдер:
```html
<svg>
  <use xlink:href="@symbol#card__arrow"></use>
</svg>
```
### Трансформация SVG
Если в коде страницы будет найдена хотя-бы одна SVG иконка, то сборка будет искать специальный блок symbol на основном уровне разработки (св-во **mainLevel** в [config.js](#настройки-приложения)), вы можете создать два файла `prepend.svg` и `append.svg` внутри этого блока и тогда содержимое этих файлов будет добавлено в тело SVG (в начало и в конец).
### Сборка иконок для SVG
В режиме разработки все иконки со всех блоков будут добавлены в спрайт, но в финальную сборку попадут только те иконки, которые есть в вашем коде (с «правильными» ID).
> Также вы можете добавить специальный ключ @always перед расширением иконки, тогда она попадет в спрайт в любом случае:
```
card/symbols/arrow@always.svg
```

<p align="center">
  <a href="#навигация"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Зависимости блока
Для любого блока можно указать зависимости (другие блоки или модули) в файле deps.js
```js
// deps.js

module.exports = {

  nodes: [], // Сущности, блоки / элементы / модификаторы

  modules: [], // Модули

}
```
Например, есть блок **select** и с помощью JS ему динамически добавляется модификатор **select_open**, в HTML коде этого модификатора нет, поэтому сборка о нем не знает, чтобы это исправить достаточно добавить этот модификатор в файле deps.js
```js
// select/deps.js

module.exports = {

  nodes: [
    'select_open'
  ],

}
```
Теперь все в порядке, сборка учитывает этот модификатор. По аналогии можно добавлять другие сущности (элементы и блоки), которых нет в коде, но они все равно должны быть включены в сборку.
### Модули
Второй вариант зависимостей это модули, каждый модуль это объект с 3-мя свойствами:
```js
// deps.js

module.exports = {

  modules: [
    {
      from: '',   // расположение модуля (CDN или путь от корня сборки)
      inject: [], // список файлов, которые будут подключены как отдельные файлы
      import: [], // список файлов, которые будут импортированы в общий бандл
    },
  ],

}
```
Например у нас есть блок **slider**, для полноценной работы ему нужен плагин [slick](http://kenwheeler.github.io/slick/), который в свою очередь использует библиотеку jQuery:
```js
// slider/deps.js

module.exports = {

  modules: [
    {
      from: 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/', // подключим jQuery с CDN
      inject: [ 'jquery.min.js' ], // Этот файл будет подключен на странице отдельно
    },
    {
      from: 'node_modules/slick-carousel/slick', // подключим slick из node_modules
      inject: [ 'slick.min.js' ], // Этот файл будет подключен на странице отдельно
      import: [ 'slick.css' ], // этот файл попадет в общий CSS бандл
    },
  ],

}
```
Теперь при использовании блока slider на странице будет подключена библиотека jQuery и плагин slick.min.js, все картинки и шрифты из slick.css автоматом подтянутся в сборку.

* Если у модуля не указано свойство from, то поиск файлов будет проходить в самом блоке (в папке assets).
* Файлы из CDN нельзя импортировать, только подключать как внешние файлы.

Если вам требуется подключить JS файл асинхронно, то просто добавьте на конце @async или @defer:
```js
{
  from: 'node_modules/slick-carousel/slick',
  inject: [ 'slick.min.js@async' ], // Этот скрипт будет подключен на странице c атрибутом async
},
```
Для более тонкого подключения модуля предусмотрена специальная функция filter, которая будет вызываться для каждого файла из  inject и import:
```js
filter ( file, node, page, type ) {

  // file - полный путь подключаемого файла
  // node - объект блока со всеми атрибутами
  // page - имя страницы
  // type - тип подключения, 'inject' или 'import'

  console.log( node ) // { name: 'link', attrs: { class: 'link' }, tag: 'a' }

  return true // функция должна вернуть true или false (подключать или нет)
}
```
Допустим у меня есть блок **link** и этот блок иногда нуждается в плагине [lightbox](https://lokeshdhakar.com/projects/lightbox2/), но подключать его необходимо только при определенных условиях – когда у блока есть модификатор **link_zoom**:
```js
// link/deps.js

module.exports = {

  modules: [
    {
      from: 'node_modules/lightbox2/dist/',
      inject: [ 'js/lightbox.js' ],
      import: [ 'css/lightbox.css' ],
      filter ( file, node ) {
        return node.attrs.class.split( ' ' ).includes( 'link_zoom' ) // проверка
      }
    },
  ],

}
```
Простая проверка в одну строку решает проблему, теперь модуль будет подтягиваться только в нужный момент.

<p align="center">
  <a href="#навигация"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Автоматическое создание файлов и блоков
Вы просто пишите БЭМ код, а блоки и файлы создаются автоматически.  
По умолчанию данная фича выключена, чтобы ее активировать вам нужно добавить настройки в [config.js](#настройки-приложения)
```js
// app/config.js

autoCreate: {
  onlyOnWatch: true, // создавать файлы всегда или только во время разработки
  folders: [], // список директорий у нового блока, например: 'img', 'assets'
  files: [], // список файлов новой сущности, например: '.css', '.js', 'data.json'
  levels: [], // уровни, где будут создаваться блоки, например: 'develop'
  ignoreNodes: [], // список сущностей, которые будут проигнорированы полностью **
},

```
> \** Тут можно использовать регулярные выражения!

Допустим мне нужно создавать блоки на уровне develop, у каждого нового блока должен быть файл стилей, скрипт и папка для картинок, но при этом нужно игнорировать элементы и не создавать файлы для них:
```js
// app/config.js

autoCreate: {
  onlyOnWatch: true, // создаем файлы только во время watch'а
  folders: [ 'assets' ], // у новых блоков сразу будет создана папка assets
  files: [ '.css', '.js' ], // у новых сущностей будет стиль и скрипт
  levels: [ 'develop' ], // новые блоки создаются только на уровне develop
  ignoreNodes: [ /__[\w]/i ], // все элементы будут проигнорированы
},

```
Отлично, но при таких настройках для каждого модификатора блока также будет создан свой JS и CSS файл, если вам это не нужно, то можно дополнить настройки:
```js
// app/config.js

autoCreate: {
  onlyOnWatch: true,
  folders: [ 'img', 'assets' ],
  files: [ '.css', '.js' ],
  levels: [ 'develop' ],
  ignoreNodes: [ /__[\w]/i ],
  ignoreStyle: [ /[a-z\d](_|--)[a-z\d]/i ], // игнорируем модификаторы при создании стилей
  ignoreScript: [ /[a-z\d](_|--)[a-z\d]/i  ], // игнорируем модификаторы при создании скриптов
  ignoreTemplate: [], // по аналогии можно указать и для шаблонов
},

```
На самом деле, мы могли просто запретить модификаторы также как и элементы, но для демонстрации всех возможностей пусть будет так :)

<p align="center">
  <a href="#навигация"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Создание Favicons

1. Для начала вам необходимо поместить свою иконку в корень папки разработки (**app/icon.png**).
2. Далее в конфинге приложения [config.js](#настройки-приложения) нужно указать какие иконки нужно создать:

> Если нет icon.png, то ничего создано не будет, а в режиме разработки эта задача игнорируется всегда! 

```js
// app/config.js

favicons: {
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
  ...
}
```

Для создания иконок используется [этот плагин](https://github.com/itgalaxy/favicons), можете посмотреть полные настройки по ссылке, замечу, что плагин позволяет указать данные для манифеста, цвет для фона иконок и всякое разное другое.

### Подключение Favicons
В разметке можно указать специальный комментарий и тогда базовые иконки будут подключены автоматом, если будут найдены:
```
<!-- BEMGO:favicons -->
```
```html
<meta name="msapplication-config" content="./favicons/browserconfig.xml">
<link rel="shortcut icon" href="./favicons/favicon.ico" type="image/x-icon">
<link rel="icon" href="./favicons/favicon-16x16.png" sizes="16x16" type="image/png">
<link rel="icon" href="./favicons/favicon-32x32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="./favicons/apple-touch-icon.png" sizes="180x180">
<link rel="mask-icon" href="./favicons/safari-pinned-tab.svg" color="#0f54b9">
<link rel="manifest" href="./favicons/manifest.json">
```
Если у вас сразу есть готовые иконки, то вы можете поместить их в любой блок (например корневой) в папку assets/favicons, добавив файлам специальный ключ @always перед расширением (favicon<span></span>@always.ico), тогда эти иконки будут скопированы в итоговую сборку.


<p align="center">
  <a href="#навигация"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Уровни переопределения
Для организации блоков вы можете использовать любое количество уровней, несколько или только один, при этом поиск файлов будет проходить по всем, а порядок подключения стилей и скриптов с разных уровней можно настроить в [config.js](#настройки-приложения)
```js
// app/config.js

levels: {
  common: 1, // сначала отсюда
  develop: 2, // потом отсюда
},
```
Допустим у нас есть блок **button** на уровне common и develop:
```css
/* common/button/button.css */

.button {
  background-color: #cf2318;
  text-align: center;
}
```
```css
/* develop/button/button.css */

.button {
  background-color: transparent;
}
```
В общем файле будут собраны оба CSS:
```css
/* app.css */

.button {
  background-color: #cf2318;
  text-align: center;
}

.button {
  background-color: transparent; /* Это правило изменит фон */
}
```
Таким образом мы переопределили фон для кнопки, не трогая файл на уровне common. 

> Это базовые возможности переопределения, если вам нужны более тонкие настройки, то я советую посмотреть на стек от Яндекса.

<p align="center">
  <a href="#навигация"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Оптимизация изображений

Вы можете включить сжатие изображений в [config.js](#настройки-приложения) 
> В режиме разработки оптимизации не будет, только при финальной сборке!
```js
// app/config.js

build: {
  ...
  imagemin: [ 'svg', 'jpg', 'png', 'gif' ] // есть поддержка 4 типов
},
```
Для сжатия используется плагин [imagemin](https://github.com/sindresorhus/gulp-imagemin), для каждого типа можно указать свои настройки оптимизации, по умолчанию будет так:

```js
// app/config.js

optimization: {

  jpg: {
    progressive: true,
    arithmetic: false,
  },

  png: {
    optimizationLevel: 5, // можно указать 0-7
    bitDepthReduction: true,
    colorTypeReduction: true,
    paletteReduction: true,
  },

  gif: {
    optimizationLevel: 1, // можно указать 1-3
    interlaced: true
  },

  // Для svg нужно указать массив c настройками!
  svg: [
    { cleanupIDs: false },
    { removeViewBox: false },
    { mergePaths: false },
  ],

  // Тут можно указать названия (без расширения), которые не нужно оптимизировать
  ignore: []

},
```
Подробнее о настройках сжатия каждого типа можно узнать в доках:
* gif - [gifsicle](https://github.com/imagemin/imagemin-gifsicle#api)
* jpg - [jpegtran](https://github.com/imagemin/imagemin-jpegtran#api)
* png - [optipng](https://github.com/imagemin/imagemin-optipng#api)
* svg - [svgo](https://github.com/svg/svgo#what-it-can-do)

<p align="center">
  <a href="#навигация"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Создание файлов и блоков из консоли
Если по каким-то причинам не подходит [автоматическое создание файлов и блоков](#автоматическое-создание-файлов-и-блоков), то вы можете быстро создавать блоки и файлы из консоли простой командой `npm run add`.
> Если какие-то файлы и папки уже есть, то они просто будут проигнорированы.
> При использовании командной оболочки Zsh вам нужно экранировать квадратные скобки или брать команду в ковычки!

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

По умолчанию все сущности создаются на основном уровне (св-во **mainLevel** в [config.js](#настройки-приложения)), но вы можете указать уровень напрямую через двоеточие:
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

Чтобы не перечислять каждый раз файлы и папки вы можете создать заготовки в [config.js](#настройки-приложения)
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

<p align="center">
  <a href="#навигация"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Стартовый контент для новых файлов
При создании файлов [автоматом](#автоматическое-создание-файлов-и-блоков) или [руками](#создание-файлов-и-блоков-из-консоли) им можно добавить стартовый контент, для этого нужно добавить настройки в [config.js](#настройки-приложения)
```js
// app/config.js

addContent: {
  page: 'I make [name] page.', // [name] будет заменено на название страницы
  css: '.[name] {}', // [name] будет заменено на название css файла
}
```
Теперь при создании CSS файла `npm run add header[.css]` его содержимое будет таким:
```css
.header {}
```
По аналогии можно добавлять содержимое для любых новых файлов.

<p align="center">
  <a href="#навигация"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Создание бандлов
Для каждой страницы можно собирать скрипты и стили отдельно, для этого нужно добавить настройки в [config.js](#настройки-приложения):
```js
// app/config.js

build: {
  ...
  bundles: [ 'css', 'js' ],
  ...
}
```
Теперь для каждой страницы будет собран свой CSS и JS.
> В режиме разработки бандлы не создаются, только при финальной сборке!

<p align="center">
  <a href="#навигация"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Удаление неиспользуемых блоков

Вы можете быстро почистить свою структуру разработки от лишнего и удалить только те сущности, которые не используются на страницах приложения.
* Блок будет удален полностью (папка блока со всем содержимым).
* У элементов и модификаторов будут удалены стили, скрипты и шаблон.

> При этом сущности будут удалены со всех уровней сразу!

Запуск:
```bash
npm run clean
```
Также вы можете защитить определенные блоки и они не будут удалены этой командой, просто укажите эти блоки в [config.js](#настройки-приложения): 

```js
// app/config.js

cleanProtect: [ 'title' ], // Блок title, его элементы и модификаторы теперь под защитой
```

<p align="center">
  <a href="#навигация"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Создание нового таска
Чтобы создать свою задачу вам необходимо добавить новый js файл в папку тасков с минимальным функционалом:
```js
// tasks/mytask.js

'use strict'

module.exports = {
  name: 'mytask',
  run ( done ) {
    console.log( 'Поехали!' )
    return done()
  },
}
```
> Каждая задача обязательно должна содержать имя и функцию run, которая должна возвращать callback или например stream, подробнее об этом можно узнать [в доках галпа](https://gulpjs.com/docs/en/getting-started/async-completion).

#### Теперь можно запустить:
```bash
npm run task mytask
```
> **Результат:**  
Поехали!

Все работает, теперь можно включить задачу в общую сборку, за это отвечает свойство **build**, которое содержит номер выполнения:
```js
// tasks/mytask.js

'use strict'

module.exports = {
  name: 'mytask',
  build: 5, // задача будет запущена под № 5 **
  run ( done ) {
    console.log( 'Поехали!' )
    return done()
  },
}
```
> \** При этом несколько задач могут иметь одинаковый номер, в таком случае они будут выполняться параллельно

Общая сборка имеет следующий порядок:
```
0. [ del ]
1. [ compile:templates ]
2. [ generate:symbol, compile:styles, compile:scripts, generate:favicons, copy:assets ]
3. [ copy:fonts, copy:imgs, inject:data ]
4. [ browserSync:watch, minify:images ]

5. [ mytask ] // наша новая задача будет запущена последней
```
> Важно! Порядок дефолтных тасков лучше не менять, иначе нормальная работа не гарантируется.

Также задача может содержать функцию watch, которая должна возвращать объект с настройками для слежения:
```js
watch () {
  return {
    files: '**/**/*.md', // glob для слежения за файлами
    tasks: 'mytask', // имя задачи или массив задач для запуска
  }
},
```

<p align="center">
  <a href="#навигация"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Вопросы и ответы

#### А где хранить глобальные файлы? Есть общая папка для таких целей?
* Нету. Но это вообще не проблема! Для хранения каких-то общих файлов можно использовать корневой блок, например **page** или **app**, у вас скорее всего такой будет.

#### Как включить файл в итоговую сборку независимо от того, есть ли он коде или нет?
* Легко, просто добавьте файлу специальный ключ @always перед расширением, например man<span></span>@always.png, это сработает для любых статичных файлов.

#### А сюда можно встроить Vue или React?
* Наверно, но зачем? Данная сборка решает другие задачи, при разработке SPA лучше использовать специальные инструменты, например Create React App или Vue CLI.

### Нашли ошибку или есть вопрос?
* Вы можете [создать issue](https://github.com/werty1001/bemgo/issues/new) или написать мне напрямую в телеграмм [@werty1001](https://telegram.me/werty1001).

<p align="center">
  <a href="#навигация"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Changelog

### 1.0.0
* Переписан почти весь код :)
* Обновлены все плагины
* Убран webpack
* Убран FTP деплой
* Добавлена система зависимостей для блоков
* Добавлено автоматическое подключение скриптов и стилей на основе зависимостей
* Добавлено подробное описание на русском и английском

### 0.1.0
* beta version

