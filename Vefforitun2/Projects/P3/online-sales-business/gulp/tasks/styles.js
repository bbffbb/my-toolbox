"use strict";

const gulp      = require("gulp");
const gif       = require("gulp-if");
const extend    = require("gulp-extend");
const plumber   = require("gulp-plumber");
const bower     = require("main-bower-files");
const less      = require("gulp-less");
const concat    = require("gulp-concat");
const minifyCss = require("gulp-minify-css");
const prefixer  = require("gulp-autoprefixer");
const config    = require("../config");

gulp.task("styles-custom", (cb) => {
	gulp.src(config.paths.styles)
		.pipe(plumber())
		.pipe(less({paths: [process.cwd()]}))
		.pipe(prefixer())
		.pipe(concat("app.css"))
		.pipe(gif(config.prod, minifyCss()))
		.pipe(gulp.dest(config.paths.target + "/styles"))
		.on("end", cb);
});

gulp.task("styles-vendor", (cb) => {
	gulp.src(bower(["**/*.css", "!bootstrap/**/*.css"]))
		.pipe(concat("vendor.css"))
		.pipe(gif(config.prod, minifyCss()))
		.pipe(gulp.dest(config.paths.target + "/styles"))
		.on("end", cb);
});

gulp.task("styles", ["styles-vendor", "styles-custom"]);
