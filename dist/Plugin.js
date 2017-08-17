"use strict";

Object.defineProperty(exports, "__esModule", {
				value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// base class of a plugin which is to be extended
var Plugin = function () {
				function Plugin() {
								_classCallCheck(this, Plugin);
				}

				_createClass(Plugin, [{
								key: "initialize",

								// To initialize Plagin i.e To add all the callbacks against the specific plugin
								value: function initialize() {}
				}]);

				return Plugin;
}();

exports.default = Plugin;