"use strict";

const gulp        = require("gulp");
const bower       = require("main-bower-files");
const gif         = require("gulp-if");
const runSequence = require("run-sequence");
const inject      = require("../util/inject");
const targetPath  = require("../util/target-path");
const config      = require("../config");

gulp.task("build-index", () => {
	gulp.src("src/index.html")
		.pipe(gif(!config.prod, inject(bower(), "vendor")))
		.pipe(inject([
			targetPath("scripts/app*.js"),
			targetPath("scripts/appconfig.js")
		], "app"))
		.pipe(inject(targetPath("scripts/templates*.js"), "templates"))
		.pipe(gif(config.prod, inject(targetPath("scripts/vendor*.js"), "vendor")))
		.pipe(gulp.dest(config.paths.target + "/"));
});

gulp.task("build", (cb) => {
	runSequence("clean", "scripts", "styles", "copy", "templates", "languages", "build-index", cb);
});
