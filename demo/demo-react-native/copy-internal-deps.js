// Hello.
//
// React Native doesn't properly support symlinks (or perhaps it does now?), so this
// script will recompile and copy everything over.  It's pretty lame.  But hey, it
// does the job.
//
// Another Awesome Note:  The packager should be stopped before running this script.

const cpx = require('cpx');
const rimraf = require('rimraf');
const fs = require('fs');

const deps = [
	'bluerain-os'
];

deps.forEach(function(dep) {
	
	console.log("Copying " + dep);
	const source = "../../packages/" + dep;
	const destination = "./node_modules/@blueeast/" + dep;

	rimraf.sync(destination);
	fs.mkdirSync(destination);
	cpx.copySync(source+"/package.json", destination);
	const watch = cpx.watch(source+"/dist/**/*", destination+"/dist");

	watch.on("watch-ready", function() {
		console.log("Watching: " + dep);
	});
	
	watch.on("copy", function(e) {
		console.log("Copied - " + dep + ": " + e.srcPath + " -> " + e.dstPath);
	});
	
	watch.on("remove", function(e) {
		console.log("Removed - " + dep + ": " + e.path);
	});
});