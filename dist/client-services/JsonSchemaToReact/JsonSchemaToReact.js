'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.parseJsonSchema = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Based on https://github.com/TechniqueSoftware/react-json-schema
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _react = require('react');

var _ComponentRegistry = require('../ComponentRegistry/ComponentRegistry');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JsonToReact = function () {
	function JsonToReact() {
		_classCallCheck(this, JsonToReact);
	}

	_createClass(JsonToReact, [{
		key: 'parseSchema',
		value: function parseSchema(schema) {
			if (schema === undefined || schema === null) {
				throw new Error('schema cannot be ' + schema);
			}
			var element = null;
			var elements = null;
			if (Array.isArray(schema)) {
				elements = this.parseSubSchemas(schema);
			} else {
				element = this.createComponent(schema);
			}
			return element || elements;
		}
	}, {
		key: 'parseSubSchemas',
		value: function parseSubSchemas() {
			var subSchemas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			var Components = [];
			var index = 0;
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = subSchemas[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var subSchema = _step.value;

					subSchema.key = typeof subSchema.key !== 'undefined' ? subSchema.key : index;
					Components.push(this.parseSchema(subSchema));
					index++;
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return Components;
		}
	}, {
		key: 'createComponent',
		value: function createComponent(schema) {
			var text = schema.text,
			    props = schema.props;

			var Component = this.resolveComponent(schema);
			var Children = typeof text !== 'undefined' ? text : this.resolveComponentChildren(schema);
			return (0, _react.createElement)(Component, props, Children);
		}
	}, {
		key: 'resolveComponent',
		value: function resolveComponent(schema) {
			var Component = null;
			if (schema.hasOwnProperty('component')) {
				if (schema.component === Object(schema.component)) {
					Component = schema.component;
				} else if ((0, _ComponentRegistry.hasComponent)(schema.component)) {
					Component = (0, _ComponentRegistry.getComponent)(schema.component);
				} else if (_react.DOM.hasOwnProperty(schema.component)) {
					Component = schema.component;
				}
			} else {
				throw new Error('JsonToReact could not resolve a component' + 'due to a missing component attribute in the schema.');
			}
			return Component;
		}
	}, {
		key: 'resolveComponentChildren',
		value: function resolveComponentChildren(schema) {
			return schema.hasOwnProperty('children') ? this.parseSchema(schema.children) : [];
		}
	}]);

	return JsonToReact;
}();

/*
 * Helper method to convert a json object to React Component
 * @param {*} schema
 */


exports.default = JsonToReact;
var parseJsonSchema = exports.parseJsonSchema = function parseJsonSchema(schema) {
	var obj = new JsonToReact();
	return obj.parseSchema(schema);
};