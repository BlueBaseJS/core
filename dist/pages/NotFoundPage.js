'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var pageStyle = _index2.default.Utils.createStyleSheet.create({
        justifyContent: 'center',
        padding: 20
    }, 'View');
    var titleStyle = _index2.default.Utils.createStyleSheet.create({
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: 'rgb(220,53,69)',
        borderColor: 'rgb(220,53,69)',
        borderRadius: 10,
        borderWidth: 1,
        color: '#fff',
        fontSize: 68,
        marginBottom: 20,
        padding: 20,
        shadowOffset: { height: 5, width: 0 },
        shadowRadius: 15,
        shadowColor: 'rgba(0,0,0,.3)'
    }, 'Text');
    var subTitleStyle = _index2.default.Utils.createStyleSheet.create({
        textAlign: 'center',
        color: 'rgb(150, 150, 150)',
        marginBottom: 20,
        overflow: 'initial'
    }, 'Text');
    var schema = {
        component: 'Page',
        props: { style: pageStyle },
        children: [{
            component: 'View',
            children: [{
                props: { style: titleStyle },
                component: 'Text',
                text: '404'
            }]
        }, {
            component: 'Text',
            props: { style: subTitleStyle },
            text: 'Page not found!'
        }]
    };
    return (0, _JsonSchemaToReact.parseJsonSchema)(schema);
};

var _JsonSchemaToReact = require('../utils/JsonSchemaToReact');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
/**
 * Returns the 404 Page layout.
 *
 * @returns {React.Component} The layout react component
 */