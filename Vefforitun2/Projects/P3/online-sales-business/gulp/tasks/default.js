"use strict";

const gulp        = require("gulp");
const runSequence = require("run-sequence");
const config      = require("../config");

gulp.task("default", (cb) => {
	if (config.prod) {
		runSequence("build", cb);
	} else {
		runSequence("build", "server", "watch", cb);
	}
});
