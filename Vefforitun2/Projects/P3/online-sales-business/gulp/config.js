"use strict";

const args         = require("yargs").argv;

// To build the app in production, simply pass the --production flag
// when executing gulp:
const isProduction = args.production;

// Sometimes browsersync can be a nuisance (i.e. when we open two
// browser windows simultaneously), it can be disabled by passing
// the --nosync flag to gulp:
const noSync       = args.nosync;

module.exports = {
	port: 7000,

	env: {
		global: {
			name:               "server",
		},
		local:  {
			name:               "local",
		}
	},

	cache: {
		root:   "",
		module: "project3App"
	},

	prod: isProduction,
	noSync: noSync,

	paths: {
		target:  isProduction ? "dist" : ".build",
		scripts: [
			"src/**/*.js",
			"!src/vendor/**/*.*",
			"!src/assets/**/*.*",
			// Exclude all testing files from what will be loaded
			// in our index.html:
			"!src/**/*.spec.js",
			"!src/**/*-spec.js",
			"!src/**/*.mock.js"
		],
		lint:    [
			"src/**/*.js",
			"!src/vendor/**/*.*",
			"!src/assets/**/*.*"
		],
		tests:   [
			"src/**/*-spec.js"
		],
		styles:  [
			"src/app.less",
			"src/components/**/*.less",
			"!src/components/**/_*.less"
		],
		fonts:   [
			"src/vendor/font-awesome/fonts/**/*.*"
		],
		audio:   [
			"src/assets/audio/**/*.*"
		],
		html:    [
			"src/**/*.html",
			"!src/vendor/**/*.html"
		]
	}
};
