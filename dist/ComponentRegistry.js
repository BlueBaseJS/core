'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyHoCs = exports.replaceComponent = exports.getRawComponent = exports.populateComponentsApp = exports.getComponent = exports.hasComponent = exports.registerComponent = exports.ComponentsTable = exports.Components = undefined;

var _redux = require('redux');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * Based on vulcanjs.org
                                                                                                                                                                                                     */

// note: at the moment, compose@react-apollo === compose@redux ; see https://github.com/apollostack/react-apollo/blob/master/src/index.ts#L4-L7

var Components = exports.Components = {}; // will be populated on startup (see vulcan:routing)
var ComponentsTable = exports.ComponentsTable = {}; // storage for infos about components

/*
 * Register a Vulcan component with a name, a raw component than can be extended
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
 * ComponentsTable.Foo = {
 *    name: 'Foo',
 *    hocs: [fn1, fn2],
 *    rawComponent: React.Component,
 *    call: () => compose(...hocs)(rawComponent),
 * }
 *
 */
var registerComponent = exports.registerComponent = function registerComponent(name, rawComponent) {
  for (var _len = arguments.length, hocs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    hocs[_key - 2] = arguments[_key];
  }

  // console.log('// registering component');
  // console.log(name);
  // console.log('raw component', rawComponent);
  // console.log('higher order components', hocs);
  if (name === undefined || name === null) {
    throw new Error('name cannot be ' + name);
  }
  // store the component in the table
  ComponentsTable[name] = {
    name: name,
    rawComponent: rawComponent,
    hocs: hocs
  };
};

/*
 * Check if a component is registered with registerComponent(name, component, ...hocs).
 *
 * @param {String} name The name of the component to get.
 * @returns {boolean}
 */
var hasComponent = exports.hasComponent = function hasComponent(name) {
  if (name === undefined || name === null) {
    throw new Error('name cannot be ' + name);
  }
  var component = ComponentsTable[name];
  if (!component) {
    return false;
  }
  return true;
};

/*
 * Get a component registered with registerComponent(name, component, ...hocs).
 *
 * @param {String} name The name of the component to get.
 * @returns {Function|React Component} A (wrapped) React component
 */
var getComponent = exports.getComponent = function getComponent(name) {
  if (name === undefined || name === null) {
    throw new Error('name cannot be ' + name);
  }
  var component = ComponentsTable[name];
  if (!component) {
    throw new Error('Component ' + name + ' not registered.');
  }
  var hocs = component.hocs.map(function (hoc) {
    return Array.isArray(hoc) ? hoc[0](hoc[1]) : hoc;
  });
  return _redux.compose.apply(undefined, _toConsumableArray(hocs))(component.rawComponent);
};

/*
 * Populate the lookup table for components to be callable
 * â„¹ï¸ Called once on app startup
 * */
var populateComponentsApp = exports.populateComponentsApp = function populateComponentsApp() {
  // loop over each component in the list
  Object.keys(ComponentsTable).map(function (name) {
    // populate an entry in the lookup table
    Components[name] = getComponent(name);

    // uncomment for debug
    // console.log('init component:', name);
  });
};

/*
 * Get the **raw** (original) component registered with registerComponent
 * without the possible HOCs wrapping it.
 *
 * @param {String} name The name of the component to get.
 * @returns {Function|React Component} An interchangeable/extendable React component
 */
var getRawComponent = exports.getRawComponent = function getRawComponent(name) {
  return ComponentsTable[name].rawComponent;
};

/*
 * Replace a Vulcan component with the same name with a new component or
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
var replaceComponent = exports.replaceComponent = function replaceComponent(name, newComponent) {
  for (var _len2 = arguments.length, newHocs = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    newHocs[_key2 - 2] = arguments[_key2];
  }

  if (name === undefined || name === null) {
    throw new Error('name cannot be ' + name);
  } else if (!ComponentsTable.hasOwnProperty(name)) {
    throw new Error(name + ' is not registered. Component should be registered to be replaced');
  }
  var previousComponent = ComponentsTable[name];

  // xxx : throw an error if the previous component doesn't exist

  // console.log('// replacing component');
  // console.log(name);
  // console.log(newComponent);
  // console.log('new hocs', newHocs);
  // console.log('previous hocs', previousComponent.hocs);

  return registerComponent.apply(undefined, [name, newComponent].concat(newHocs, _toConsumableArray(previousComponent.hocs)));
};

var copyHoCs = exports.copyHoCs = function copyHoCs(sourceComponent, targetComponent) {
  return _redux.compose.apply(undefined, _toConsumableArray(sourceComponent.hocs))(targetComponent);
};