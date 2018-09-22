import { Hook } from '../Hook';
import { isBlueRainModule } from '../../api';
import { DEFAULT_HOOK_PRIORITY } from '../../registries/HookRegistry/defaults';

describe('Models', () => {

	describe('Hook', () => {

		it('should create a new hook with default priority', async () => {
			const hook = new Hook({
				handler: () => { return; },
				name: 'foo',
			});
			expect(hook).toBeTruthy();
			expect(hook.name).toBe('foo');
			expect(hook.priority).toBe(DEFAULT_HOOK_PRIORITY);
			expect(isBlueRainModule(hook.handler)).toBe(true);
		});

		it('should create a new hook with given priority', async () => {
			const hook = new Hook({
				handler: () => { return; },
				name: 'foo',
				priority: 50
			});
			expect(hook).toBeTruthy();
			expect(hook.name).toBe('foo');
			expect(hook.priority).toBe(50);
			expect(isBlueRainModule(hook.handler)).toBe(true);
		});

		it('should throw when a name is not provided to Hook constructor', () => {

			let message = false;

			try {
				const hook = new Hook({
					handler: () => { return; },
				} as any);

				return hook;
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Could not create hook. Reason: A hook name is required.');

			return;
		});

		it('should throw when a handler is not provided to Hook constructor', () => {

			let message = false;

			try {
				const hook = new Hook({
					name: 'foo',
				} as any);

				return hook;
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Could not create hook. Reason: A hook handler function is required.');

			return;
		});

	});

});
