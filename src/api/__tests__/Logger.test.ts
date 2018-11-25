// tslint:disable:object-literal-sort-keys

import { BlueBase } from '../../BlueBase';

describe('Logger', () => {

	it('should send "log" data through hook', async () => {
		const BB = new BlueBase();

		const testMessage = 'A log message';
		const testData = { foo: 'bar' };

		await BB.Hooks.register('bluebase.logger.log', {
			name: 'analytics-test',
			handler: (message: string, data: any) => {
				expect(message).toBe(testMessage);
				expect(data).toMatchObject(testData);
			}
		});

		BB.Logger.log(testMessage, testData);
	});

	it('should send "info" data through hook', async () => {
		const BB = new BlueBase();

		const testMessage = 'A info message';
		const testData = { foo: 'bar' };

		await BB.Hooks.register('bluebase.logger.info', {
			name: 'analytics-test',
			handler: (message: string, data: any) => {
				expect(message).toBe(testMessage);
				expect(data).toMatchObject(testData);
			}
		});

		BB.Logger.info(testMessage, testData);
	});

	it('should send "warn" data through hook', async () => {
		const BB = new BlueBase();

		const testMessage = 'A warn message';
		const testData = { foo: 'bar' };

		await BB.Hooks.register('bluebase.logger.warn', {
			name: 'analytics-test',
			handler: (message: string, data: any) => {
				expect(message).toBe(testMessage);
				expect(data).toMatchObject(testData);
			}
		});

		BB.Logger.warn(testMessage, testData);
	});

	it('should send "error" data through hook', async () => {
		const BB = new BlueBase();

		const testMessage = 'A error message';
		const testData = { foo: 'bar' };

		await BB.Hooks.register('bluebase.logger.error', {
			name: 'analytics-test',
			handler: (message: string, data: any) => {
				expect(message).toBe(testMessage);
				expect(data).toMatchObject(testData);
			}
		});

		BB.Logger.error(testMessage, testData);
	});

	it('should send "debug" data through hook', async () => {
		const BB = new BlueBase();

		const testMessage = 'A debug message';
		const testData = { foo: 'bar' };

		await BB.Hooks.register('bluebase.logger.debug', {
			name: 'analytics-test',
			handler: (message: string, data: any) => {
				expect(message).toBe(testMessage);
				expect(data).toMatchObject(testData);
			}
		});

		BB.Logger.debug(testMessage, testData);
	});

});