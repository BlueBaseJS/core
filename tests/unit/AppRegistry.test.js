import React from 'react';
import AppRegistry from '../../src/registries/AppRegistry';
import App from '../../src/models/App';

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
		it('should throw error b/c name is null', () => {
			expect(() => AppRegistry.register(null)).toThrow();
		});
	});
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
        Object.prototype.hasOwnProperty.call(AppRegistry.AppsTable, 'abc-react-app')
      ).toEqual(true);
			expect(AppRegistry.AppsTable['abc-react-app'].slug).toEqual('abc-react-app');
		});
		it('slug should be hello-react-world', () => {
			AppRegistry.register(HelloReactApp);
			expect(
        Object.prototype.hasOwnProperty.call(
          AppRegistry.AppsTable,
          'hello-react-world'
        )
      ).toEqual(true);
			expect(AppRegistry.AppsTable['hello-react-world'].slug).toEqual('hello-react-world');
		});
	});
	describe('Tests for by creating a stateless functional react component', () => {
		const HelloReactApp =()=> {
			// static appName = 'Hello React World';
				return <div>hello world</div>;
    }
		it('App should be defined', () => {
			expect(HelloReactApp).toBeDefined();
		});
		// it('should throw error b/c appname is not given', () => {
		// 	class HelloAppWithoutName extends React.Component {
		// 		render() {
		// 			return <div>hello world</div>;
		// 		}
    //   }
		// 	expect(() => AppRegistry.register(HelloAppWithoutName)).toThrow(
    //     'App name not provided.'
    //   );
		// });
		// it('slug should be abc-react-app', () => {
		// 	class TestApp extends React.Component {
		// 		static appName = 'Hello World';
		// 		static slug = 'abc-react-app';
		// 		render() {
		// 			return <div>hello world</div>;
		// 		}
    //   }
		// 	AppRegistry.register(TestApp);
		// 	expect(
    //     Object.prototype.hasOwnProperty.call(AppRegistry.AppsTable, 'abc-react-app')
    //   ).toEqual(true);
		// 	expect(AppRegistry.AppsTable['abc-react-app'].slug).toEqual('abc-react-app');
		// });
		// it('slug should be hello-react-world', () => {
		// 	AppRegistry.register(HelloReactApp);
		// 	expect(
    //     Object.prototype.hasOwnProperty.call(
    //       AppRegistry.AppsTable,
    //       'hello-react-world'
    //     )
    //   ).toEqual(true);
		// 	expect(AppRegistry.AppsTable['hello-react-world'].slug).toEqual('hello-react-world');
		// });
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
	AppRegistry.AppsTable = {};
  // describe('register many app', () => {
  // 	it('should throw error b/c app is not array', () => {
  // 		expect(() => AppRegistry.registerMany({})).toThrow();
  // 	});
  // 	it('should have hello world app', () => {
  // 		AppRegistry.registerMany();
  // 		expect(AppRegistry.AppsTable).toEqual({});
  // 	});
  // 	it('should have hello world app', () => {
  // 		AppRegistry.registerMany([HelloApp]);
  // 		expect(AppRegistry.AppsTable.hasOwnProperty('hello-world')).toEqual(true);
  // 	});
  // });
  // describe('get component schema', () => {
  // 	it('should throw error b/c app is not array', () => {
  // 		const schema = AppRegistry.getComponentSchema();
  // 		expect(schema.children[0].props.path).toEqual('/app/hello-world');
  // 	});
  // });
});
