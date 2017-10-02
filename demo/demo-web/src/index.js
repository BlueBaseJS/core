/*
* This file demonstrates using BlueRain Client on web
*/
const BR = require('@blueeast/bluerain-os').default;

const apps = require('./apps');
const config = require('./config');
const plugins = require('./plugins');

const bootOptions = {
	apps,
	config,
	plugins
};

console.time('BlueRain Booted');
BR.boot(bootOptions);
console.timeEnd('BlueRain Booted');

console.log('BlueRain Booted!', BR);
