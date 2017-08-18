export const AppsTable = {}; // storage for infos about Apps

export const registerApps = (apps) => {
};

export const registerApp = (name, App) => {
	if (name === undefined || name === null) {
		throw new Error(`name cannot be ${name}`);
	}
	AppsTable[name] = {
		name,
		App
	};
};

export const removeApp = (name) => {
	if (name === undefined || name === null) {
		throw new Error(`name cannot be ${name}`);
	}
	if (!AppsTable.hasOwnProperty(name)) {
		throw new Error(`${name}is not registered.`);
	}
	delete AppsTable[name];
};

export const getAppRoutes = () => {
	const appRoutes = [];
	for (const key in AppsTable) {
			// skip loop if the property is from prototype
		if (!AppsTable.hasOwnProperty(key)) continue;

		const app = AppsTable[key].App;
		if (app.routes) {
			appRoutes.push(app.routes());
		}
	}
	return appRoutes;
};
