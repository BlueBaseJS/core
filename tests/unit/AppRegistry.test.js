// import AppRegistry from '../../src/registries/AppRegistry';
// const App = require('bluerain-app-hello-world');

// describe('App registry tests', () => {
// 	describe('register app', () => {
// 		it('should throw error b/c name is undefined', () => {
// 			expect(() => registerApp(undefined, App)).toThrow();
// 		});
// 		it('should throw error b/c name is null', () => {
// 			expect(() => registerApp(null, App)).toThrow();
// 		});

// 		it('should have Apps', () => {
// 			registerApp('hello', App);
// 			expect(AppsTable.hasOwnProperty('hello')).to.equal(true);
// 		});
// 	});
// 	describe('remove app', () => {
// 		it('should throw error b/c name is undefined', () => {
// 			expect(() => removeApp(undefined)).toThrow();
// 		});
// 		it('should throw error b/c name is null', () => {
// 			expect(() => removeApp(null)).toThrow();
// 		});
// 		it('should throw error b/c app is not registered.', () => {
// 			expect(() => removeApp('abc')).toThrow();
// 		});
// 		it('should have Apps', () => {
// 			removeApp('hello');
// 			expect(AppsTable.hasOwnProperty('hello')).to.equal(false);
// 		});
// 	});
// });
