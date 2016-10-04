"use strict";

const gulp       = require("gulp");
const util       = require("gulp-util");
const args       = require("yargs").argv;
const bower      = require("main-bower-files");
const concat     = require("gulp-concat");
const ngConstant = require("gulp-ng-constant");
const config     = require("../config");

gulp.task("constants", () => {
	return gulp.src("")
		.pipe(ngConstant({
			name: "config",
			deps: [],
			constants: {
				ENV: args.local ? config.env.local : config.env.global
			}
		}))
		.pipe(concat("appconfig.js"))
		.pipe(gulp.dest(config.paths.target + "/scripts"))
		.on("error", util.log);
});
