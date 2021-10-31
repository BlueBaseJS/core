import { isProduction, makeId, merge } from '../Misc';

declare const global: any;

describe('Utils', () => {
	describe('Misc', () => {
		describe('.isProduction method', () => {
			it('should be false as process is undefined', () => {
				global.process = undefined;

				expect(isProduction()).toBe(false);
			});

			it('should be false as process.env is undefined', () => {
				global.process = {
					env: undefined,
				};

				expect(isProduction()).toBe(false);
			});

			it('should be false as process.env.NODE_ENV is undefined', () => {
				global.process = {
					env: {
						NODE_ENV: undefined,
					},
				};

				expect(isProduction()).toBe(false);
			});

			it('should be false as process.env.NODE_ENV is development', () => {
				global.process = {
					env: {
						NODE_ENV: 'development',
					},
				};

				expect(isProduction()).toBe(false);
			});

			it('should be true as process.env.NODE_ENV is production', () => {
				global.process = {
					env: {
						NODE_ENV: 'production',
					},
				};

				expect(isProduction()).toBe(true);
			});

			it('should be true as __DEV__ is undefined', () => {
				global.process = undefined;
				global.__DEV__ = undefined;

				expect(isProduction()).toBe(true);
			});

			it('should be true as __DEV__ is false', () => {
				global.process = undefined;
				global.__DEV__ = false;

				expect(isProduction()).toBe(true);
			});

			it('should be false as __DEV__ is true', () => {
				global.process = undefined;
				global.__DEV__ = true;

				expect(isProduction()).toBe(false);
			});
		});

		describe('.makeId method', () => {
			it('should create a random string everytime', () => {
				const n1 = makeId();
				const n2 = makeId();
				const n3 = makeId();

				expect(n1 === n2).toBe(false);
				expect(n3 === n2).toBe(false);
				expect(n1 === n3).toBe(false);
			});

			it('should create a string of 5 chars', () => {
				const n1 = makeId();
				expect(n1.length).toBe(8);
			});

			it('should create a string of 8 chars', () => {
				const n1 = makeId(5);
				expect(n1.length).toBe(5);
			});
		});

		describe('.merge method', () => {
			it('should merge 2 objects', () => {
				expect(merge({ foo: 'bar' }, { bar: 'baz', foo: 'fop' } as any)).toMatchObject({
					bar: 'baz',
					foo: 'fop',
				});
			});
		});
	});
});
