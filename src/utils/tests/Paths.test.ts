import { joinPaths } from '../Paths';

describe('Utils', () => {
	describe('Paths', () => {
		describe('.joinPaths method', () => {
			it('should return empty string as is', () => {
				expect(joinPaths('')).toBe('');
			});

			it('should return single slash string as is', () => {
				expect(joinPaths('/')).toBe('');
			});

			it('should return merge 2 paths', () => {
				expect(joinPaths('a', 'b')).toBe('a/b');
			});

			it('should remove extra slashes', () => {
				expect(joinPaths('a///b')).toBe('a/b');
				expect(joinPaths('a//', '/b')).toBe('a/b');
			});
		});
	});
});
