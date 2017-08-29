import React from 'react';
import AppRegistry from '../../src/registries/AppRegistry';
import App from '../../src/models/App';
import   ConfigRegistry from '../../src/registries/ConfigRegistry';
import   FilterRegistry from '../../src/registries/FilterRegistry';

class HelloApp extends App {
	static appName = 'Hello World';
	render() {
		return <div>hello world</div>;
	}
}

describe('App registry tests', () => {
	it('App should be defined', () => {
		expect(HelloApp).toBeDefined();
	});

  // tests for registering apps
	describe('register app', () => {
		it('should throw error b/c appname is not given', () => {
			class HelloAppWithoutName extends App {
				render() {
					return <div>hello world</div>;
				}
      }
			expect(() => AppRegistry.register(HelloAppWithoutName)).toThrow(
        'App name not provided.'
      );
		});
		it('slug should be abc-app', () => {
			class TestApp extends App {
				static appName = 'Hello World';
				static slug = 'abc-app';
				render() {
					return <div>hello world</div>;
				}
      }
			AppRegistry.register(TestApp);
			expect(
        Object.prototype.hasOwnProperty.call(AppRegistry.AppsTable, 'abc-app')
      ).toEqual(true);
			expect(AppRegistry.AppsTable['abc-app'].slug).toEqual('abc-app');
		});
		it('slug should be hello-world', () => {
			AppRegistry.register(HelloApp);
			expect(
        Object.prototype.hasOwnProperty.call(
          AppRegistry.AppsTable,
          'hello-world'
        )
      ).toEqual(true);
			expect(AppRegistry.AppsTable['hello-world'].slug).toEqual('hello-world');
		});
		it('should throw error b/c name is undefined', () => {
			expect(() => AppRegistry.register(undefined)).toThrow();
		});
		it('should throw error b/c App name is no given', () => {
			class HelloAppNOName extends App {
				render() {
					return <div>hello world</div>;
				}
      }
			expect(() => AppRegistry.register(HelloAppNOName)).toThrow();
		});
		it('should throw error b/c name is null', () => {
			expect(() => AppRegistry.register(null)).toThrow();
		});
		it('slug Create other recognized static properties', () => {
			const app = AppRegistry.AppsTable['hello-world'];
			expect(app.slug).toEqual('hello-world');
			expect(app.path).toEqual('/app/hello-world');
			expect(app.appRoutePrefix).toEqual('/app');
		});
	});

  // tests for creating app by using React.component
	describe('Tests for app by extending React Component', () => {
		class HelloReactApp extends React.Component {
			static appName = 'Hello React World';
			render() {
				return <div>hello world</div>;
			}
    }
		it('App should be defined', () => {
			expect(HelloReactApp).toBeDefined();
		});
		it('should throw error b/c appname is not given', () => {
			class HelloAppWithoutName extends React.Component {
				render() {
					return <div>hello world</div>;
				}
      }
			expect(() => AppRegistry.register(HelloAppWithoutName)).toThrow(
        'App name not provided.'
      );
		});
		it('slug should be abc-react-app', () => {
			class TestApp extends React.Component {
				static appName = 'Hello World';
				static slug = 'abc-react-app';
				render() {
					return <div>hello world</div>;
				}
      }
			AppRegistry.register(TestApp);
			expect(
        Object.prototype.hasOwnProperty.call(
          AppRegistry.AppsTable,
          'abc-react-app'
        )
      ).toEqual(true);
			expect(AppRegistry.AppsTable['abc-react-app'].slug).toEqual(
        'abc-react-app'
      );
		});
		it('slug should be hello-react-world', () => {
			AppRegistry.register(HelloReactApp);
			expect(
        Object.prototype.hasOwnProperty.call(
          AppRegistry.AppsTable,
          'hello-react-world'
        )
      ).toEqual(true);
			expect(AppRegistry.AppsTable['hello-react-world'].slug).toEqual(
        'hello-react-world'
      );
		});
		it('slug Create other recognized static properties', () => {
			const app = AppRegistry.AppsTable['hello-react-world'];
			expect(app.slug).toEqual('hello-react-world');
			expect(app.path).toEqual('/app/hello-react-world');
			expect(app.appRoutePrefix).toEqual('/app');
		});
	});

  // tests for creating app stateless function.
	describe('Tests for by creating a stateless functional react component', () => {
		const HellostatelessApp = () => <div>hello world</div>;
		HellostatelessApp.appName = 'Hello stateless app';
		it('App should be defined', () => {
			expect(HellostatelessApp).toBeDefined();
		});
		it('should throw error b/c appname is not given', () => {
			const HelloAppWithoutName = () => <div>hello world</div>;
			expect(() => AppRegistry.register(HelloAppWithoutName)).toThrow(
        'App name not provided.'
      );
		});
		it('slug should be abc-stateless-app', () => {
			const TestApp = () => <div>hello world</div>;
			TestApp.appName = 'Hello World';
			TestApp.slug = 'abc-stateless-app';
			AppRegistry.register(TestApp);
			expect(
        Object.prototype.hasOwnProperty.call(
          AppRegistry.AppsTable,
          'abc-stateless-app'
        )
      ).toEqual(true);
			expect(AppRegistry.AppsTable['abc-stateless-app'].slug).toEqual(
        'abc-stateless-app'
      );
		});
		it('slug should be hello-stateless-app', () => {
			AppRegistry.register(HellostatelessApp);
			expect(
        Object.prototype.hasOwnProperty.call(
          AppRegistry.AppsTable,
          'hello-stateless-app'
        )
      ).toEqual(true);
			expect(AppRegistry.AppsTable['hello-stateless-app'].slug).toEqual(
        'hello-stateless-app'
      );
		});
		it('slug Create other recognized static properties', () => {
			const app = AppRegistry.AppsTable['hello-stateless-app'];
			expect(app.slug).toEqual('hello-stateless-app');
			expect(app.path).toEqual('/app/hello-stateless-app');
			expect(app.appRoutePrefix).toEqual('/app');
		});
	});
	describe('all apps', () => {
		it('return all apps', () => {
			const apps = AppRegistry.getApps();
			expect(Object.keys(apps).length).toEqual(6);
		});
	});
	describe('initialize apps', () => {
		it('should initialize all apps', () => {
			class HelloReactApp extends App {
				static appName = 'Hello React World';
				render() {
					return <div>hello world</div>;
				}
				static initialize() {}
      }
			AppRegistry.register(HelloReactApp);
			AppRegistry.initializeAll();
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
		it('should have App with slug', () => {
			AppRegistry.remove('hello-react-world');
			expect(AppRegistry.AppsTable.hasOwnProperty('hello-react-world')).toEqual(
        false
      );
		});
		it('should have Apps', () => {
			AppRegistry.remove('hello-world');
			expect(AppRegistry.AppsTable.hasOwnProperty('hello-world')).toEqual(
        false
      );
			AppRegistry.AppsTable = {};
		});
	});

	describe('register many app', () => {
		it('should throw error b/c app is not array', () => {
			expect(() => AppRegistry.registerMany({})).toThrow();
		});
		it('should be empty', () => {
			AppRegistry.registerMany();
			expect(AppRegistry.AppsTable).toEqual({});
		});
		it('should throw error b/c errornous apps', () => {
			expect(() => AppRegistry.registerMany([HelloApp,  'string', {}])).toThrow('App name not provided.');
		});
		it('should have hello world app', () => {
			class TestApp extends React.Component {
				static appName = 'Hello World';
				static slug = 'abc-react-app';
				render() {
					return <div>hello world</div>;
				}
            }
			AppRegistry.registerMany([HelloApp, TestApp]);
			const apps = AppRegistry.getApps();
			expect(Object.keys(apps).length).toEqual(2);
		});
	});

	describe('initialize apps', () => {
		it('should initialize all apps', () => {
			ConfigRegistry.set('apps.hello-react-world', '3');
			class HelloReactApp extends App {
				static appName = 'Hello React World';
				render() {
					return <div>hello world</div>;
				}
				static initialize(config) {
					FilterRegistry.add('test.initialize.hook', function abc() { return config + 34; });
				}
       }
			AppRegistry.register(HelloReactApp);
			AppRegistry.initializeAll();
			expect(FilterRegistry.run('test.initialize.hook')).toEqual('334');
		});
	});
	describe('get component schema', () => {
		it('should throw error b/c app is not array', () => {
			const schema = AppRegistry.getComponentSchema();
			expect(schema[0].props.path).toEqual('/app/hello-world');
		});
	});
});
