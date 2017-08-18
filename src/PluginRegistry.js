/* @flow */

export const PluginsTable = {}; // storage for infos about Plugins

export const registerPlugins = (Plugins) => {
};

export const registerPlugin = (name, Plugin) => {
	if (name === undefined || name === null) {
		throw new Error(`Plugin name cannot be ${name}`);
	}
	PluginsTable[name] = {
		Plugin
	};
};

export const removePlugin = (name) => {
	if (name === undefined || name === null) {
		throw new Error(`name cannot be ${name}`);
	}
	if (!PluginsTable.hasOwnProperty(name)) {
		throw new Error(`${name} is not registered.`);
	}
	delete PluginsTable[name];
};

export const initializePlugins = () => {
	for (const key in PluginsTable) {
			// skip loop if the property is from prototype
		if (!PluginsTable.hasOwnProperty(key)) continue;

		const Plugin = PluginsTable[key].Plugin;
		if (Plugin.initialize) {
			Plugin.initialize();
		}
	}
};
