import { BlueBaseModule, getDefiniteBlueBaseModule } from '../utils';
import { HookHandlerFn, HookInput } from '../registries/HookRegistry/types';
import { DEFAULT_HOOK_PRIORITY } from '../registries/HookRegistry/defaults';
import isNil from 'lodash.isnil';

export class Hook {

	/** Name of the listener, used as an ID */
	public name: string;

	/**
	 * Priority of exeuction.
	 *
	 * @default 10
	 */
	public priority: number;

	/** Handler function */
	public handler: BlueBaseModule<HookHandlerFn>;

	constructor({ name, priority, handler }: HookInput) {

		if (!name) {
			throw Error('Could not create hook. Reason: A hook name is required.');
		}

		if (!handler) {
			throw Error('Could not create hook. Reason: A hook handler function is required.');
		}

		this.name = name;
		this.priority = !isNil(priority) ? priority : DEFAULT_HOOK_PRIORITY;
		this.handler = getDefiniteBlueBaseModule(handler);
	}
}