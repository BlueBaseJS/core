import React from 'react';
import { AppRegistry, App, buildApp } from '../../src/';

class HelloApp extends App {
	render() {
		return (<div>hello world</div>);
	}
}

const app = buildApp(HelloApp, { appName: 'Hello World' });
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
			expect(() => AppRegistry.remove(undefined)).toThrow();
		});
		it('should throw error b/c name is null', () => {
			expect(() => AppRegistry.remove(null)).toThrow();
		});
		it('should throw error b/c app is not registered.', () => {
			expect(() => AppRegistry.remove('abc')).toThrow();
		});
		it('should have Apps', () => {
			AppRegistry.remove('hello-world');
			expect(AppRegistry.AppsTable.hasOwnProperty('hello')).toEqual(false);
		});
	});
});
