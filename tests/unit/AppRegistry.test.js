import React from 'react';
import AppRegistry from '../../src/registries/AppRegistry';
import App from '../../src/models/App';

const HelloApp = () => (
  <div>
    hello world
  </div>
  );

const app = new App({ name: 'Hello World', component: HelloApp });
describe('App registry tests', () => {
	describe('register app', () => {
		it('should throw error b/c name is undefined', () => {
			expect(() => AppRegistry.register(undefined)).toThrow();
		});
		it('should throw error b/c name is null', () => {
			expect(() => AppRegistry.register(null)).toThrow();
		});

		it('should have Apps', () => {
			AppRegistry.register( app);
			expect(AppRegistry.AppsTable.hasOwnProperty('hello-world')).toEqual(true);
		});
	});
	describe('remove app', () => {
		it('should throw error b/c name is undefined', () => {
			expect(() => AppRegistry.removeApp(undefined)).toThrow();
		});
		it('should throw error b/c name is null', () => {
			expect(() => AppRegistry.removeApp(null)).toThrow();
		});
		it('should throw error b/c app is not registered.', () => {
			expect(() => AppRegistry.removeApp('abc')).toThrow();
		});
		it('should have Apps', () => {
			AppRegistry.removeApp('hello-world');
			expect(AppRegistry.AppsTable.hasOwnProperty('hello')).toEqual(false);
		});
	});
});
