import AppRegistry from '../../src/registries/AppRegistry';
import Platform from '../Platform';
import BR from '../../src/index';

import { App } from '../../src/models/App';
// just only to test my code.These are not final tests
describe('AppRegistry Unit tests', () => {
	let appRegistry;
	beforeAll(() => {
		appRegistry = new AppRegistry(BR);

	});
	class HelloWorldApp  {
		static appName = HelloWorldApp;
		static slug = 'hello-world';
		render() {
			return (<div><h1>Hello World!</h1></div>);
		}
	}

	describe('- Set Method', () => {
		it('should throw an error on setting an App into app registry without appName', () => {
			expect(() => {
				appRegistry.set('APP', () => 'APP');
			}).toThrowError();
		});

		it('should throw an error on setting an App into app registry without appName', () => {
			expect(() => {
				const Components:any=() => '';
				BR.Components.add('IconEnhanced',Components) ;

			}).toBeDefined();
		});
		it('should successfully set an App into app registry', () => {
			appRegistry.set('HelloWorldApp', HelloWorldApp);
			expect(appRegistry.get('HelloWorldApp')).toBe(HelloWorldApp);
		});
		it('- overload method when only app is passed', () => {
			class TestApp  {
				static appName = TestApp;
				static slug = 'testApp'; // it will be test-app after kebabcase
				render() {
					return (<div><h1>Test App!</h1></div>);
				}
			}
			appRegistry.set(TestApp);
			expect(appRegistry.get('test-app')).toBe(TestApp);
		});
	});

	describe('- Add Method', () => {

		it('should successfully add an App into app registry', () => {
			appRegistry.add('HelloWorldAppliction', HelloWorldApp);
			expect(appRegistry.get('HelloWorldAppliction')).toBe(HelloWorldApp);
		});
		it('- overload method when only app is passed', () => {
			appRegistry.add(HelloWorldApp);
			// its slug will be used as key
			expect(appRegistry.get('hello-world')).toBe(HelloWorldApp);
		});
		it('should throw an error on adding an App into app registry, with the same key', () => {
			expect(() => { appRegistry.add('HelloWorldApp', HelloWorldApp); })
			.toThrowError(
				'An item with HelloWorldApp key already exists in the AppRegistry registry. Try using the "setOrReplace" method instead.'
			);
		});
	});

	describe('- RegisterMany Method', () => {

		it('should successfully register many apps', () => {
			class HelloWorldApp2  {
				static appName = HelloWorldApp2;
				static slug = 'hello-world-2';
				render() {
					return (<div><h1>Hello World!</h1></div>);
				}
			}
			class HelloWorldApp3  {
				static appName = HelloWorldApp3;
				static slug = 'hello-world-3';
				render() {
					return (<div><h1>Hello World!</h1></div>);
				}
			}
			const apps = [ HelloWorldApp2, HelloWorldApp3];
			appRegistry.registerMany(apps);
			expect(appRegistry.data.get('hello-world-2')).toBe(HelloWorldApp2);
			expect(appRegistry.data.get('hello-world-3')).toBe(HelloWorldApp3);
		});

		it('should throw an error if non-array is not passed to registerMany `method`', () => {
			class HelloWorldApp2  {
				static appName = HelloWorldApp2;
				static slug = 'hello-world2';
				render() {
					return (<div><h1>Hello World!</h1></div>);
				}
			}
			class HelloWorldApp3  {
				static appName = HelloWorldApp3;
				static slug = 'hello-world3';
				render() {
					return (<div><h1>Hello World!</h1></div>);
				}
			}
			const apps = { HelloWorldApp2, HelloWorldApp3 };

			expect(() => {
				appRegistry.registerMany(apps);
			}).toThrowError();
		});
	});
	describe('- InitializeAll Method', () => {

		it('should successfully initialize all apps', () => {
			class TestApp  {
				static appName = TestApp;
				static slug = 'Test-App';
				render() {
					return (<div><h1>Hello World!</h1></div>);
				}
			}
			class XyzApp  {
				static appName = XyzApp;
				static slug = 'xyz-app';
				render() {
					return (<div><h1>Hello World!</h1></div>);
				}
			}
			const apps = [ TestApp, XyzApp ];
			appRegistry.registerMany(apps);
			appRegistry.initializeAll();
			expect(appRegistry.data.get('xyz-app')).toBe(XyzApp);
			expect(appRegistry.data.get('test-app')).toBe(TestApp);
		});

		it('should return nothing on passing an array with undefined to initializeAll method', () => {
			const applicationRegistry = new AppRegistry(BR);
			console.log('applicationRegistry.data', applicationRegistry.data);
			applicationRegistry.data = [ undefined ];
			expect(applicationRegistry.initializeAll()).toBeUndefined();
		});
	});
});

describe('Integration testing with boot function of BR', () =>  {
	let bootOptions;
	beforeAll(() => {
		document.body.innerHTML = '<div class="app-container">' + '</div>';
	});

	it('should set an app in app registry when apps is passed through bootOptions', () => {

		class HelloWorldApp  {

			static appName = HelloWorldApp;
			static slug = 'hello-world';

			render() {
				const { appName,BR } = this.constructor;
				return (
								<div>
									<h1>Hello World!</h1>
									<p>This is BlueRain's {appName} app!</p>
								</div>
				);
			}
		}

		bootOptions = { platform:[Platform],renderApp:false, apps:[HelloWorldApp]  };
		BR.boot(bootOptions);
		expect(BR.Apps.data.get('hello-world')).toBe(HelloWorldApp);
	});
	it('should return appRoutes when an app is passed through bootOptions', () => {

		class HelloWorldApp  {

			static appName = HelloWorldApp;
			static slug = 'hello-world';

			render() {
				const { appName,BR } = this.constructor;
				return (
								<div>
									<h1>Hello World!</h1>
									<p>This is BlueRain's {appName} app!</p>
								</div>
				);
			}
		}

		bootOptions = { platform:[Platform],renderApp:false, apps:[HelloWorldApp]  };
		BR.boot(bootOptions);
		const routes = BR.Apps.getAllRoutes();
		expect(routes).toHaveLength(1);
	});
});
