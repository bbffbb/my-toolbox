"use strict";

const gulp   = require("gulp");
const jshint = require("gulp-jshint");
const config = require("../config");

gulp.task("jshint", () => {
	return gulp.src(config.paths.lint)
		.pipe(jshint(".jshintrc"))
		.pipe(jshint.reporter("jshint-stylish"))
		.pipe(jshint.reporter("fail"));
});
