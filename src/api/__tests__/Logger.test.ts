// tslint:disable:object-literal-sort-keys

import { BlueBase } from '../../BlueBase';

describe('Logger', () => {
	it('should send "log" data through hook', async () => {
		const BB = new BlueBase();

		const testMessage = 'A log message';
		const testData = { foo: 'hello' };

		await BB.Filters.register({
			key: 'analytics-test',
			event: 'bluebase.logger.log',
			value: (message: string, data: any) => {
				expect(message).toBe(testMessage);
				expect(data).toMatchObject({ params: [{ foo: 'hello' }] });
			},
		});

		BB.Logger.log(testMessage, testData);
	});

	it('should send "info" data through hook', async () => {
		const BB = new BlueBase();

		const testMessage = 'A info message';
		const testData = { foo: 'hello' };

		await BB.Filters.register({
			key: 'analytics-test',
			event: 'bluebase.logger.log',
			value: (message: string, data: any) => {
				expect(message).toBe(testMessage);
				expect(data).toMatchObject({ params: [{ foo: 'hello' }] });
			},
		});

		BB.Logger.info(testMessage, testData);
	});

	it('should send "warn" data through hook', async () => {
		const BB = new BlueBase();

		const testMessage = 'A warn message';
		const testData = { foo: 'hello' };

		await BB.Filters.register({
			key: 'analytics-test',
			event: 'bluebase.logger.log',
			value: (message: string, data: any) => {
				expect(message).toBe(testMessage);
				expect(data).toMatchObject({ params: [{ foo: 'hello' }] });
			},
		});

		BB.Logger.warn(testMessage, testData);
	});

	it('should send "error" data through hook', async () => {
		const BB = new BlueBase();

		const testMessage = 'A error message';
		const testData = { foo: 'hello' };

		await BB.Filters.register({
			key: 'analytics-test',
			event: 'bluebase.logger.log',
			value: (message: string, data: any) => {
				expect(message).toBe(testMessage);
				expect(data).toMatchObject({ params: [{ foo: 'hello' }] });
			},
		});

		BB.Logger.error(testMessage, testData);
	});

	it('should send "debug" data through hook', async () => {
		const BB = new BlueBase();

		const testMessage = 'A debug message';
		const testData = { foo: 'hello' };

		await BB.Filters.register({
			key: 'analytics-test',
			event: 'bluebase.logger.log',
			value: (message: string, data: any) => {
				expect(message).toBe(testMessage);
				expect(data).toMatchObject({ params: [{ foo: 'hello' }] });
			},
		});

		BB.Logger.debug(testMessage, testData);
	});
});
