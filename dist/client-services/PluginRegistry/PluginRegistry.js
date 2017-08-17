"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var PluginsTable = exports.PluginsTable = {}; // storage for infos about Plugins


var registerPlugin = exports.registerPlugin = function registerPlugin(name, Plugin) {
  if (name === undefined || name === null) {
    throw new Error("Plugin name cannot be " + name);
  }
  PluginsTable[name] = {
    Plugin: Plugin
  };
};

var removePlugin = exports.removePlugin = function removePlugin(name) {
  if (name === undefined || name === null) {
    throw new Error("name cannot be " + name);
  }
  if (!PluginsTable.hasOwnProperty(name)) {
    throw new Error(name + " is not registered.");
  }
  delete PluginsTable[name];
};

var initializePlugins = exports.initializePlugins = function initializePlugins() {
  for (var key in PluginsTable) {
    // skip loop if the property is from prototype
    if (!PluginsTable.hasOwnProperty(key)) continue;

    var Plugin = PluginsTable[key].Plugin;
    if (Plugin.initialize) {
      Plugin.initialize();
    }
  }
};