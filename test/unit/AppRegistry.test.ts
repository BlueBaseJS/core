import AppRegistry from '../../src/registries/AppRegistry';

// just only to test my code.These are not final tests
describe('AppRegistry Unit Tests', () => {
	it('will not throw error', () => {
		expect(() => {
			const appRegistry = new AppRegistry();
			appRegistry.set('APP', () => 'APP');
		}).toThrowError();
	});
});
