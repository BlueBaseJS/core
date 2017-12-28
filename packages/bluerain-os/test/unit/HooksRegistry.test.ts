import BR from '../../src';
// just only to test my code.These are not final tests
describe('BR.boot func tests', () => {
	it('should throw error while adding hook b/c hook invlid', () => {
		expect(() => BR.Hooks.add(undefined, () => {})).toThrow();
	});
	it('should throw error while adding hook b/c hook invlid', () => {
		expect(() => BR.Hooks.add(null, () => {})).toThrow();
	});
	it('should throw error while adding hook b/c function invlid', () => {
		expect(() => BR.Hooks.add('null.hook', undefined)).toThrow();
	});
	it('should throw error while adding hook b/c function invlid', () => {
		expect(() => BR.Hooks.add('null.hook', null)).toThrow();
	});
	it('should add hook', () => {
		BR.Hooks.add('test.hook', function testHook() { console.log('testHook'); });
		expect(BR.Filters.get('test.hook')).toBeDefined();
	});
	it('should add hook', () => {
		BR.Hooks.add('bluerain.hook', function bluerain(value) { return value;  });
		expect(BR.Filters.get('bluerain.hook').size).toEqual(1);
	});
	it('should throw error while running hook b/c hook invlid', () => {
		expect(() => BR.Hooks.run(undefined)).toThrow();
	});
	it('should throw error while running hook b/c mode invlid', () => {
		expect(() => BR.Hooks.run('test.hook', 'anymode')).toThrow();
	});
	it('should run bluerain.hook hook', () => {
		const value = BR.Hooks.run('bluerain.hook', 'both', 1);
		expect(value).toEqual(1);
	});
	it('should run bluerain.hook hook syncronously', () => {
		const value = BR.Hooks.run('bluerain.hook', 'sync', 1);
		expect(value).toEqual(1);
	});
	it('should run test.hook hook asyncronusly', () => {
		BR.Hooks.run('test.hook', 'async');
	});
});
