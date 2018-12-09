import { isProduction, makeId } from '../Misc';

declare const global: any;

describe('Utils', () => {

	describe('Misc', () => {

		describe('.isProduction method', () => {

			it('should be false as process is undefined', async () => {

				global.process = undefined;

				expect(isProduction()).toBe(false);
			});

			it('should be false as process.env is undefined', async () => {

				global.process = {
					env: undefined
				};

				expect(isProduction()).toBe(false);
			});

			it('should be false as process.env.NODE_ENV is undefined', async () => {

				global.process = {
					env: {
						NODE_ENV: undefined
					}
				};

				expect(isProduction()).toBe(false);
			});

			it('should be false as process.env.NODE_ENV is development', async () => {

				global.process = {
					env: {
						NODE_ENV: 'development'
					}
				};

				expect(isProduction()).toBe(false);
			});

			it('should be true as process.env.NODE_ENV is production', async () => {

				global.process = {
					env: {
						NODE_ENV: 'production'
					}
				};

				expect(isProduction()).toBe(true);
			});

			it('should be true as __DEV__ is undefined', async () => {

				global.process = undefined;
				global.__DEV__ = undefined;

				expect(isProduction()).toBe(true);
			});

			it('should be true as __DEV__ is false', async () => {

				global.process = undefined;
				global.__DEV__ = false;

				expect(isProduction()).toBe(true);
			});

			it('should be false as __DEV__ is true', async () => {

				global.process = undefined;
				global.__DEV__ = true;

				expect(isProduction()).toBe(false);
			});

		});

		describe('.makeId method', () => {

			it('should create a random string everytime', async () => {

				const n1 = makeId();
				const n2 = makeId();
				const n3 = makeId();

				expect(n1 === n2).toBe(false);
				expect(n3 === n2).toBe(false);
				expect(n1 === n3).toBe(false);
			});

			it('should create a string of 5 chars', async () => {

				const n1 = makeId();
				expect(n1.length).toBe(8);
			});

			it('should create a string of 8 chars', async () => {

				const n1 = makeId(5);
				expect(n1.length).toBe(5);
			});

		});
	});
});