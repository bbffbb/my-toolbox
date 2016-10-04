"use strict";

const path   = require("path");
const config = require("../config");

module.exports = (glob) => {
	return path.resolve(process.cwd(), config.paths.target, glob);
};
