const { echo } = require('shelljs');
const { readFileSync, writeFileSync } = require('fs');

let pkg = JSON.parse(readFileSync('package.json') as any);
if (!(typeof pkg.dependencies === 'object')) {
	throw new Error('dependencies section does not exists');
}

if (pkg.dependencies.hasOwnProperty('expo')) {
	delete pkg.dependencies.expo;
	echo('production dependency expo deleted');
}

if (pkg.dependencies.hasOwnProperty('react-native')) {
	delete pkg.dependencies['react-native'];
	echo('production dependency react-native deleted');
}
try {
	writeFileSync('package.json', JSON.stringify(pkg));
	console.log('Modified package.json file', pkg);
	// const pkgLatest = JSON.parse(readFileSync('package.json') as any);
	// console.log('Read after writing the file', pkgLatest);
	echo('package.json file updated');
}
catch (error) {
	echo('Error during package.json file update operation');
}
