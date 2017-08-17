'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SystemLayout;

var _JsonSchemaToReact = require('bluerain-client-services/lib/JsonSchemaToReact');

var _Callbacks = require('bluerain-client-services/lib/Callbacks');

function SystemLayout() {
	var schema = {
		component: 'div',
		props: {
			className: 'system-layout'
		},
		children: [{
			component: 'h2',
			text: 'Hello World!'
		}]
	};

	return (0, _JsonSchemaToReact.parseJsonSchema)(schema);
}