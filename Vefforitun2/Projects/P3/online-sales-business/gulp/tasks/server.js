"use strict";

const gulp        = require("gulp");
const browserSync = require("browser-sync");
const config      = require("../config");

gulp.task("server", () => {

	var syncOptions = {
		port:   config.port,
		files:  `${config.paths.target}/**/*`,
		notify: true,
		server: {
			baseDir: config.paths.target,
			routes:  {
				"/src/vendor":  "src/vendor",
				"/src/components": "src/components"
			}
		}
	};

	if (config.noSync) {
		// Hacky way to disable browserSync
		// (found here: http://stackoverflow.com/questions/27579007/how-to-temporarily-disable-browsersync)
		syncOptions.snippetOptions = {
			rule: {
				match: /qqqqqqqqq/
			}
		}
	}

	browserSync.create().init(syncOptions);
});
