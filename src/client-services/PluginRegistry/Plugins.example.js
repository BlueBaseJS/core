import Plugin from '../../Plugin';
import { addCallback, runCallbacks } from '../../Callbacks';

class AddPlugin extends Plugin {
	initialize() {
		addCallback('plugin.add', num => num + 1);
		addCallback('plugin.add', num => num + 5);
		addCallback('plugin.add', num => num + 3);
	}
}

class SubtractPlugin extends Plugin {
	initialize() {
		addCallback('plugin.subtract', num => num - 1);
		addCallback('plugin.subtract', num => num - 2);
		addCallback('plugin.subtract', num => num - 3);
	}
}


export const calback = () => {
	const addObj = new AddPlugin();
	addObj.initialize();
	const subObj = new SubtractPlugin();
	subObj.initialize();
	console.log(runCallbacks('plugin.add', 2));
	console.log(runCallbacks('plugin.subtract', 2));
};
