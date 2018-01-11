'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _JsonSchemaToReact = require('../utils/JsonSchemaToReact');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the Index Page layout.
 *
 * @returns {React.Component} The layout react component
 */
var IndexPage = function IndexPage(props) {
    var pageStyle = _index2.default.Utils.createStyleSheet.create({
        justifyContent: 'center',
        padding: 20
    }, 'View');
    var titleStyle = _index2.default.Utils.createStyleSheet.create({
        alignSelf: 'center',
        backgroundColor: 'rgba(0,123,255,1)',
        borderColor: 'rgba(0,123,255,1)',
        borderRadius: 10,
        borderWidth: 1,
        color: '#fff',
        textAlign: 'center',
        fontSize: 68,
        marginBottom: 20,
        padding: 20,
        shadowOffset: { height: 5, width: 0 },
        shadowRadius: 15,
        shadowColor: 'rgba(0,0,0,.3)'
    }, 'Text');
    var subTitleStyle = _index2.default.Utils.createStyleSheet.create({
        color: 'rgb(150, 150, 150)',
        marginBottom: 20,
        textAlign: 'center'
    }, 'Text');
    var schema = {
        component: 'Page',
        props: { style: pageStyle },
        children: [{
            component: 'View',
            children: [{
                component: 'Text',
                props: { style: titleStyle },
                text: 'BR'
            }]
        }, {
            component: 'Text',
            props: { style: subTitleStyle },
            text: 'Welcome to BlueRain OS!'
        }]
    };
    return (0, _JsonSchemaToReact.parseJsonSchema)(schema);
};
exports.default = IndexPage;