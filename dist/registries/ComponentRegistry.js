'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash.compose');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isnil');

var _lodash4 = _interopRequireDefault(_lodash3);

var _MapRegistry = require('./MapRegistry');

var _MapRegistry2 = _interopRequireDefault(_MapRegistry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();

/**
 * All system components are stored in this registry
 * @property {Map<string, {rawComponent: ReactElement<*>, hocs: Array<Function | Array<any>>}>} data Storage of all
 *  components
 */
var ComponentRegistry = /** @class */function (_super) {
    __extends(ComponentRegistry, _super);
    // data: Map<string, ComponentRegistryItem>;
    function ComponentRegistry() {
        return _super.call(this, 'ComponentRegistry') || this;
    }
    /**
     * Register a component with a name, a raw component than can be extended
     * and one or more optional higher order components.To be deprecated in 2.0.0
     *
     * @param {String} name The name of the component to register.
     * @param {ReactElement<*>} rawComponent Interchangeable/extendable component.
     * @param {Array<ComponentRegistryHocItem>} hocs The HOCs to compose with the raw component.
     *
     */
    ComponentRegistry.prototype.register = function (name, rawComponent) {
        var hocs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            hocs[_i - 2] = arguments[_i];
        }
        console.warn('Deprecation Warning: "register" method of ComponentRegistry has been deprecated.', ' Please use "set" method instead.');
        this.set.apply(this, [name, rawComponent].concat(hocs));
    };
    /**
     * Register a component with a name, a raw component than can be extended
     * and one or more optional higher order components.
     *
     * @param {String} name The name of the component to register.
     * @param {ReactElement<*>} rawComponent Interchangeable/extendable component.
     * @param {Array<ComponentRegistryHocItem>} hocs The HOCs to compose with the raw component.
     *
     * Note: when a component is registered without higher order component, `hocs` will be
     * an empty array, and it's ok!
     * See https://lodash.com/docs/4.17.4#flowRight
     *
     *
     */
    ComponentRegistry.prototype.set = function (name, rawComponent) {
        var hocs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            hocs[_i - 2] = arguments[_i];
        }
        if ((0, _lodash4.default)(name)) {
            throw new Error("Component name cannot be " + name + ". Please provide valid name while adding component");
        }
        if ((0, _lodash4.default)(rawComponent)) {
            throw new Error('rawComponent is required to register a component.' + 'Please provide valid component while adding component');
        }
        _super.prototype.set.call(this, name, { rawComponent: rawComponent, hocs: hocs });
    };
    /**
     * Adds higher order component to the registered component
     * @param {string} name The name of the registered component to whom hocs are to added
     * @param {Array<ComponentRegistryHocItem>} hocs The HOCs to compose with the raw component.
     */
    ComponentRegistry.prototype.addHocs = function (name) {
        var hocs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            hocs[_i - 1] = arguments[_i];
        }
        if ((0, _lodash4.default)(name)) {
            throw new Error("Component name cannot be " + name + ". Please provide valid name while adding Hocs");
        }
        if (!this.has(name)) {
            throw new Error("Component " + name + " not registered.Please register component before adding Hocs");
        }
        var item = _super.prototype.get.call(this, name);
        (_a = item.hocs).push.apply(_a, hocs);
        this.data = this.data.set(name, item);
        var _a;
    };
    /**
     * Get a component registered with set(name, component, ...hocs).
     * Its accepts multiple component names.It iterates arguments and returns first found registered component.
     *
     * @param {String} name The name of the component to get.
     * @returns {Function|ReactElement<*>} A (wrapped) React component
     */
    ComponentRegistry.prototype.get = function () {
        var name = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            name[_i] = arguments[_i];
        }
        if ((0, _lodash4.default)(name)) {
            throw new Error("Component name cannot be " + name.toString() + ".Please provide valid name while getting component");
        }
        var component;
        for (var _a = 0, name_1 = name; _a < name_1.length; _a++) {
            var componentName = name_1[_a];
            if (this.has(componentName)) {
                component = this.data.get(componentName);
                break;
            }
        }
        if (!component) {
            throw new Error("None of components " + name.toString() + " are registered.");
        }
        var hocs = component.hocs.map(function (hoc) {
            return Array.isArray(hoc) ? hoc[0](hoc[1]) : hoc;
        });
        return _lodash2.default.apply(void 0, hocs)(component.rawComponent);
    };
    /**
     * Get the **raw** (original) component registered with registerComponent
     * without the possible HOCs wrapping it.
     *
     * @param {String} name The name of the component to get.
     * @returns {Function|ReactElement<*>} An interchangeable/extendable React component
     */
    ComponentRegistry.prototype.getRawComponent = function (name) {
        if ((0, _lodash4.default)(name)) {
            throw new Error("Component name cannot be " + name + ".Please provide valid name while getting raw component");
        }
        if (!this.has(name)) {
            throw new Error("Component " + name + " not registered. Please register component before getting raw component");
        }
        var component = _super.prototype.get.call(this, name);
        return component.rawComponent;
    };
    /**
     * Replace a component with the same name with a new component or
     * an extension of the raw component and one or more optional higher order components.
     * This function keeps track of the previous HOCs and wrap the new HOCs around previous ones
     *
     * @param {String} name The name of the component to register.
     * @param {ReactElement<*>} rawComponent Interchangeable/extendable component.
     * @param {...Function} hocs The HOCs to compose with the raw component.
     * @returns {Function|ReactElement<*>} A component callable with Components[name]
     *
     * Note: when a component is registered without higher order component, `hocs` will be
     * an empty array, and it's ok!
     * See https://lodash.com/docs/4.17.4#flowRight
     */
    ComponentRegistry.prototype.replace = function (name, newComponent) {
        var newHocs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            newHocs[_i - 2] = arguments[_i];
        }
        if ((0, _lodash4.default)(name)) {
            throw new Error("Component name cannot be " + name + ".Please valid component name while replacing it");
        }
        if (!this.has(name)) {
            throw new Error("Component " + name + " not registered.Please register component before replacing it");
        }
        var previousComponent = _super.prototype.get.call(this, name);
        var hocs = newHocs.concat(previousComponent.hocs);
        _super.prototype.replace.call(this, name, { rawComponent: newComponent, hocs: hocs });
    };
    return ComponentRegistry;
}(_MapRegistry2.default);
exports.default = ComponentRegistry;