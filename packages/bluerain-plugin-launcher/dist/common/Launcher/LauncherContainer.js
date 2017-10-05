'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _bluerainOs = require('@blueeast/bluerain-os');

var _folder = require('material-ui/svg-icons/file/folder');

var _folder2 = _interopRequireDefault(_folder);

var _Bulb = require('../icons/Bulb.component');

var _Bulb2 = _interopRequireDefault(_Bulb);

var _LauncherComponent = require('./LauncherComponent');

var _LauncherComponent2 = _interopRequireDefault(_LauncherComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var forEach = require('lodash.foreach');

// const styles = {
// 	root: {
// 		display: 'flex',
// 		flexWrap: 'wrap',
// 		justifyContent: 'space-around',
// 	},
// 	gridList: {
// 		marginTop: 20,
// 	},
// };

var appListData = [];

var Container = function (_React$Component) {
	_inherits(Container, _React$Component);

	function Container() {
		_classCallCheck(this, Container);

		return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).apply(this, arguments));
	}

	_createClass(Container, [{
		key: 'render',
		value: function render() {
			var BR = this.props.bluerain;
			appListData = [];
			Container.populateAppsList(BR.Apps.AppsTable);
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(_LauncherComponent2.default, { Apps: appListData })
			);
		}
	}], [{
		key: 'populateAppsList',
		value: function populateAppsList(appsList) {
			forEach(appsList, function (app, key) {
				appListData.push({
					icon: app.appIcon || _Bulb2.default,
					appName: app.appName,
					backgroundColors: app.iconColor ? [app.iconColor] : ['purple'],
					link: app.path
				});
			});
		}
	}]);

	return Container;
}(_react2.default.Component);

exports.default = (0, _bluerainOs.withBlueRain)(Container);