/**
 * Created by umair on 8/30/17.
 */
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import TestUtils from 'react-dom/test-utils';
import React from 'react';
import ResponsiveLayout from '../../src/layouts/ResponsiveLayout';
import BR from '../../src/';
import {
  setWindowDimentions
} from '../../src/plugins/WindowInfoPlugin/actions';
class xs extends React.Component {
	render() {
		return <div>xs</div>;
	}
}
class sm extends React.Component {
	render() {
		return <div>sm</div>;
	}
}
class md extends React.Component {
	render() {
		return <div>md</div>;
	}
}
class lg extends React.Component {
	render() {
		return <div>lg</div>;
	}
}
class xl extends React.Component {
	render() {
		return <div>xl</div>;
	}
}
class defaultComponent extends React.Component {
	render() {
		return <div>default</div>;
	}
}
describe('Responsive Layout tests', () => {
	it('should render the xs layout when size xs is passsed', () => {
		const mockStore = configureMockStore(
			[]
    );
		const mockStoreInitialized = mockStore({
			bluerain: {
				window: {
					width: 223,
					hieght: 45,
					size: 'xs'
				}
			}
		});
		const wrapper = TestUtils.renderIntoDocument(
      // enzyme
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout
      default={defaultComponent}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
    />
  </Provider>
    );
		expect(TestUtils.scryRenderedComponentsWithType(wrapper, xs).length).toEqual(1);
		expect(TestUtils.scryRenderedComponentsWithType(wrapper, defaultComponent).length).toEqual(0);
	});
	it('should render the sm layout when size sm is passsed', () => {
		const mockStore = configureMockStore([]);
		const mockStoreInitialized = mockStore({
			bluerain: {
				window: {
					width: 600,
					hieght: 45,
					size: 'sm'
				}
			}
		});
		const wrapper = TestUtils.renderIntoDocument(
      // enzyme
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout
      default={defaultComponent}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
    />
  </Provider>
    );

		expect(TestUtils.scryRenderedComponentsWithType(wrapper, sm).length).toEqual(1);
		expect(TestUtils.scryRenderedComponentsWithType(wrapper, defaultComponent).length).toEqual(0);
	});
	it('should render the md layout when size md is passsed', () => {
		const mockStore = configureMockStore([]);
		const mockStoreInitialized = mockStore({
			bluerain: {
				window: {
					width: 223,
					hieght: 45,
					size: 'md'
				}
			}
		});
		const wrapper = TestUtils.renderIntoDocument(
      // enzyme
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout
      default={defaultComponent}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
    />
  </Provider>
    );

		expect(TestUtils.scryRenderedComponentsWithType(wrapper, md).length).toEqual(1);
		expect(TestUtils.scryRenderedComponentsWithType(wrapper, defaultComponent).length).toEqual(0);
	});
	it('should render the lg layout when size lg is passsed', () => {
		const mockStore = configureMockStore([]);
		const mockStoreInitialized = mockStore({
			bluerain: {
				window: {
					width: 600,
					hieght: 45,
					size: 'lg'
				}
			}
		});
		const wrapper = TestUtils.renderIntoDocument(
      // enzyme
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout
      default={defaultComponent}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
    />
  </Provider>
    );

		expect(TestUtils.scryRenderedComponentsWithType(wrapper, lg).length).toEqual(1);
		expect(TestUtils.scryRenderedComponentsWithType(wrapper, defaultComponent).length).toEqual(0);
	});
	it('should render the xl layout when size xl is passsed', () => {
		const mockStore = configureMockStore([]);
		const mockStoreInitialized = mockStore({
			bluerain: {
				window: {
					width: 600,
					hieght: 45,
					size: 'xl'
				}
			}
		});
		const wrapper = TestUtils.renderIntoDocument(
      // enzyme
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout
      default={defaultComponent}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
    />
  </Provider>
    );

		expect(TestUtils.scryRenderedComponentsWithType(wrapper, xl).length).toEqual(1);
		expect(TestUtils.scryRenderedComponentsWithType(wrapper, defaultComponent).length).toEqual(0);
	});
	describe('default layout when any of following layouts are not provided', () => {
		it('should render the default layout when size xs is not passsed ', () => {
			const mockStore = configureMockStore([]);
			const mockStoreInitialized = mockStore({
				bluerain: {
					window: {
						width: 600,
						hieght: 45,
						size: 'xs'
					}
				}
			});
			const wrapper = TestUtils.renderIntoDocument(
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout
      default={defaultComponent}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
    />
  </Provider>
      );

			expect(TestUtils.scryRenderedComponentsWithType(wrapper, defaultComponent).length).toEqual(1);
		});
		it('should render the default layout when size sm is not passsed ', () => {
			const mockStore = configureMockStore([]);
			const mockStoreInitialized = mockStore({
				bluerain: {
					window: {
						width: 600,
						hieght: 45,
						size: 'sm'
					}
				}
			});
			const wrapper = TestUtils.renderIntoDocument(
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout default={defaultComponent} />
  </Provider>
      );

			expect(TestUtils.scryRenderedComponentsWithType(wrapper, defaultComponent).length).toEqual(1);
		});
		it('should render the default layout when size md is not passsed ', () => {
			const mockStore = configureMockStore([]);
			const mockStoreInitialized = mockStore({
				bluerain: {
					window: {
						width: 600,
						hieght: 45,
						size: 'md'
					}
				}
			});
			const wrapper = TestUtils.renderIntoDocument(
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout default={defaultComponent} />
  </Provider>
      );

			expect(TestUtils.scryRenderedComponentsWithType(wrapper, defaultComponent).length).toEqual(1);
		});
		it('should render the default layout when size lg is not passsed ', () => {
			const mockStore = configureMockStore([]);
			const mockStoreInitialized = mockStore({
				bluerain: {
					window: {
						width: 600,
						hieght: 45,
						size: 'lg'
					}
				}
			});
			const wrapper = TestUtils.renderIntoDocument(
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout default={defaultComponent} />
  </Provider>
      );

			expect(TestUtils.scryRenderedComponentsWithType(wrapper, defaultComponent).length).toEqual(1);
		});
		it('should render the default layout when size xl is not passsed ', () => {
			const mockStore = configureMockStore([]);
			const mockStoreInitialized = mockStore({
				bluerain: {
					window: {
						width: 600,
						hieght: 45,
						size: 'xl'
					}
				}
			});
			const wrapper = TestUtils.renderIntoDocument(
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout default={defaultComponent} />
  </Provider>
      );

			expect(TestUtils.scryRenderedComponentsWithType(wrapper, defaultComponent).length).toEqual(1);
		});
	});
	describe('Pass components as strings rather than React Components', () => {
		it('should Heading when size xs is not passsed ', () => {
			class Heading extends React.Component {
				render() {
					return <h1>Heading</h1>;
				}
			}
			BR.Components.register('Heading', Heading);
			const mockStore = configureMockStore([]);
			const mockStoreInitialized = mockStore({
				bluerain: {
					window: {
						width: 600,
						hieght: 45,
						size: 'xs'
					}
				}
			});
			const wrapper = TestUtils.renderIntoDocument(
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout
      default={defaultComponent}
      xs="Heading"
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
    />
  </Provider>
      );

			expect(TestUtils.scryRenderedComponentsWithType(wrapper, Heading).length).toEqual(1);
		});
		it('should render pargraph when size sm is not passsed ', () => {
			class Paragraph extends React.Component {
				render() {
					return <p>This is a paragraph</p>;
				}
			}
			BR.Components.register('Paragraph', Paragraph);
			const mockStore = configureMockStore([]);
			const mockStoreInitialized = mockStore({
				bluerain: {
					window: {
						width: 600,
						hieght: 45,
						size: 'sm'
					}
				}
			});
			const wrapper = TestUtils.renderIntoDocument(
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout default={defaultComponent} sm="Paragraph" />
  </Provider>
      );

			expect(TestUtils.scryRenderedComponentsWithType(wrapper, Paragraph).length).toEqual(1);
		});
		it('should throw error b/c component is no registered ', () => {
			const mockStore = configureMockStore([]);
			const mockStoreInitialized = mockStore({
				bluerain: {
					window: {
						width: 600,
						hieght: 45,
						size: 'lg'
					}
				}
			});
			expect(() =>
        TestUtils.renderIntoDocument(
          <Provider store={mockStoreInitialized}>
            <ResponsiveLayout
              default={defaultComponent}
              lg="NotRegistered"
            />
          </Provider>
        )
      ).toThrow('None of components NotRegistered are registered.');
		});
	});
	describe('pass invalid variables as component', () => {
		it('should throw error b/c component is null', () => {
			const mockStore = configureMockStore([]);
			const mockStoreInitialized = mockStore({
				bluerain: {
					window: {
						width: 600,
						hieght: 45,
						size: ''
					}
				}
			});
			expect(() =>
        TestUtils.renderIntoDocument(
          <Provider store={mockStoreInitialized}>
            <ResponsiveLayout default={null} />
          </Provider>
        )
      ).toThrow('Invalid Component');
		});
		it('should throw error b/c component is undefined', () => {
			const mockStore = configureMockStore([]);
			const mockStoreInitialized = mockStore({
				bluerain: {
					window: {
						width: 600,
						hieght: 45,
						size: ''
					}
				}
			});
			expect(() =>
        TestUtils.renderIntoDocument(
          <Provider store={mockStoreInitialized}>
            <ResponsiveLayout default={undefined} />
          </Provider>
        )
      ).toThrow('Invalid Component');
		});
		it('should throw error b/c component is invalid', () => {
			const mockStore = configureMockStore([]);
			const mockStoreInitialized = mockStore({
				bluerain: {
					window: {
						width: 600,
						hieght: 45,
						size: ''
					}
				}
			});
			expect(() =>
        TestUtils.renderIntoDocument(
          <Provider store={mockStoreInitialized}>
            <ResponsiveLayout default={{ abc: 'abc' }} />
          </Provider>
        )
      ).toThrow();
		});
	});
	describe('Test withWindowInfo hoc', () => {
		it('Test if passed data is correct width, height and size', () => {
			const mockStore = configureMockStore();
			const mockStoreInitialized = mockStore({
				bluerain: {
					window: {
						width: 600,
						hieght: 45,
						size: 'xs'
					}
				}
			});
			expect(mockStoreInitialized.getState().bluerain.window).toEqual({
				width: 600,
				hieght: 45,
				size: 'xs'
			});
		});
		it('Test setWindowDimentions action', () => {
			const mockStore = configureMockStore();
			const mockStoreInitialized = mockStore({
				bluerain: {
					window: {
						width: 600,
						hieght: 45,
						size: 'xs'
					}
				}
			});
			const wrapper = TestUtils.renderIntoDocument(
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout
      default=""
      xs={xs}
      lg={lg}
    />
  </Provider>
      );

			expect(TestUtils.scryRenderedComponentsWithType(wrapper, xs).length).toEqual(1);
			mockStoreInitialized.dispatch(setWindowDimentions(1000, 500));
			const actions = mockStoreInitialized.getActions();
			expect(actions[0].width).toEqual(1000);
		});
	});
});
