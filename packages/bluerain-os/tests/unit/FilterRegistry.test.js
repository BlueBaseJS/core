import BR from '../../src/index';

describe('Filters test specifications', () => {
	describe('add filter', () => {
		it('should run fine', () => {
			const func = () => undefined;
			BR.Filters.add('test.hook', func);
			expect(BR.Filters.FiltersTable['test.hook']).toBeDefined();
		});
		it('should have length 2 of test.hook', () => {
			const two = 2;
			const func1 = prevVal => prevVal + two;

			BR.Filters.add('test.hook', func1);

			expect(BR.Filters.FiltersTable['test.hook'].length).toEqual(two);
		});
		it('should add errorhook', () => {
			const func = () => {
				throw new Error('error occured');
			};

			BR.Filters.add('error.hook', func);

			expect(BR.Filters.FiltersTable['error.hook'].length).toEqual(1);
		});
		it('should throw error b/c unnamed function ', () => {
			expect(() =>
        BR.Filters.add('test.hook', (prevVal) => {
	const number = 2;
	return prevVal + number;
})
      ).toThrow();
		});
		it('should throw error b/c function null', () => {
			expect(() => BR.Filters.add('', null)).toThrow();
		});
		it('should throw error b/c function undefined', () => {
			expect(() => BR.Filters.add('', undefined)).toThrow();
		});
		it('should throw error b/c hook undefined', () => {
			expect(() =>
        BR.Filters.add(undefined, function abc() {
	return 2;
})
      ).toThrow();
		});
	});

	describe('run filter', () => {
		it('should run the error filter and throw error', () => {
			expect(() => BR.Filters.run('error.hook')).toThrow();
		});
		it('should run the filter fine', () => {
			const number4 = 4;
			const value = BR.Filters.run('test.hook', number4);
			const expectedNumber = 6;
			expect(value).toEqual(expectedNumber);
		});
		it('should be undefined b/c hook undefined', () => {
			expect(() => BR.Filters.run(undefined)).toThrow();
		});
		it('should be throw error b/c hook null', () => {
			expect(() => BR.Filters.run(null)).toThrow();
		});
		it('should add the input ', () => {
			const value = BR.Filters.run('test.hook', 'string');

			expect(value).toEqual('string2');
		});
		it('return the input value because it not added ', () => {
			const value = BR.Filters.run('to.be.fail.hook', 'string');

			expect(value).toEqual('string');
		});
	});
	describe('remove filter', () => {
		it('should have length 1 of test.hook', () => {
			BR.Filters.remove('test.hook', 'func1');
			expect(BR.Filters.FiltersTable['test.hook'].length).toEqual(1);
		});
		it('should throw error because func1 is not available', () => {
			expect(() => BR.Filters.remove('test.hook', 'func1')).toThrow();
		});
		it('should throw error because hook is not available', () => {
			expect(() => BR.Filters.remove('hook1', 'func1')).toThrow(
        'hook1  is not added. First add hook to remove it.'
      );
		});
		it('should throw error because hook is null', () => {
			expect(() => BR.Filters.remove(null, 'func1')).toThrow(
        'hook cannot be null'
      );
		});
		it('should throw error because hook is undefined', () => {
			expect(() => BR.Filters.remove(undefined, 'func1')).toThrow(
        'hook cannot be undefined'
      );
		});
		it('should throw error because function is null', () => {
			expect(() => BR.Filters.remove('test.hook', null)).toThrow(
        'filter of test.hook cannot be null'
      );
		});
		it('should throw error because function is undefined', () => {
			expect(() => BR.Filters.remove('test.hook', undefined)).toThrow(
        'filter of test.hook cannot be undefined'
      );
		});
	});
});
