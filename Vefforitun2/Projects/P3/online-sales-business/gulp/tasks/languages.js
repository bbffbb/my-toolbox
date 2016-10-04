"use strict";

const gulp   = require("gulp");
const extend = require("gulp-extend");
const config = require("../config");

gulp.task("language-is", (cb) => {
	gulp.src("src/**/*_IS.json")
		.pipe(extend("lang_is.json", true, "\t"))
		.pipe(gulp.dest(config.paths.target + "/"))
		.on("end", cb);
});

gulp.task("language-en", (cb) => {
	gulp.src("src/**/*_EN.json")
		.pipe(extend("lang_en.json", true, "\t"))
		.pipe(gulp.dest(config.paths.target + "/"))
		.on("end", cb);
});

gulp.task("languages", ["language-is", "language-en"]);
