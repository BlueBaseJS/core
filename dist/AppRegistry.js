"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var AppsTable = exports.AppsTable = {}; // storage for infos about Apps

var registerApps = exports.registerApps = function registerApps(apps) {};

var registerApp = exports.registerApp = function registerApp(name, App) {
	if (name === undefined || name === null) {
		throw new Error("name cannot be " + name);
	}
	AppsTable[name] = {
		name: name,
		App: App
	};
};

var removeApp = exports.removeApp = function removeApp(name) {
	if (name === undefined || name === null) {
		throw new Error("name cannot be " + name);
	}
	if (!AppsTable.hasOwnProperty(name)) {
		throw new Error(name + "is not registered.");
	}
	delete AppsTable[name];
};

var getAppRoutes = exports.getAppRoutes = function getAppRoutes() {
	var appRoutes = [];
	for (var key in AppsTable) {
		// skip loop if the property is from prototype
		if (!AppsTable.hasOwnProperty(key)) continue;

		var app = AppsTable[key].App;
		if (app.routes) {
			appRoutes.push(app.routes());
		}
	}
	return appRoutes;
};