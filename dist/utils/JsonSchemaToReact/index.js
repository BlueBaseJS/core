'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseJsonSchema = undefined;

var _react = require('react');

var _lodash = require('lodash.set');

var _lodash2 = _interopRequireDefault(_lodash);

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JsonToReact = /** @class */function () {
    function JsonToReact() {}
    JsonToReact.prototype.resolveComponent = function (schema) {
        if (Object.prototype.hasOwnProperty.call(schema, 'component')) {
            if (schema.component === Object(schema.component)) {
                return schema.component;
            } else if (_index2.default && _index2.default.Components.has(String(schema.component))) {
                return _index2.default.Components.get(String(schema.component));
            } else if (_dom2.default.indexOf(schema.component) > -1) {
                return schema.component;
            }
            // Discontinuing this because `import DOM from 'react';` now returns undefiend.
            // else if (Object.prototype.hasOwnProperty.call(DOM, schema.component)) {
            // 	return schema.component;
            // }
        } else {
            throw new Error('JsonToReact could not resolve a component' + 'due to a missing component attribute in the schema.');
        }
        throw new Error("JsonToReact could not resolve a component: " + schema.component);
    };
    JsonToReact.prototype.parseSchema = function (schema) {
        if (schema === undefined || schema === null) {
            throw new Error("schema cannot be " + schema);
        }
        var element = null;
        var elements = null;
        if (Array.isArray(schema)) {
            elements = this.parseSubSchemas(schema);
        } else {
            element = this.createComponent(schema);
        }
        return element || elements;
    };
    JsonToReact.prototype.parseSubSchemas = function (subSchemas) {
        if (subSchemas === void 0) {
            subSchemas = [];
        }
        var Components = [];
        var index = 0;
        for (var _i = 0, subSchemas_1 = subSchemas; _i < subSchemas_1.length; _i++) {
            var subSchema = subSchemas_1[_i];
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
        return Components;
    };
    JsonToReact.prototype.createComponent = function (schema) {
        var text = schema.text,
            props = schema.props;
        if (Object.prototype.hasOwnProperty.call(schema, 'component') && typeof schema.component !== 'string' && (0, _react.isValidElement)(schema.component)) {
            return schema.component;
        }
        var Component = this.resolveComponent(schema);
        var Children = typeof text !== 'undefined' ? text : this.resolveComponentChildren(schema);
        return (0, _react.createElement)(Component, props, Children);
    };
    JsonToReact.prototype.resolveComponentChildren = function (schema) {
        return schema.children ? this.parseSchema(schema.children) : undefined;
    };
    return JsonToReact;
}();
exports.default = JsonToReact;
/*
 * Helper method to convert a json object to React Component
 * @param {*} schema
 */

var parseJsonSchema = exports.parseJsonSchema = function parseJsonSchema(schema) {
    var obj = new JsonToReact();
    return obj.parseSchema(schema);
};