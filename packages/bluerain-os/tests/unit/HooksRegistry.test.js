import BR from '../../src';

describe('BR.boot func tests', () => {
	it('should add hook', () => {
		BR.Hooks.add('abc', function abc() { console.log('abc'); });
	});
	it('should add hook', () => {
		BR.Hooks.add('abc', function abce() { console.log('abce'); });
	});
	it('should run abc hook', () => {
		BR.Hooks.run('abc', 'both');
	});
});
