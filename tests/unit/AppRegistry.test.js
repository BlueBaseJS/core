import React from 'react';
import AppRegistry from '../../src/registries/AppRegistry';
import App from '../../src/App/App';
import buildApp from '../../src/App/buildApp';

class HelloApp extends App {
	render() {
		return <div>hello world</div>;
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
			AppRegistry.register(app);
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
			expect(AppRegistry.AppsTable.hasOwnProperty('hello-world')).toEqual(
        false
      );
		});
	});
	describe('register many app', () => {
		it('should throw error b/c app is not array', () => {
			expect(() => AppRegistry.registerMany({})).toThrow();
		});
		it('should have hello world app', () => {
			AppRegistry.registerMany();
			expect(AppRegistry.AppsTable).toEqual({});
		});
		it('should have hello world app', () => {
			AppRegistry.registerMany([app]);
			expect(AppRegistry.AppsTable.hasOwnProperty('hello-world')).toEqual(true);
		});
	});
	describe('get component schema', () => {
		it('should throw error b/c app is not array', () => {
			const schema = AppRegistry.getComponentSchema();
			expect(schema.children[0].props.path).toEqual('/app/hello-world');
		});
	});
});
