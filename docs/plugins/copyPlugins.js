var path = require('path');
var fs = require('fs-extra');

const plugins = [
	'apollo',
	'intl',
	'react-router',
	'redux',
	'redux-devtools'
]

plugins.forEach(function(plugin) {
	
	console.log("Copying " + plugin + " plugin docs");
	const source = path.resolve(__dirname,'../../packages/bluerain-plugin-' + plugin + '/README.md')
	const destination = path.resolve(__dirname, plugin + '.md')
	
	fs.copySync(source, destination);
});