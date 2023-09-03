import { makeId, merge } from '../Misc';

describe('Utils', () => {
	describe('Misc', () => {

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
