import FilterRegistry from '../../src/registries/FilterRegistry';
describe('Filters test specifications', () => {
	describe('add filter', () => {
		it('should run fine', () => {
			const func = () => undefined;
			FilterRegistry.add('test.hook', func);
			expect(FilterRegistry.FiltersTable['test.hook']).toBeDefined();
		});
		it('should have length 2 of test.hook', () => {
			const two = 2;
			const func1 = prevVal => prevVal + two;

			FilterRegistry.add('test.hook', func1);

			expect(FilterRegistry.FiltersTable['test.hook'].length).toEqual(two);
		});
		it('should add errorhook', () => {
			const func = () => {
				throw new Error('error occured');
			};

			FilterRegistry.add('error.hook', func);

			expect(FilterRegistry.FiltersTable['error.hook'].length).toEqual(1);
		});
		it('should throw error b/c unnamed function ', () => {
			expect(() =>
        FilterRegistry.add('test.hook', (prevVal) => {
	const number = 2;
	return prevVal + number;
})
      ).toThrow();
		});
		it('should throw error b/c function null', () => {
			expect(() => FilterRegistry.add('', null)).toThrow();
		});
		it('should throw error b/c function undefined', () => {
			expect(() => FilterRegistry.add('', undefined)).toThrow();
		});
		it('should throw error b/c hook undefined', () => {
			expect(() =>
        FilterRegistry.add(undefined, function abc() {
	return 2;
})
      ).toThrow();
		});
	});

	describe('run filter', () => {
		it('should run the error filter and throw error', () => {
			expect(() => FilterRegistry.run('error.hook')).toThrow();
		});
		it('should run the filter fine', () => {
			const number4 = 4;
			const value = FilterRegistry.run('test.hook', number4);
			const expectedNumber = 6;
			expect(value).toEqual(expectedNumber);
		});
		it('should be undefined b/c hook undefined', () => {
			expect(() => FilterRegistry.run(undefined)).toThrow();
		});
		it('should be throw error b/c hook null', () => {
			expect(() => FilterRegistry.run(null)).toThrow();
		});
		it('should add the input ', () => {
			const value = FilterRegistry.run('test.hook', 'string');

			expect(value).toEqual('string2');
		});
		it('return the input value because it not added ', () => {
			const value = FilterRegistry.run('to.be.fail.hook', 'string');

			expect(value).toEqual('string');
		});
	});
	describe('remove filter', () => {
		it('should have length 1 of test.hook', () => {
			FilterRegistry.remove('test.hook', 'func1');
			expect(FilterRegistry.FiltersTable['test.hook'].length).toEqual(1);
		});
		it('should throw error because func1 is not available', () => {
			expect(() => FilterRegistry.remove('test.hook', 'func1')).toThrow();
		});
		it('should throw error because hook is not available', () => {
			expect(() => FilterRegistry.remove('hook1', 'func1')).toThrow(
        'hook1  is not added. First add hook to remove it.'
      );
		});
		it('should throw error because hook is null', () => {
			expect(() => FilterRegistry.remove(null, 'func1')).toThrow(
        'hook cannot be null'
      );
		});
		it('should throw error because hook is undefined', () => {
			expect(() => FilterRegistry.remove(undefined, 'func1')).toThrow(
        'hook cannot be undefined'
      );
		});
		it('should throw error because function is null', () => {
			expect(() => FilterRegistry.remove('test.hook', null)).toThrow(
        'filter of test.hook cannot be null'
      );
		});
		it('should throw error because function is undefined', () => {
			expect(() => FilterRegistry.remove('test.hook', undefined)).toThrow(
        'filter of test.hook cannot be undefined'
      );
		});
	});
	describe('run filter async', () => {
		it('should be undefined b/c hook undefined', () => {
			expect(() => FilterRegistry.runAsync(undefined)).toThrow();
		});
		it('should be throw error b/c hook null', () => {
			expect(() => FilterRegistry.runAsync(null)).toThrow();
		});
		it('should run async functions', () => {
			FilterRegistry.add('async.hook', function abc() {
				return 1;
			});
			FilterRegistry.add('async.hook', function abc2() {
        /* do some work */
			});
			FilterRegistry.add('async.hook', function abc3() {
        /* do some work */
			});
			FilterRegistry.add('async.hook', function abc4() {
        /* do some work */
			});
			FilterRegistry.runAsync('async.hook');
		});
	});
});
