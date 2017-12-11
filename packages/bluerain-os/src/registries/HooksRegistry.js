import isNil from 'lodash.isnil';

import FilterRegistry from './FilterRegistry';
import EventRegistry from './EventRegistry';

export default class HookRegistry {
	filters:FilterRegistry;
	events:EventRegistry;

	constructor() {
		this.filters = new FilterRegistry();
		this.events = new EventRegistry();
	}
	add(hook:string, filter: Function) {
		if (isNil(hook)) {
			throw new Error(`You are adding an invalid hook:${hook}.`);
		}

		if (isNil(filter)) {
			throw new Error(`You have to provide a filter function while adding it to ${hook}.`);
		}
		this.filters.set(hook, filter);
		this.events.on(hook, filter);
	}
	run(hook:string, mode: 'async' |'sync' | 'both'= 'sync', ...args) {
		if (isNil(hook)) {
			throw new Error(`Hook cannot be ${hook}. Please provide valid hook while running it.`);
		}
		if (mode === 'both') {

			this.filters.run(hook, ...args);
			this.events.emit(hook, ...args);
		} else if (mode === 'sync') {
			this.filters.run(hook, ...args);
		} else if (mode === 'async') {
			this.events.emit(hook, ...args);
		}
	}
}
