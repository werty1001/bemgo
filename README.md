<p align="right">
  <a href="README_RU.md">Описание на русском →</a>
</p>

# ![BemGo](https://werty1001.github.io/bemgo.svg)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/werty1001/bemgo/master/LICENSE) ![](https://img.shields.io/github/repo-size/werty1001/bemgo.svg?style=flat-square) ![](https://img.shields.io/github/stars/werty1001/bemgo.svg?style=flat-square) ![](https://img.shields.io/github/forks/werty1001/bemgo.svg?style=flat-square) ![](https://img.shields.io/travis/werty1001/bemgo.svg?style=flat-square)

Builder simplifies and accelerates the process of developing projects according to the [BEM](https://en.bem.info/) methodology, under the hood used [Gulp](http://gulpjs.com/).

### Features
* Based on the BEM methodology (Block, Element, Modifier)
* Independent blocks, you can reuse it
* [Redefinition levels](https://en.bem.info/methodology/redefinition-levels/) for blocks
* [Pug](https://pugjs.org) or [Twig](http://twig.sensiolabs.org/) or simple HTML for coding
* [LESS](http://lesscss.org/) or [Sass](http://sass-lang.com/) or [Stylus](http://stylus-lang.com/) and [PostCSS](http://postcss.org/) for styles
* Babel 7 – the compiler for next generation JavaScript
* Generate all types of sprites (sprite.svg / sprite.png / sprite<span></span>@2x.png / symbol.svg)
* JSON data for use in templates
* Generate favicons
* Creating zip archive with a complete build or development files
* Nothing unnecessary, in build only those files that are used
* Support creating files and blocks automatically
* Support creating JS or CSS bundles for every page

and more :)

### How it works
You write the BEM code, a structure and dependencies are formed on the basis of the pages markup.

### Navigation
* [Install](#install)
* [Commands](#commands)
* [Structure](#structure)
* [Usage](#usage)
* [FAQ](#faq)
* [Changelog](#changelog)

<p align="center">
  <a href="#navigation"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Install
[Download](https://github.com/werty1001/bemgo/archive/master.zip) or clone:
```bash
git clone https://github.com/werty1001/bemgo.git bemgo && cd bemgo
```
Then install dependencies with npm or yarn:
```bash
npm i [or] yarn install
```
And start development:
```bash
npm start
```

<p align="center">
  <a href="#navigation"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Commands
* `npm i` — install dependencies
* `npm start` — start development
* `npm run do` — run production build
* `npm run zip` — creating zip archive with a complete build
* `npm run zip:dev` — creating zip archive with development files
* `npm run task [name]` — run gulp task by name
* `npm run add [command]` — [fast make blocks and files from terminal](#fast-make-blocks-and-files-from-terminal)
* `npm run clean` — [remove unused blocks](#remove-unused-blocks) *
* `npm run init` — clone new repository instead app folder **

### Be careful!
> \* Unused blocks and elements in the code will be removed immediately from all levels!

> \** The app folder (with all development files) will be deleted completely, a new project with github will be cloned in its place (the repository can be changed in package.json, [this one](https://github.com/werty1001/app) will be cloned by default).

<p align="center">
  <a href="#navigation"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Structure

```
bemgo/
│
├── app/                 # Dev source
├── dist/                # Build will be here
├── core/                # Core
├── tasks/               # Tasks
│
├── gulpfile.js
└── package.json
```

App has the following file structure:
```
app/
│
├── pages/               # Pages
│   ├── index.html
│   └── about.html
│
├── blocks/              # Blocks
│   │
│   ├── common/          # common level
│   │   ├── block/
│   │   └── block2/ 
│   │
│   └── develop/         # develop level
│       ├── block/
│       ├── block2/
│       └── block3/
│
├── config.js            # App's config
│
└── icon.png             # Icon for generate favicons
```

Block has [flat](https://en.bem.info/methodology/filestructure/#flat) structure and all files and folders is optional:
```
block/
│
├── fonts/               # Fonts
│   └── Roboto.woff2
│
├── img/                 # Any images for style
│   │
│   ├── sprite/          # Icons for sprite here (png or svg)
│   │   ├── mail.png
│   │   └── mail@2x.png
│   │
│   └── bg.png
│
├── symbols/             # Icons for symbol sprite (only svg)
│   └── arrow.svg
│
├── assets/              # Any assets files
│   └── image.jpg
│
├── block.js
├── block.html
├── block.css
├── block__el.css
├── block__el.js
│
├── deps.js              # block dependencies
│
└── data.json            # JSON data for use in templates
```

<p align="center">
  <a href="#navigation"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Usage

<p align="center">
  <a href="#navigation"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# FAQ

#### And where to store global files?
* To store some global files, you can use a root block, such as a **page** or **app**, you probably will have one.

#### How to add a file in the production, regardless of whether it has in code or not?
* Easy, just add a special @always key to the file before the extension, for example man@always.png, this will work for any static files.

#### Can I use Vue or React here?
* Probably, but why? This builder solves other problems; it is better to use special tools when developing the SPA, for example, the Create React App or the Vue CLI.

### Found a bug or have a question?
* You can [create an issue](https://github.com/werty1001/bemgo/issues/new) or write me directly in the telegram [@werty1001](https://telegram.me/werty1001).

<p align="center">
  <a href="#navigation"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Changelog

### 1.0.0
* Rewritten almost all code
* Updated all plugins
* Removed webpack
* Removed FTP deploy
* Added dependency system for blocks
* Added automatic insert of scripts and styles on pages based on dependencies
* Added detailed description in Russian and English

### 0.1.0
* beta version

