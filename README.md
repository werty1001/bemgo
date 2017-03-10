
# BemGo
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/werty1001/bemgo/master/LICENSE)

Starter kit for developing [BEM](https://en.bem.info/) applications using [Gulp](http://gulpjs.com/) and [Webpack](https://webpack.js.org/).

---

### Anchors
[Features](#features) | [Install](#install) | [Usage](#usage) | [Structure](#structure) | [Changelog](#changelog)

---

### Features
* The kit is based on the BEM methodology (Block, Element, Modifier)
* Independent blocks, you can reuse it
* Redefinition level for blocks
* Nothing superfluous, in build only those files that are used
* [Jade/Pug](https://pugjs.org) or [Twig](http://twig.sensiolabs.org/) or @include for HTML coding
* [LESS](http://lesscss.org/) or [Sass](http://sass-lang.com/) or [Stylus](http://stylus-lang.com/) + [PostCSS](http://postcss.org/) for styles
* Support ES6 with babel, build JS using Webpack 2
* Support for all types of sprites: sprite.svg / sprite.png / sprite.2x.png / symbol.svg
* JSON data for use in templates
* FTP deploy
* Creating zip archive with a complete build
and more ...
---

### Install
> Bemgo depends on [Node.js](https://nodejs.org/) with NPM and [Git](https://git-scm.com/), make sure that it is already installed on your pc.

Clone:
```bash
git clone https://github.com/werty1001/bemgo.git bemgo && cd bemgo
```
Then install dependencies:
```bash
npm i
```
By default, app folder doesn't exist, you can init new app from my repository or running demo app:
```bash
npm run init
// Or
npm run demo
```
> For change init repositories, please edit **package.json**!

---

### Usage
* `npm start` — start development
* `npm run build` — run production build

---

### Structure

Builder has the following file structure:
```
bemgo/
├── app/             # Dev source
├── dist/            # Build here
├── core/            # Core
├── tasks/           # Tasks
├── gulpfile.js
└── package.json
```

App has the following file structure:
```
app/
├── pages/           # Pages
├── blocks/          # Blocks
│   ├── common/ 
│       └── block/ 
│   └── develop/ 
│       └── block/ 
├── config.js        # Config (optional)
└── icon.png         # Icon for generate favicons (optional)
```

Block has [flat](https://en.bem.info/methodology/filestructure/#flat) structure and all files and folders is optional:
```
block/
├── fonts/           # Fonts
├── img/             # Any images for style
│   ├── sprite/      # Icons for sprite here (png or svg)
│   └── symbol/      # Icons for symbol sprite (only svg)
├── assets/          # Any files
├── block.js
├── block.pug
├── block.styl
├── block__el.styl
├── block__el.js
└── data.json        # Data for use in templates
```
### Changelog

---
