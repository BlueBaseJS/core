import BR from '../../src';
// just only to test my code.These are not final tests
describe('BR.boot func tests', () => {
	it('should add hook', () => {
		BR.Hooks.add('abc', function abc(BR) { console.log('abc', BR); return 1; });
	});
	it('should add hook', () => {
		BR.Hooks.add('abc', function abce(BR, a, b) { console.log('another abc', BR, a, b); });
	});
	it('should run abc hook', () => {
		BR.Hooks.run('abc', 'both', 1);
	});
});
