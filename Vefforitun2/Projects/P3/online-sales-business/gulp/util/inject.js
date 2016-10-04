"use strict";

const gulp       = require("gulp");
const gulpInject = require("gulp-inject");
const config     = require("../config");

module.exports = (glob, tag) => {
	const files    = gulp.src(glob, {read: false});
	const starttag = "<!-- inject:" + tag + ":{{ext}} -->";

	return gulpInject(files, {
		starttag:     starttag,
		ignorePath:   config.paths.target + "/",
		addRootSlash: false
	});
};
