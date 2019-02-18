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

# App's config
All the basic settings are stored in a single file **app/config.js**, this approach allows you to use the same builder for different projects and configure each application individually.

> The default settings will be used, if there is no config.js

### Default settings:
```js
module.exports = {
  
  // Used technologies
  use: {
    templates: '.html', // '.html' or '.pug' or '.twig'
    scripts: '.js',     // only '.js'
    styles: '.css',     // '.css' or '.styl' or '.less' or '.scss' or '.sass'
  },

  // Main build settings
  build: {

    autoprefixer: [ 'last 3 versions' ], // autoprefixer
    babel: false, // need Babel?
    BEML: false, // need BEM postprocessor in HTML
    
    bundles: [], // need CSS/JS bundles, may [ 'css', 'js' ]
    sourcemaps: [], // need sourcemaps, may [ 'css', 'js' ]
    imagemin: [], // need image optimization, may [ 'png', 'jpg', 'svg', 'gif' ]

    mainBundle: 'app', // main bundle name
    mainLevel: 'develop', // main level name
    
    pugMap: false, // path (from root) for generate PUG map
    globalStyles: false, // path (from root) for global styles
    
    addVersions: true, // need versions (?v=23413)
    HTMLRoot: './', // root for paths at static files in HTML
 
  },

  // Production structure
  dist: {
    styles: 'styles',
    fonts: 'styles/fonts',
    img: 'styles/img',
    symbol: 'styles/img',
    scripts: 'scripts',
    static: 'static',
    favicons: 'favicons',
  },
  
  // HTML formatting settings (details below)
  HTMLBeautify: {},

  // Settings for automatic file creation (details below)
  autoCreate: {},

  // Settings for default content in files (details below)
  addContent: {},

  // Blanks for creating blocks from the terminal (details below)
  fastMake: {},

  // Settings for generate favicons (details below)
  favicons: {},

  // Data for the manifest (details below)
  manifest: {},

  // The order of import files from different levels (details below)
  levels: {},

  // Settings for image optimization (details below)
  optimization: {},
  
  // List of blocks protected from clean (details below)
  cleanProtect: [],

}
```

<p align="center">
  <a href="#navigation"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Redefinition levels
To organize the blocks, you can use any number of levels, several or only one, while the files will be searched for all, and the order of import styles and scripts from different levels can be configured in [config.js](#apps-config)
```js
// app/config.js

levels: {
  common: 1, // first from here
  develop: 2, // then from here
},
```
Suppose we have a **button** block at the common and develop level:
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
In the main bundle file will be both CSS rules:
```css
/* app.css */

.button {
  background-color: #cf2318;
  text-align: center;
}

.button {
  background-color: transparent; /* This rule will change the background color. */
}
```
Thus, we redefined the background for the button, without touching the file at the common level. 

> These are the basic redefinition capabilities, if you need more advanced settings, then I advise you to look at the stack from Yandex.

<p align="center">
  <a href="#navigation"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Image optimization

You can enable image compression in [config.js](#apps-config)
> There will be no optimization in the development mode, only during the production build!
```js
// app/config.js

build: {
  ...
  imagemin: [ 'svg', 'jpg', 'png', 'gif' ] // support for 4 types
},
```
The [imagemin](https://github.com/sindresorhus/gulp-imagemin) plugin is used for compression, for each type, you can specify your optimization settings, the default will be as follows:

```js
// app/config.js

optimization: {

  jpg: {
    progressive: true,
    arithmetic: false,
  },

  png: {
    optimizationLevel: 5, // may 0-7
    bitDepthReduction: true,
    colorTypeReduction: true,
    paletteReduction: true,
  },

  gif: {
    optimizationLevel: 1, // may 1-3
    interlaced: true
  },

  // For svg, you need to specify an array with settings!
  svg: [
    { cleanupIDs: false },
    { removeViewBox: false },
    { mergePaths: false },
  ],

  // Here you can specify the names (without extensions) that do not need to be optimized.
  ignore: []

},
```
More information about each type of compression settings can be found in the docs:
* gif - [gifsicle](https://github.com/imagemin/imagemin-gifsicle#api)
* jpg - [jpegtran](https://github.com/imagemin/imagemin-jpegtran#api)
* png - [optipng](https://github.com/imagemin/imagemin-optipng#api)
* svg - [svgo](https://github.com/svg/svgo#what-it-can-do)

<p align="center">
  <a href="#navigation"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Fast make blocks and files from terminal
If for some reason the [automatic creation of files and blocks](#automatic-creation-of-files-and-blocks) does not fit, then you can quickly create blocks and files from the terminal with a simple command `npm run add`.

> If any files and folders already exist, they will simply be ignored.

Create a block **header** and **footer** with additional files:
```bash
npm run add header[.css,.js] footer[.pug]
```
> **Result:**  
A "header" folder will be created  
A "header/header.css" file will be created  
A "header/header.js" file will be created  
A "footer" folder will be created  
A "footer/footer.pug" file will be created

You can create elements and modifiers:
```bash
npm run add header__logo[.css,.js] footer__inner[.styl] footer_home[.styl]
```
> **Result:**  
A "header" folder will be created  
A "header/header__logo.css" file will be created  
A "header/header__logo.js" file will be created  
A "footer" folder will be created  
A "footer/footer__inner.styl" file will be created  
A "footer/footer_home.styl" file will be created

You can also create folders inside the block:
```bash
npm run add card[img/sprite,assets,.pug,deps.js]
```
> **Result:**  
A "card" folder will be created  
A "card/img" folder will be created  
A "card/img/sprite" folder will be created  
A "card/assets" folder will be created  
A "card/card.pug" file will be created  
A "card/deps.js" file will be created

By default, all blocks are created at the main level (see property **mainLevel** in [config.js](#apps-config)), but you can specify the level directly through the colon:

```bash
npm run add card[.js,.scss] :common
```
> **Result:**  
A "common" folder will be created (level)  
A "common/card" folder will be created  
A "common/card/card.js" file will be created  
A "common/card/card.scss" file will be created 

You can also quickly create pages, for this you need to specify the keyword **page** after add:
```bash
npm run add page index catalog about.html
```
> **Result:**  
A "pages" folder will be created  
A "pages/index.pug" file will be created *  
A "pages/catalog.pug" file will be created *  
A "pages/about.html" file will be created  
\------  
\* If the page extension is not specified, it will be taken from config.js

If you don't want to list files and folders every time, you can create blanks in [config.js](#apps-config)
```js
// app/config.js

fastMake: {
  b: ['.js','.css','.pug','img']
}
```
Now quite well:
```bash
npm run add header[b]
```
> **Result:**  
A "header" folder will be created  
A "header/header.js" file will be created  
A "header/header.css" file will be created  
A "header/header.pug" file will be created  
A "header/img" folder will be created  

<p align="center">
  <a href="#navigation"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Default content in new files
When creating files [automatically](#1111) or [by hand](#fast-make-blocks-and-files-from-terminal), its may contain default content, for this you need to add settings in [config.js](#apps-config)

```js
// app/config.js

addContent: {
  page: 'I make [name] page.', // [name] will be replaced by the page name
  css: '.[name] {}', // [name] will be replaced with the name of the css file
}
```
Now when creating a CSS file `npm run add header[.css]` its contents will be:
```css
.header {}
```
By analogy, you can add content for any new files.

<p align="center">
  <a href="#navigation"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Bundles
For each page, you can compile scripts and styles separately, for this you need to add settings to [config.js](#apps-config):
```js
// app/config.js

build: {
  ...
  bundles: [ 'css', 'js' ],
  ...
}
```
Now for each page will be compiled its own CSS and JS.
> In development mode, no bundles are created, only in production build!

<p align="center">
  <a href="#navigation"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Remove unused blocks

You can quickly clean your development structure and remove only those blocks that are not used on the pages.
* The block will be deleted completely (block folder with all its contents).
* At elements and modifiers will be deleted styles, scripts and template.

> Blocks will be removed from all levels at once!

Run:
```bash
npm run clean
```
You can also protect certain blocks and they will not be deleted by this command, just specify these blocks in [config.js](#apps-config): 

```js
// app/config.js

cleanProtect: [ 'title' ], // The "title" block with elements and modifiers are now protected.
```

<p align="center">
  <a href="#navigation"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Add task
You need to add a new JS file to the tasks folder with minimal functionality:
```js
// tasks/mytask.js

'use strict'

module.exports = {
  name: 'mytask',
  run ( done ) {
    console.log( 'Go!' )
    return done()
  },
}
```
> Each task must contain a name and a run function, which should return a callback or, for example, stream, more about this can be found [here](https://gulpjs.com/docs/en/getting-started/async-completion).

#### Now you can run it:
```bash
npm run task mytask
```
> **Result:**  
Go!

Everything works, now you can include the task in the main build, the property **build** is responsible for this, which contains the execution number:

```js
// tasks/mytask.js

'use strict'

module.exports = {
  name: 'mytask',
  build: 5, // the task will run under № 5 **
  run ( done ) {
    console.log( 'Go!' )
    return done()
  },
}
```
> \** Several tasks may have the same number, in this case they will be executed in parallel

The main build has the following order:
```
0. [ del ]
1. [ compile:templates ]
2. [ generate:symbol, compile:styles, compile:scripts, generate:favicons, copy:assets ]
3. [ copy:fonts, copy:imgs, inject:data ]
4. [ browserSync:watch, minify:images ]

5. [ mytask ] // our new task will be run last
```
> Important! The order of default tasks is better not to change.

A task can also contain a watch function, which should return an object with settings for watch:
```js
watch () {
  return {
    files: '**/**/*.md', // globs
    tasks: 'mytask', // task name or an array of names to run
  }
},
```

<p align="center">
  <a href="#navigation"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# FAQ

#### And where to store global files?
* To store some global files, you can use a root block, such as a **page** or **app**, you probably will have one.

#### How to add a file in the production, regardless of whether it has in code or not?
* Easy, just add a special @always key to the file before the extension, for example man<span></span>@always.png, this will work for any static files.

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

