"use strict";

const gulp        = require("gulp");
const cache       = require("gulp-angular-templatecache");
const streamify   = require("gulp-streamify");
const runSequence = require("run-sequence");
const rev         = require("gulp-rev");
const config      = require("../config");

gulp.task("templates-html", (cb) => {
	gulp.src(config.paths.html)
		.pipe(cache(config.cache))
		.pipe(streamify(rev()))
		.pipe(gulp.dest(config.paths.target + "/scripts"))
		.on("end", cb);
});

gulp.task("templates", (cb) => {
	runSequence("clean-templates", "templates-html", cb);
});
