import { makeId } from '../Misc';

describe('Utils', () => {

	describe('Misc', () => {

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
				expect(n1.length).toBe(5);
			});

			it('should create a string of 8 chars', async () => {

				const n1 = makeId(8);
				expect(n1.length).toBe(8);
			});

		});
	});
});