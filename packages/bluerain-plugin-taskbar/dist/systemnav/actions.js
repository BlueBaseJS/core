'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.enableSystemNav = enableSystemNav;
exports.disableSystemNav = disableSystemNav;
exports.openSystemNav = openSystemNav;
exports.closeSystemNav = closeSystemNav;
exports.toggleSystemNav = toggleSystemNav;
exports.dockSystemNav = dockSystemNav;
exports.undockSystemNav = undockSystemNav;
/*
 * action types
 */

var ENABLE_SYSTEM_NAV = exports.ENABLE_SYSTEM_NAV = 'ENABLE_SYSTEM_NAV';
var DISABLE_SYSTEM_NAV = exports.DISABLE_SYSTEM_NAV = 'DISABLE_SYSTEM_NAV';

var OPEN_SYSTEM_NAV = exports.OPEN_SYSTEM_NAV = 'OPEN_SYSTEM_NAV';
var CLOSE_SYSTEM_NAV = exports.CLOSE_SYSTEM_NAV = 'CLOSE_SYSTEM_NAV';
var TOGGLE_SYSTEM_NAV = exports.TOGGLE_SYSTEM_NAV = 'TOGGLE_SYSTEM_NAV';

var DOCK_SYSTEM_NAV = exports.DOCK_SYSTEM_NAV = 'DOCK_SYSTEM_NAV';
var UNDOCK_SYSTEM_NAV = exports.UNDOCK_SYSTEM_NAV = 'UNDOCK_SYSTEM_NAV';

/*
 * action creators
 */

function enableSystemNav() {
	return { type: ENABLE_SYSTEM_NAV };
}

function disableSystemNav() {
	return { type: DISABLE_SYSTEM_NAV };
}

function openSystemNav() {
	return { type: OPEN_SYSTEM_NAV };
}

function closeSystemNav() {
	return { type: CLOSE_SYSTEM_NAV };
}

function toggleSystemNav() {
	return { type: TOGGLE_SYSTEM_NAV };
}

function dockSystemNav() {
	return { type: DOCK_SYSTEM_NAV };
}

function undockSystemNav() {
	return { type: UNDOCK_SYSTEM_NAV };
}