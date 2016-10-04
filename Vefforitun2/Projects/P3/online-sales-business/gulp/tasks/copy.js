"use strict";

const gulp   = require("gulp");
const util   = require("gulp-util");
const bower  = require("main-bower-files");
const config = require("../config");
const assets = ["src/assets/styles/**/*.*", "!src/assets/styles/**/*.css"];

gulp.task("copy", () => {
	gulp.src(config.paths.fonts.concat(bower("**/fonts/*"))).pipe(gulp.dest(config.paths.target + "/fonts"));
	gulp.src(config.paths.audio).pipe(gulp.dest(config.paths.target + "/assets/audio"));
	gulp.src("src/common/assets/**/*.png").pipe(gulp.dest(config.paths.target + "/assets"));
	gulp.src(assets).pipe(gulp.dest(config.paths.target + "/styles"));
});
