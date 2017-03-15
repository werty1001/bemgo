
# BemGo
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/werty1001/bemgo/master/LICENSE)

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
* ES6 with babel, build JS using Webpack
* Support for all types of sprites: sprite.svg / sprite.png / sprite.2x.png / symbol.svg
* JSON data for use in templates
* FTP deploy
* Creating zip archive with a complete build
* Nothing superfluous, in build only those files that are used

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
By default, app folder doesn't exist, you can init new app or running demo:
```bash
npm run demo
```
```bash
npm run init
```
> For change init repository, please edit **package.json**!

---

### Commands
* `npm i` — install dependencies
* `npm run init` — init new APP
* `npm run demo` — running demo
* `npm start` — start development
* `npm run do` — run production build

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
├── pages/               # Pages
│   ├── index.html
│   └── about.html
│
├── blocks/              # Blocks
│   ├── common/ 
│   │   └── block/ 
│   └── develop/ 
│   │   └── block/ 
│   └── helpers.css      # Global helpers for styles (optional)
│
├── config.js            # Config (optional)
└── icon.png             # Icon for generate favicons (optional)
```

Block has [flat](https://en.bem.info/methodology/filestructure/#flat) structure and all files and folders is optional:
```
block/
├── fonts/               # Fonts
│   └──  Roboto.woff2
│
├── img/                 # Any images for style
│   ├── sprite/          # Icons for sprite here (png or svg)
│   ├── symbol/          # Icons for symbol sprite (only svg)
│   └── bg.png
│
├── assets/              # Any assets files
│
├── block.js
├── block.html
├── block.css
├── block__el.css
├── block__el.js
└── data.json            # Data for use in templates
```
---
### Usage
[Config](#config) | [Install](#install) | [Commands](#commands) | [Structure](#structure) | [Usage](#usage) | [Changelog](#changelog)

---
### Config
App has `config.js` file for change default settings:
```JS
{
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

	options: {
		babel: false, // Use babel for build JS
		bundles: false, // Lang
		sourcemap: false
	},

    // Order redefinition levels
	levels: {
		common: 1,
		develop: 2,
		themes: 3
	},

	extnames: {
		templates: 'pug',
		scripts: 'js',
		styles: 'styl'
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

    // Which icons need to generate
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

    // Blocks to be used in any case, example:
    // 
    // blocks: {
	//      app: {
	//        header: 'header--home',
	//        content__section: ''
	//      }
	// },
	//

	blocks: {
		app: {}
	},

    // Assets to be used in any case, example:
    //
	// used: {
	//     assets: [ 'footer/logo.png' ],
	//     symbol: [ 'header__tel' ],
	//     styles: [ 'slick.css' ],
	//     scripts: [ 'slick.js' ]
	// },
	//

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
		template: ''
	},

    // Main level
	addLevel: 'develop',

    // HTML attributes for search assets
	assetsAttr: [ 'href', 'src', 'srcset' ]

}
```


---
### Changelog
**0.1.0**
* Alpha
---
