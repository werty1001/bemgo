
# BemGo
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/werty1001/bemgo/master/LICENSE) ![](https://img.shields.io/github/languages/count/werty1001/bemgo.svg?style=flat-square) ![](https://img.shields.io/github/repo-size/werty1001/bemgo.svg?style=flat-square) ![](https://img.shields.io/github/last-commit/werty1001/bemgo.svg?style=flat-square)

[English](README.md) | Русский

---

Сборка упрощает и ускоряет процесс разработки проектов по методологии [БЭМ](https://en.bem.info/), под капотом [Gulp](http://gulpjs.com/).

### Особенности
* Сборка заточена под методологию БЭМ (Блок, Элемент, Модификатор)
* Разделение структуры на независимые блоки
* Можно использовать [уровни переопределения](https://ru.bem.info/methodology/redefinition-levels/)
* Шаблонизатор [Jade/Pug](https://pugjs.org) или [Twig](http://twig.sensiolabs.org/), а также обычный HTML для разметки
* Препроцессор [LESS](http://lesscss.org/) или [Sass](http://sass-lang.com/) или [Stylus](http://stylus-lang.com/) + все прелести [PostCSS](http://postcss.org/) для стилей
* Транспайлер Babel 7 для JavaScript
* Сборка растовых и векторных спрайтов (sprite.svg / sprite.png / sprite.2x.png / symbol.svg)
* Можно использовать JSON файлы данных
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
После установки зависимостей, можно запустить режим разработки:
```bash
npm start
```
После установки сборка сразу содержит простое приложение для демонстрации возможностей.

---

### Основные команды
* `npm i` — установить зависимости из package.json
* `npm start` — старт разработки
* `npm start [task name]` — запуск gulp таска
* `npm run do` — запуск финальной сборки
* `npm run zip` — создание zip архива со сборкой
* `npm run zip:dev` — создание zip архива со слепком разработки
* `npm run init` — старт нового проекта *

> \* Будьте внимательны с этой командой! Папка app (со всеми файлами разработки) будет удалена, на ее место будет клонирован новый проект c github (репозиторий можно поменять в package.json, по умолчанию будет клонирован [мой](https://github.com/werty1001/app)).