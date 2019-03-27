
'use strict'


// Require

const fs = require( 'fs' )
const path = require( 'path' )
const pipe = require( './core/pipe' )

const { series, parallel, watch, src, dest, lastRun } = require( 'gulp' )
const { notify, config, paths } = require( './core' )
const { isFile } = require( './core/is' )


// Environment

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development'


// Gulp

const gulp = {}     // for gulp api
const build = []    // for build task
const watchers = [] // for watchers


// Store

const store = {}


// Error handler

const plumber = require( 'gulp-plumber' )

const errorHandler = (err) => {
	return plumber( err => {
		console.log( err )
		return notify.onError( 'Error' )( err )
	})
}


// Try add tasks

try {

	fs.readdirSync( paths._tasks ).forEach( item => {

		if ( path.extname( item ) !== '.js' ) return

		const file = path.join( paths._tasks, item )
		const task = require( file )
		const name = task.name || path.basename( item, '.js' )


		// Task already exist

		if ( gulp[name] )
			return console.log( `The task [${name}] already exist!` )
		
		// No run func

		if ( typeof task.run !== 'function' )
			return console.log( `The task [${name}] must contain run function!` )


		// Add some to all tasks

		task.mainBundle = config.build.mainBundle

		task.isDev = isDevelopment   // env
		task.notify = notify         // notify api
		task.plumber = errorHandler  // error handler
		task.config = config         // app config
		task.store = store           // store
		task.paths = paths           // paths list
		task.path = path             // node path api
		task.fs = fs                 // node fs api
		task.pipe = pipe             // pipe
		task.isFile = isFile         // isFile


		// Add gulp api to tasks

		task.gulp = { series, parallel, src, dest, lastRun }


		// Plugged into the task system

		gulp[name] = task.run.bind( task )
		gulp[name].displayName = name


		// Add watcher

		if ( isDevelopment && typeof task.watch === 'function' ) {

			let watcher = task.watch()

			watcher = Array.isArray( watcher ) ? watcher : [watcher]

			watchers.push( ...watcher )

		}

		// Add to main build

		if ( typeof task.build === 'number' ) {

			if ( ! build[task.build] ) build[task.build] = []

			build[task.build].push( gulp[name] )

		}

	})

} catch (e) { console.log(e) }


// Build task

if ( build.length > 0 ) {

	const run = []

	build.forEach( level => {

		if ( !Array.isArray( level ) ) return

		const tasks = level.filter( item => typeof item === 'function' )

		if ( tasks.length === 0 ) return

		run.push( parallel(...tasks) )

	})

	gulp.default = series(...run)

}


// Watch on develop

if ( process.env.WATCH ) watchers.forEach( item => {

	if ( !item || item.constructor !== Object )
		return console.log( `Watcher must be a object!` )

	const files = paths.slashNormalize( item.files )
	const tasks = Array.isArray( item.tasks ) ? item.tasks : [item.tasks]
	const options = Object.assign({}, item.options )
	const run = []

	if ( ! files ) return console.log( `Watcher must contain a globs for watch on the file system!` )

	tasks.forEach( item => {
		if ( typeof item === 'function' ) return run.push( item )
		if ( typeof item === 'string' && gulp[item] ) return run.push( gulp[item] )
	})

	const watcher = ( run.length === 0 ) ? watch( files, options ) : watch( files, options, series(...run) )

	if ( item.on && item.on.constructor === Object ) {

		if ( typeof item.on.event !== 'string' )
			return console.log( `Watcher event name must be a string!` )

		if ( typeof item.on.handler !== 'function' )
			return console.log( `Watcher event handler must be a function!` )

		watcher.on( item.on.event, item.on.handler )

	}

})


// Export

module.exports = gulp

