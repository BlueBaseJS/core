'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.parseJsonSchema = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _lodash = require('lodash.set');

var _lodash2 = _interopRequireDefault(_lodash);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
		value: function parseSubSchemas() /* cheated here */{
			var subSchemas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			var Components = [];
			var index = 0;
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = subSchemas[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var subSchema = _step.value;

					if (typeof subSchema.props === 'undefined') {
						(0, _lodash2.default)(subSchema, 'props.key', index);
					} else {
						subSchema.props.key = typeof subSchema.props.key !== 'undefined' ? subSchema.props.key : index;
					}
					var Component = this.parseSchema(subSchema);

					if ((0, _react.isValidElement)(Component)) {
						Components.push(Component);
					}
					index += 1;
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

			if (Object.prototype.hasOwnProperty.call(schema, 'component') && typeof schema.component !== 'string' && (0, _react.isValidElement)(schema.component)) {
				return schema.component;
			}
			var Component = JsonToReact.resolveComponent(schema);
			var Children = typeof text !== 'undefined' ? text : this.resolveComponentChildren(schema);
			return (0, _react.createElement)(Component, props, Children);
		}
	}, {
		key: 'resolveComponentChildren',
		value: function resolveComponentChildren(schema) {
			return Object.prototype.hasOwnProperty.call(schema, 'children') ? this.parseSchema(schema.children) : undefined;
		}
	}], [{
		key: 'resolveComponent',
		value: function resolveComponent(schema) {
			if (Object.prototype.hasOwnProperty.call(schema, 'component')) {
				if (schema.component === Object(schema.component)) {
					return schema.component;
				} else if (_index2.default.Components.has(String(schema.component))) {
					return _index2.default.Components.get(String(schema.component));
				} else if (Object.prototype.hasOwnProperty.call(_react.DOM, schema.component)) {
					return schema.component;
				}
			} else {
				throw new Error('JsonToReact could not resolve a component' + 'due to a missing component attribute in the schema.');
			}

			throw new Error('JsonToReact could not resolve a component');
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