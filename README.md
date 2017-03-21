
# BemGo
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/werty1001/bemgo/master/LICENSE) [![Github Releases](https://img.shields.io/github/downloads/werty1001/bemgo/total.svg?style=flat-square)](https://github.com/werty1001/bemgo/archive/master.zip)

Starter kit for developing [BEM](https://en.bem.info/) applications using [Gulp](http://gulpjs.com/) and [Webpack](https://webpack.js.org/).

---

### Anchors
[Features](#features) | [Install](#install) | [Commands](#commands) | [Structure](#structure) | [Usage](#usage) | [Changelog](#changelog)

---

### Features
* The kit is based on the BEM methodology (Block, Element, Modifier)
* Independent blocks, you can reuse it
* Redefinition level for blocks
* [Jade/Pug](https://pugjs.org) or [Twig](http://twig.sensiolabs.org/) or @include for HTML coding
* [LESS](http://lesscss.org/) or [Sass](http://sass-lang.com/) or [Stylus](http://stylus-lang.com/) + [PostCSS](http://postcss.org/) for styles
* Build JS using Webpack 2 with babel 6
* Generate all types of sprites: sprite.svg / sprite.png / sprite.2x.png / symbol.svg
* Support JSON data for use in templates
* Generate all types of favicons: apple touch icons / windows tile icons / android icons / manifest
* Creating zip archive with a complete build or development files
* Nothing unnecessary, in build only those files that are used
* Support creating files for blocks automatically
* FTP deploy

and more ...

---

### Install
> Bemgo depends on [Node.js](https://nodejs.org/) with NPM and [Git](https://git-scm.com/), make sure that it is already installed on your pc.

[Download](https://github.com/werty1001/bemgo/archive/master.zip) or clone:
```bash
git clone https://github.com/werty1001/bemgo.git bemgo && cd bemgo
```
Then install dependencies:
```bash
npm i
```
By default, app folder doesn't exist, you can init new app with simple command*:
```bash
npm run init
```
> \* Remember, first you need to edit a **package.json** file and replace init command and specify your repository for clone!

Or clone your init repository right off:
```bash
git clone [your repository] ./app
```
---

### Commands
* `npm i` — install dependencies
* `npm start` — start development
* `npm run init` — init new APP
* `npm run do` — run production build
* `npm run zip` — creating zip archive with a complete build
* `npm run zip:dev` — creating zip archive with development files
* `npm run ftp` — run FTP deploy

Also, you can create new blocks and files:
* `npm run add block [block name]:[file]:[folder]` — add block
* `npm run add style [style name]` — add style
* `npm run add page [page name]` — add page
* `npm run add json [block name]` — add data.json
* `npm run add script [script name]` — add script
* `npm run add template [template name]` — add template

#### Examples:

Add two blocks `header` and `footer`:
```bash
npm run add block header footer
```
Add `header` block with `header.css` and `header.js` and `img/` folder:
```bash
npm run add block header:style:script:img
```
Add `header.css` and `header__content.css` in header block:
```bash
npm run add style header header__content
```
Add `data.json` in nav block:
```bash
npm run add json nav
```
---

### Structure

Builder has the following file structure:
```
bemgo/
│
├── app/                 # Dev source
├── dist/                # Build here
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
│   ├── common/ 
│   │   └── block/ 
│   │
│   ├── develop/ 
│   │   └── block/ 
│   │
│   └── helpers.css      # Global helpers for styles (optional)
│
├── config.js            # Config (optional)
│
└── icon.png             # Icon for generate favicons (optional)
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
│   │   └── mail.png
│   │
│   ├── symbol/          # Icons for symbol sprite (only svg)
│   │   └── account.svg
│   │
│   └── bg.png
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
└── data.json            # Data for use in templates
```
---
### Usage
[Config](#config) | [Sprites](#sprites) | [Symbol](#symbol) | [Tasks](#tasks)

---
### Config
If app contain a `config.js`, it change default settings:
```JS
{

  // Data for templates
  app: {
    lang: 'en',
    name: 'Site',
    description: 'Description',
    domain: 'google.com',
    preloader: false,
    responsive: true,
    microdata: false,
    jquery: false
  },

  // Options
  options: {
    cssBundles: false, // Create CSS bundle for every page?
    jsBundles: false, // Create JS bundle for every page?
    sourcemap: false, // Need sourcemaps?
    babel: false, // Use babel in webpack?
    requireLibs: false
  },

  // Redefinition levels order (common first, then develop and last themes )
  levels: {
    common: 1,
    develop: 2,
    themes: 3
  },

  // Extnames for search
  extnames: {
    templates: 'html', // html or pug or twig
    scripts: 'js', // only js
    styles: 'css' // css or styl or less or scss or sass
  },

  // Build structure
  dist: {
    styles: 'styles',
    fonts: 'styles/fonts',
    img: 'styles/img',
    scripts: 'scripts',
    static: 'static',
    favicons: 'favicons'
  },

  // Generate favicons
  head: {
    favicons: true,
    androidIcons: false,
    appleTouchIcons: false,
    msapplication: false,
    safariPinned: false,
    manifest: false
  },

  // Data for manifest
  manifest: {
    appName: 'Name',
    appDescription: 'Description',
    background: '#020307',
    display: 'standalone',
    orientation: 'portrait',
    start_url: '/?homescreen=1'
  },

  // Data for ftp deploy
  ftp: {
    port: 21,
    host: false,
    user: false,
    pass: false,
    dest: false
  },

  /* Blocks to be used in any case, example:

  blocks: {
    app: {
      header: 'header--home',
      content__section: ''
    },
    index: {
      slider: 'home--slider'
    }
  }

  */

  blocks: {
    app: {}
  },

  /* Assets to be used in any case, example:

  used: {
    assets: [ 'footer/logo.png' ],
    symbol: [ 'header__tel' ],
    styles: [ 'slick.css' ],
    scripts: [ 'slick.js' ]
  }

  */

  used: {
    assets: [],
    symbol: [],
    styles: [],
    scripts: []
  },

  // Default content for new files
  add: {
    page: '',
    json: '',
    style: '',
    script: '',
    template: '',
    block: ''
  },

  // Main level
  mainLevel: 'develop',

  // Create files automatically
  autoCreate: false,
  autoIgnoreBlocks: [],

  // HTML attributes for search assets
  assetsAttr: [ 'href', 'src', 'srcset' ]

}
```
---
### Sprites
For generate sprites (except [symbol](#symbol)) used PostCSS  [plugin](https://github.com/2createStudio/postcss-sprites) and it run only in production build, example:
```CSS
.tel {
    background: url('img/sprite/tel.png') no-repeat top center;
}
```
In production will be:
```CSS
.tel {
    background-image: url('img/sprite.png');
    background-position: 0 0;
}
```
---
### Symbol
On development will be used all icons from `img/symbol` folders, but in production build will be only those icons that are used in HTML code from tag `use` with pattern `#[block name]__[icon name]`, example:
```HTML
<svg class="icon">
    <use xlink:href="#header__account"></use>
</svg>
```
---
### Tasks
If you want add new task, create new file `mytask.js` in tasks folder with this content:
```JS
'use strict';

module.exports = ( task, core ) => {

  return ( cb ) => {

    // Your task here
    // Remember! This function must return cb() or gulp pipe

  } 

};
```
After that, you can use command `npm start mytask` for call it.


---
### Changelog
**0.1.0**
* beta version
---

### Thanks
Many thanks to [Ilya Kantor](https://github.com/iliakan) for some tricks.
