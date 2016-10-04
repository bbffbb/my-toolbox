"use strict";

const gulp   = require("gulp");
const del    = require("del");
const config = require("../config");

gulp.task("clean-templates", () => {
	return del(config.paths.target + "/scripts/templates*.js");
});

gulp.task("clean-scripts", () => {
	return del(config.paths.target + "/scripts/app*.js");
});

gulp.task("clean", () => {
	return del(config.paths.target);
});
