import CallbackRegistry from '../../src/registries/CallbackRegistry';
describe('Callbacks test specifications', () => {
	describe('add callback', () => {
		it('should run fine', () => {
			const func = () => undefined;
			CallbackRegistry.add('test.hook', func);
			expect(CallbackRegistry.CallbacksTable['test.hook']).toBeDefined();
		});
		it('should have length 2 of test.hook', () => {
			const two = 2;
			const func1 = prevVal => prevVal + two;

			CallbackRegistry.add('test.hook', func1);

			expect(CallbackRegistry.CallbacksTable['test.hook'].length).toEqual(two);
		});
		it('should add errorhook', () => {
			const func = () => {
				throw new Error('error occured');
			};

			CallbackRegistry.add('error.hook', func);

			expect(CallbackRegistry.CallbacksTable['error.hook'].length).toEqual(1);
		});
		it('should throw error b/c unnamed function ', () => {
			expect(() =>
        CallbackRegistry.add('test.hook', (prevVal) => {
	const number = 2;
	return prevVal + number;
})
      ).toThrow();
		});
		it('should throw error b/c function null', () => {
			expect(() => CallbackRegistry.add('', null)).toThrow();
		});
		it('should throw error b/c function undefined', () => {
			expect(() => CallbackRegistry.add('', undefined)).toThrow();
		});
		it('should throw error b/c hook undefined', () => {
			expect(() =>
        CallbackRegistry.add(undefined, function abc() {
	return 2;
})
      ).toThrow();
		});
	});

	describe('run callback', () => {
		it('should run the error callback and throw error', () => {
			expect(() => CallbackRegistry.run('error.hook')).toThrow();
		});
		it('should run the callback fine', () => {
			const number4 = 4;
			const value = CallbackRegistry.run('test.hook', number4);
			const expectedNumber = 6;
			expect(value).toEqual(expectedNumber);
		});
		it('should be undefined b/c hook undefined', () => {
			expect(() => CallbackRegistry.run(undefined)).toThrow();
		});
		it('should be throw error b/c hook null', () => {
			expect(() => CallbackRegistry.run(null)).toThrow();
		});
		it('should add the input ', () => {
			const value = CallbackRegistry.run('test.hook', 'string');

			expect(value).toEqual('string2');
		});
		it('return the input value because it not added ', () => {
			const value = CallbackRegistry.run('to.be.fail.hook', 'string');

			expect(value).toEqual('string');
		});
	});
	describe('remove callback', () => {
		it('should have length 1 of test.hook', () => {
			CallbackRegistry.remove('test.hook', 'func1');
			expect(CallbackRegistry.CallbacksTable['test.hook'].length).toEqual(1);
		});
		it('should throw error because func1 is not available', () => {
			expect(() => CallbackRegistry.remove('test.hook', 'func1')).toThrow();
		});
		it('should throw error because hook is not available', () => {
			expect(() => CallbackRegistry.remove('hook1', 'func1')).toThrow(
        'hook1  is not added. First add hook to remove it.'
      );
		});
		it('should throw error because hook is null', () => {
			expect(() => CallbackRegistry.remove(null, 'func1')).toThrow(
        'hook cannot be null'
      );
		});
		it('should throw error because hook is undefined', () => {
			expect(() => CallbackRegistry.remove(undefined, 'func1')).toThrow(
        'hook cannot be undefined'
      );
		});
		it('should throw error because function is null', () => {
			expect(() => CallbackRegistry.remove('test.hook', null)).toThrow(
        'callback of test.hook cannot be null'
      );
		});
		it('should throw error because function is undefined', () => {
			expect(() => CallbackRegistry.remove('test.hook', undefined)).toThrow(
        'callback of test.hook cannot be undefined'
      );
		});
	});
  describe('run callback async', () => {
    it('should be undefined b/c hook undefined', () => {
      expect(() => CallbackRegistry.runAsync(undefined)).toThrow();
    });
    it('should be throw error b/c hook null', () => {
      expect(() => CallbackRegistry.runAsync(null)).toThrow();
    });
    it('should run async functions', () => {
      CallbackRegistry.add('async.hook', function abc() { return 1; });
      CallbackRegistry.add('async.hook', function abc2() { /* do some work */ });
      CallbackRegistry.add('async.hook', function abc3() { /* do some work */ });
      CallbackRegistry.add('async.hook', function abc4() { /* do some work */ });
      CallbackRegistry.runAsync('async.hook');
    });
  });
});
