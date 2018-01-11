"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Base class of a plugin which is to be extended.
 * @property {String}	pluginName	Name of the app
 * @property {String}	slug	App's slug, used in to build URL
 * @property {object}	config	Plugin configurations
 * @property {String}	category	Category the App belongs to
 * @property {String}	description	App description
 * @property {String}	version	App version
 */
var Plugin = /** @class */function () {
  function Plugin() {}
  return Plugin;
}();
exports.default = Plugin;