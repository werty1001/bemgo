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

* [App's config](#apps-config)
* [Templates](#templates)
* [Styles](#styles)
* [Raster and vector sprites](#raster-and-vector-sprites)
* [SVG symbols](#svg-symbols)
* [Block dependencies](#block-dependencies)
* [Automatic creation of files and blocks](#automatic-creation-of-files-and-blocks)
* [Generate favicons](#generate-favicons)
* [Redefinition levels](#redefinition-levels)
* [Image optimization](#image-optimization)
* [Fast make blocks and files from terminal](#fast-make-blocks-and-files-from-terminal)
* [Default content in new files](#default-content-in-new-files)
* [Bundles](#bundles)
* [Remove unused blocks](#remove-unused-blocks)
* [Add task](#add-task)


<p align="center">
  <a href="#navigation"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# App's config
All the basic settings are stored in a single file **app/config.js**, this approach allows you to use the same builder for different projects and configure each application individually.

> If there is no config.js, then the default settings will be used, after any changes in the configuration, you need to restart the development mode!

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

# Templates

Pug / Twig or plain HTML can be used as a template maker.  
HTML is the default, but you can change this in [config.js](#apps-config)
```js
// app/config.js

use: {
  templates: '.pug', // Pug, I choose you!
  ...
},

```
Now the build will look for pug files.  
### JSON data in markup
Each block can have a data file **data.json**, this data is available in the markup, for example, we have a **message** block with a json file:

```json
// message/data.json

{
  "greeting": "Hello, world!"
}
```
This data is easily get from a special object **global.jsons**
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
### Pathways
Each block has its own folder with assets, so you need to specify placeholder before specific file.
> A placeholder consists of a "@" symbol and a block name.

For example, we have a block with a **card/assets/man.png** image, in the markup, you need to specify the path like this:
```html
<img src="@card/man.png" alt="">
```
There are also special placeholders:
```html
@styles - styles folder
@symbol - way to SVG symbol
@scripts - scripts folder
@favicons - favicons folder
```

### Automatic insert of scripts and styles
[The system of dependencies](#block-dependencies) eliminates the need to connect JS and CSS files to the page with your hands, now it is enough to specify a special comment and everything will be done automatically.
```html
<html>
  <head>
    <!-- BEMGO:styles --> // CSS files will be here
  </head>
  <body>
    ...
    <!-- BEMGO:scripts --> // and here JS files
  </body>
</html>
```

### PUG Template
When working with PUG, it is convenient to put some blocks into mixins and call them, but there is one problem - there is no dynamic connection in the template engine, and it is painful to connect the mixin each time :)

The builder provides for the automatic include of all PUG files in one. This completely solves the problem, and you just need to specify the path where to write the map files in [config.js](#apps-config) and then include it to your layout.
```js
// app/config.js

build: {
  ...

  pugMap: 'app/blocks/map.pug', // path from root **
},
```
> \** This map will be updated automatically, no need to change something with your hands!

### Advanced HTML
You can opt out of template engines and write markup on regular HTML with additional plugin, which allows you to load pieces of HTML code, use variables and cycles, as well as conditional constructions, you can learn more about how this plugin works [here](https://www.npmjs.com/package/gulp-file-include).

### BEM marking
If you don’t like to write BEM code with your hands, then there are several plugins in the build that simplify this task.
* [Bemto](https://github.com/kizu/bemto) - for Pug
```pug
include /node_modules/bemto.pug/bemto

+b.block
  +e.element Text
```

* [BemPug](https://github.com/werty1001/bempug) - for Pug
```pug
include /node_modules/bempug/index

+b( 'block' )
  +e( 'element' ) Text
```

* [BEML](https://github.com/zenwalker/node-beml) - universal plugin, it can be activated in [config.js](#apps-config)
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
### HTML formatting
You can set up beautiful formatting of HTML code using [js-beautify](https://github.com/beautify-web/js-beautify), for this you need to specify the settings in [config.js](#apps-config)
```js
// app/config.js

HTMLBeautify: {
  indent_size: 2,
  indent_char: ' ',
  indent_with_tabs: false,
  indent_inner_html: true,
  end_with_newline: false,
  extra_liners: [],
  preserve_newlines: true,
  max_preserve_newlines: 2,
  inline: [],
  unformatted: [],
  content_unformatted: [ 'pre', 'textarea' ],
},
```
Full settings you can find [here](https://github.com/beautify-web/js-beautify#css--html).

<p align="center">
  <a href="#navigation"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Styles
As a preprocessor for styles, you can use LESS / Sass / Stylus or use plain CSS.  
CSS is the default, but you can change this in [config.js](#apps-config)

```js
// app/config.js

use: {
  ...
  styles: '.styl', // Stylus I choose you!
},
```
Most likely you have some kind of common file with variables or mixins, but in the conditions of independence of the blocks it will have to be imported into each style separately. To put it mildly, this is not the most convenient option, so there is a better way - you can specify a specific file (or an array of files) in the settings and it will be imported automatically.
```js
// app/config.js

build: {
  ...

  globalStyles: 'app/blocks/global.styl' // Path from root to variables file
},
```

### PostCSS
The following PostCSS plugins are used by default:
* [autoprefixer](https://github.com/postcss/autoprefixer) - always
* [postcss-sprites](https://github.com/2createStudio/postcss-sprites) - only in production build
* [stylefmt](https://github.com/morishitter/stylefmt) - only in production build

Additional plug-ins you can always add yourself is easy.

<p align="center">
  <a href="#navigation"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Raster and vector sprites
You can easily build vector and raster sprites (for different screens), for this is used a wonderful [PostCSS plugin](https://github.com/2createStudio/postcss-sprites).

> Importantly, in the development mode, sprites are not created, only during the production build!

All icons for the sprite must be stored in a separate block directory (img/sprite) and simply used as normal images, during the production build all the icons in CSS that are in this directory will be turned into a sprite.
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
As a result, in the production build will be:

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
Previously, you had to create a map with variables for each preprocessor, and now simple and clear CSS code, and all that is superfluous is under the hood.

### For retina
You can create sprites for screens with high pixel density (2x, 3x, 4x, etc.), for this it is enough to make an icon in the desired size and add density before the file extension, for example for 2x and 3x:
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
In the production build will be three sprites - normal and for retina screens (for 192dpi and 288dpi).
### Vector
At the same time with raster sprites, you can create vector ones, the same principle, only with SVG icons:
```css

.zoom {
  width: 24px;
  height: 24px;
  background: url('img/sprite/zoom.svg') no-repeat center;
}
```

<p align="center">
  <a href="#navigation"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# SVG symbols
In addition to the usual style sprites, you can use SVG symbols in HTML, the icons for this sprite need to be stored in a separate block folder (symbols). For each icon, your ID will be generated according to the **blockName__iconName** pattern, for example:
```
card/symbols/arrow.svg → #card__arrow
```
### Use SVG
There are several options for use SVG, you can embed directly into the HTML code, for this you need to specify a special comment:
```html
<!-- BEMGO:symbol -->
```
Then in the use tag you need only the ID:
```html
<svg>
  <use xlink:href="#card__arrow"></use>
</svg>
```
The second option is an external file, then a special placeholder must be specified in the use tag:
```html
<svg>
  <use xlink:href="@symbol#card__arrow"></use>
</svg>
```
### SVG Transformation
If at least one SVG icon is found in the page code, the build will look for a special symbol block at the main development level (see **mainLevel** property in [config.js](#apps-config)), you can create two `prepend.svg` and `append.svg` files inside this block and then the contents of these files will be added to the SVG body (at the beginning and at the end).

### Get icons for SVG
In development mode, all icons from all blocks will be added to the sprite, but only those icons that are in your code (with the «correct» ID) will be included in the production build.
> You can also add a special key @always before expanding the icon, then it will fall into the sprite anyway:
```
card/symbols/arrow@always.svg
```

<p align="center">
  <a href="#navigation"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Block dependencies
For any block, you can specify dependencies (other blocks or modules) in the deps.js file
```js
// deps.js

module.exports = {

  nodes: [], // Nodes: blocks / elements / modifiers

  modules: [], // Modules

}
```
For example, there is a **select** block and with the help of JS, the **select_open** modifier is dynamically added to it, there is no this modifier in the HTML code, so the builder does not know about it; to fix this, it is enough to add this modifier in the deps.js file

```js
// select/deps.js

module.exports = {

  nodes: [
    'select_open'
  ],

}
```
Now everything is fine, the builder takes this modifier. By analogy, you can add other nodes (elements and blocks) that are not in the code, but they should still be included in the build.
### Modules
The second variant of dependencies is modules, each module is an object with three properties:
```js
// deps.js

module.exports = {

  modules: [
    {
      from: '',   // module location (CDN or path from the root)
      inject: [], // list of files to be used as separate files
      import: [], // list of files to be imported into the common bundle
    },
  ],

}
```
For example, we have a **slider** block, for full-fledged work, it needs the [slick plugin](http://kenwheeler.github.io/slick/), which in turn uses the jQuery library:
```js
// slider/deps.js

module.exports = {

  modules: [
    {
      from: 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/', // jQuery from CDN
      inject: [ 'jquery.min.js' ], // this file will be used on the page separately
    },
    {
      from: 'node_modules/slick-carousel/slick', // get slick from node_modules
      inject: [ 'slick.min.js' ], // this file will be used on the page separately
      import: [ 'slick.css' ], // this file will be imported into the common bundle
    },
  ],

}
```
Now when using the slider block on the page, the jQuery library and the slick.min.js plugin will be used too, all the images and fonts from slick.css will automatically be pulled into the build.

* If the module does not have the from property, then the file search will take place in the block itself (in the assets folder).
* Files from CDN can not be imported, only used as external files.

If you need to connect the JS file asynchronously, simply add @async or @defer to the end:
```js
{
  from: 'node_modules/slick-carousel/slick',
  inject: [ 'slick.min.js@async' ], // this script will be used on the page with the async attribute.
},
```
For a more subtle use of the module, a special filter function is provided that will be called for each file from inject and import:
```js
filter ( file, node, page, type ) {

  // file - full path of the included file
  // node - block object with all attributes
  // page - page name
  // type - use type, 'inject' or 'import'

  console.log( node ) // { name: 'link', attrs: { class: 'link' }, tag: 'a' }

  return true // the function should return true or false (use or not)
}
```
Suppose I have a **link** block and this block sometimes needs a [lightbox plugin](https://lokeshdhakar.com/projects/lightbox2/), but you need to connect it only under certain conditions - when the block has the **link_zoom** modifier:
```js
// link/deps.js

module.exports = {

  modules: [
    {
      from: 'node_modules/lightbox2/dist/',
      inject: [ 'js/lightbox.js' ],
      import: [ 'css/lightbox.css' ],
      filter ( file, node ) {
        return node.attrs.class.split( ' ' ).includes( 'link_zoom' ) // check
      }
    },
  ],

}
```
A simple check in one line solves the problem, now the module will pull up only at the right moment.

<p align="center">
  <a href="#navigation"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Automatic creation of files and blocks
You just write the BEM code, and the blocks and files are created automatically.  
By default, this feature is turned off, to activate it, you need to add settings to [config.js](#apps-config)
```js
// app/config.js

autoCreate: {
  onlyOnWatch: true, // create files always or only during watch
  folders: [], // the list of directories of the new block, for example: 'img', 'assets'
  files: [], // list of files of the new node, for example: '.css', '.js', 'data.json'
  levels: [], // levels where blocks will be created, for example: 'develop'
  ignoreNodes: [], // list of nodes that will be completely ignored **
},

```
> \** You can use regular expressions here!

Suppose I need to create blocks at the develop level, each new block must have a style file, a script and a folder for pictures, but at the same time, you need to ignore the elements and not create files for them:
```js
// app/config.js

autoCreate: {
  onlyOnWatch: true, // create files only during watch
  folders: [ 'assets' ], // assets folder created for new blocks
  files: [ '.css', '.js' ], // new node will have style and script
  levels: [ 'develop' ], // new blocks are created only at the develop level
  ignoreNodes: [ /__[\w]/i ], // all elements will be ignored
},

```
Good, but with such settings, each JS and CSS file will also be created for each block modifier, if you do not need it, you can add more settings:
```js
// app/config.js

autoCreate: {
  onlyOnWatch: true,
  folders: [ 'img', 'assets' ],
  files: [ '.css', '.js' ],
  levels: [ 'develop' ],
  ignoreNodes: [ /__[\w]/i ],
  ignoreStyle: [ /[a-z\d](_|--)[a-z\d]/i ], // ignore modifiers when creating styles
  ignoreScript: [ /[a-z\d](_|--)[a-z\d]/i  ], // ignore modifiers when creating scripts
  ignoreTemplate: [], // by analogy, you can specify for templates
},

```
In fact, we could just ban modifiers as well as elements, but to demonstrate all the possibilities let it be so :)

<p align="center">
  <a href="#navigation"><img align="center" src="https://werty1001.github.io/sep.svg" alt=""></a>
</p>

# Generate favicons

1. First you need to place your icon in the root of the development folder (**app/icon.png**).
2. Next, in the [config.js](#apps-config), you need to specify which icons to create.

> If there is no icon.png, then nothing will be created, and in development mode this task is always ignored!

```js
// app/config.js

favicons: {
  android: false,
  appleIcon: false,
  appleStartup: false,
  coast: false,
  favicons: true, // by default only this property is true
  firefox: false,
  windows: false,
  yandex: false,
},

// You can also specify data for the manifest

manifest: {
  appName: null,
  appShortName: null,
  appDescription: null,
  ...
}
```
To create icons, [this plugin](https://github.com/itgalaxy/favicons) is used, you can see the full settings on the link, I note that the plugin allows you to specify the data for the manifest, the color for the background of the icons and various other things.

### Insert Favicons
In the markup, you can specify a special comment and then the basic icons will be insert automatically, if found:
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
If you have ready-made icons at once, then you can put them in any block (for example, root) in the assets/favicons folder, adding the special @always key before the extension (favicon<span></span>@always.ico) to the files, then these icons will be copied into the production.

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
> When using the zsh command shell, you need to escape the square brackets or take the command in quotes!

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
When creating files [automatically](#automatic-creation-of-files-and-blocks) or [by hand](#fast-make-blocks-and-files-from-terminal), its may contain default content, for this you need to add settings in [config.js](#apps-config)

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

