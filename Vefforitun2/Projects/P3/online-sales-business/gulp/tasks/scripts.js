"use strict";

const gulp        = require("gulp");
const gif         = require("gulp-if");
const stream      = require("event-stream");
const streamify   = require("gulp-streamify");
const rev         = require("gulp-rev");
const bower       = require("main-bower-files");
const filter      = require("gulp-filter");
const uglify      = require("gulp-uglify");
const concat      = require("gulp-concat");
const annotate    = require("gulp-ng-annotate");
const runSequence = require("run-sequence");
const config      = require("../config");

gulp.task("scripts-build", (cb) => {
	let gulpStream = gulp.src(config.paths.scripts)
		.pipe(gif(config.prod, annotate()))
		.pipe(gif(config.prod, uglify()))
		.pipe(concat("app.js"))
		.pipe(streamify(rev()));

	// In production, we generate a single (minified) .js file for
	// all vendor files. During development, we serve them individually.
	if (config.prod) {
		const dependencies = gulp.src(bower())
			.pipe(filter("**/*.js"))
			.pipe(uglify({mangle: false}))
			.pipe(concat("vendor.js"))
			.pipe(streamify(rev()));

		gulpStream = stream.merge(dependencies, gulpStream);
	}

	gulpStream.pipe(gulp.dest(config.paths.target + "/scripts"))
		.on("end", cb);
});

gulp.task("scripts", ["jshint"], (cb) => {
	runSequence("clean-scripts", "constants", "scripts-build", cb);
});
