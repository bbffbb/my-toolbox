"use strict";

const gulp        = require("gulp");
const watch       = require("gulp-watch");
const runSequence = require("run-sequence");
const config      = require("../config");

/*
 * This task watches the files in our src folder, and reloads
 * the browser automatically with the updated files.
 */
gulp.task("watch", () => {
	watch(["src/**/*.less"], () => {
		gulp.start("styles-custom");
	});

	watch(["src/**/*.js"], () => {
		runSequence("scripts", "build-index");
	});

	watch(["src/**/*.html"], () => {
		runSequence("templates", "build-index");
	});

	watch(["src/**/*_IS.json"], () => {
		runSequence("language-is", "build-index");
	});

	watch(["src/**/*_EN.json"], () => {
		runSequence("language-en", "build-index");
	});

});
