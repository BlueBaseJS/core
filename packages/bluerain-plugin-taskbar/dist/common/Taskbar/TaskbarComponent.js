'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _darkBaseTheme = require('material-ui/styles/baseThemes/darkBaseTheme');

var _darkBaseTheme2 = _interopRequireDefault(_darkBaseTheme);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _AppBar = require('material-ui/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _List = require('material-ui/List');

var _List2 = _interopRequireDefault(_List);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _NavItem = require('../Buttons/NavItem');

var _NavItem2 = _interopRequireDefault(_NavItem);

var _Spacer = require('../Buttons/Spacer');

var _Spacer2 = _interopRequireDefault(_Spacer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Renders a taskbar item
 * @param {*} item
 * @param {*} index
 */
function renderItem(item, index) {
  if (item === '->') {
    return _react2.default.createElement(_Spacer2.default, { key: index + '-spacer' });
  } else if (item === '-') {
    return _react2.default.createElement(_Divider2.default, { key: index + '-divider' });
  }
  item.leftIcon = item.icon;
  item.primaryText = item.label;
  return _react2.default.createElement(_NavItem2.default, _extends({ key: index + '-nav-item' }, item));
}

var TaskbarComponent = function TaskbarComponent(props) {
  var items = props.items,
      hideLabels = props.hideLabels,
      logo = props.logo,
      title = props.title,
      rest = _objectWithoutProperties(props, ['items', 'hideLabels', 'logo', 'title']);

  var theme = (0, _getMuiTheme2.default)(_darkBaseTheme2.default);
  return _react2.default.createElement(
    _MuiThemeProvider2.default,
    { muiTheme: theme },
    _react2.default.createElement(
      _Paper2.default,
      { rounded: false, style: { display: 'flex', flexDirection: 'column', height: '100%' } },
      _react2.default.createElement(_AppBar2.default, {
        title: title,
        iconElementLeft: logo
      }),
      _react2.default.createElement(
        _List2.default,
        _extends({}, rest, { style: { display: 'flex', flexDirection: 'column', flexGrow: 1 } }),
        items.map(function (item, index) {
          if (typeof item !== 'string') {
            item.hideLabel = hideLabels;
          }

          return renderItem(item, index);
        })
      )
    )
  );
};

TaskbarComponent.defaultProps = {
  items: [],
  hideLabels: true
};

exports.default = TaskbarComponent;