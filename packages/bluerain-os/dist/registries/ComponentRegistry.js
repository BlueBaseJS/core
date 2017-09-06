'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // note: at the moment, compose@react-apollo === compose@redux ; see https://github.com/apollostack/react-apollo/blob/master/src/index.ts#L4-L7


var _redux = require('redux');

require('react');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * All system components are stored in this registry
 * @property {Object} ComponentsTable Storage table of all components
 */
var ComponentRegistry = function () {
	function ComponentRegistry() {
		_classCallCheck(this, ComponentRegistry);

		this.ComponentsTable = {};
	}

	_createClass(ComponentRegistry, [{
		key: 'register',


		/**
   * Register a component with a name, a raw component than can be extended
   * and one or more optional higher order components.
   *
   * @param {String} name The name of the component to register.
   * @param {React Component} rawComponent Interchangeable/extendable component.
   * @param {...Function} hocs The HOCs to compose with the raw component.
   *
   * Note: when a component is registered without higher order component, `hocs` will be
   * an empty array, and it's ok!
   * See https://github.com/reactjs/redux/blob/master/src/compose.js#L13-L15
   *
   * @returns Structure of a component in the list:
   *
   * this.ComponentsTable.Foo = {
   *    name: 'Foo',
   *    hocs: [fn1, fn2],
   *    rawComponent: React.Component,
   *    call: () => compose(...hocs)(rawComponent),
   * }
   *
   */
		value: function register(name, rawComponent) {
			for (var _len = arguments.length, hocs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
				hocs[_key - 2] = arguments[_key];
			}

			if (name === undefined || name === null) {
				throw new Error('name cannot be ' + name);
			}
			// store the component in the table
			this.ComponentsTable[name] = {
				name: name,
				rawComponent: rawComponent,
				hocs: hocs
			};
		}
	}, {
		key: 'addHOCs',
		value: function addHOCs(name) {
			var _ComponentsTable$name;

			if (name === undefined || name === null) {
				throw new Error('name cannot be ' + name);
			}
			if (!Object.prototype.hasOwnProperty.call(this.ComponentsTable, name)) {
				throw new Error('Component ' + name + ' not registered.');
			}
			// store the component in the table

			for (var _len2 = arguments.length, hocs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
				hocs[_key2 - 1] = arguments[_key2];
			}

			(_ComponentsTable$name = this.ComponentsTable[name].hocs).push.apply(_ComponentsTable$name, hocs);
		}

		/**
  * Check if a component is registered with registerComponent(name, component, ...hocs).
  *
  * @param {String} name The name of the component to get.
  * @returns {boolean}
  */

	}, {
		key: 'has',
		value: function has(name) {
			if (name === undefined || name === null) {
				throw new Error('name cannot be ' + name);
			}
			var component = this.ComponentsTable[name];
			if (!component) {
				return false;
			}
			return true;
		}

		/**
   * Get a component registered with registerComponent(name, component, ...hocs).
   *
   * @param {String} name The name of the component to get.
   * @returns {Function|React Component} A (wrapped) React component
   */

	}, {
		key: 'get',
		value: function get(name) {
			if (name === undefined || name === null) {
				throw new Error('name cannot be ' + name);
			}
			var component = this.ComponentsTable[name];
			if (!component) {
				throw new Error('Component ' + name + ' not registered.');
			}
			var hocs = component.hocs.map(function (hoc) {
				return Array.isArray(hoc) ? hoc[0](hoc[1]) : hoc;
			});
			return _redux.compose.apply(undefined, _toConsumableArray(hocs))(component.rawComponent);
		}

		/**
  * Get the **raw** (original) component registered with registerComponent
  * without the possible HOCs wrapping it.
  *
  * @param {String} name The name of the component to get.
  * @returns {Function|React Component} An interchangeable/extendable React component
  */

	}, {
		key: 'getRawComponent',
		value: function getRawComponent(name) {
			return this.ComponentsTable[name].rawComponent;
		}

		/**
  * Replace a component with the same name with a new component or
  * an extension of the raw component and one or more optional higher order components.
  * This function keeps track of the previous HOCs and wrap the new HOCs around previous ones
  *
  * @param {String} name The name of the component to register.
  * @param {React Component} rawComponent Interchangeable/extendable component.
  * @param {...Function} hocs The HOCs to compose with the raw component.
  * @returns {Function|React Component} A component callable with Components[name]
  *
  * Note: when a component is registered without higher order component, `hocs` will be
  * an empty array, and it's ok!
  * See https://github.com/reactjs/redux/blob/master/src/compose.js#L13-L15
  */

	}, {
		key: 'replace',
		value: function replace(name, newComponent) {
			if (name === undefined || name === null) {
				throw new Error('name cannot be ' + name);
			} else if (!Object.prototype.hasOwnProperty.call(this.ComponentsTable, name)) {
				throw new Error(name + ' is not registered. Component should be registered to be replaced');
			}
			var previousComponent = this.ComponentsTable[name];

			// xxx : throw an error if the previous component doesn't exist

			for (var _len3 = arguments.length, newHocs = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
				newHocs[_key3 - 2] = arguments[_key3];
			}

			this.register.apply(this, [name, newComponent].concat(newHocs, _toConsumableArray(previousComponent.hocs)));
		}

		/**
  * [write docs]
  * @param {*} sourceComponent
  * @param {*} targetComponent
  */

	}], [{
		key: 'copyHoCs',
		value: function copyHoCs(sourceComponent, targetComponent) {
			return _redux.compose.apply(undefined, _toConsumableArray(sourceComponent.hocs))(targetComponent);
		}
	}]);

	return ComponentRegistry;
}();

exports.default = ComponentRegistry;