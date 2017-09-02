/**
 * Created by umair on 8/30/17.
 */
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import React from 'react';
import ResponsiveLayout from '../../src/layouts/ResponsiveLayout';
import BR from '../../src/';
import {
  setWindowDimentions
} from '../../src/plugins/WindowInfoPlugin/actions';
describe('Responsive Layout tests', () => {
	it('should render the xs layout when size xs is passsed', () => {
		const mockStore = configureMockStore(
			[
        /* middlewares */
			]
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
		const wrapper = mount(
      // enzyme
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout
      default={() => <h1>default</h1>}
      xs={() => <h1>xs</h1>}
      sm={() => <h1>sm</h1>}
      md={() => <h1>md</h1>}
      lg={() => <h1>lg</h1>}
      xl={() => <h1>xl</h1>}
    />
  </Provider>
    );

		expect(wrapper.containsMatchingElement(<h1>xs</h1>)).toEqual(true);
		expect(wrapper.containsMatchingElement(<h1>default</h1>)).toEqual(false);
	});
	it('should render the sm layout when size sm is passsed', () => {
		const mockStore = configureMockStore(
			[
        /* middlewares */
			]
    );
		const mockStoreInitialized = mockStore({
			bluerain: {
				window: {
					width: 600,
					hieght: 45,
					size: 'sm'
				}
			}
		});
		const wrapper = mount(
      // enzyme
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout
      default={() => <h1>default</h1>}
      xs={() => <h1>xs</h1>}
      sm={() => <h1>sm</h1>}
      md={() => <h1>md</h1>}
      lg={() => <h1>lg</h1>}
      xl={() => <h1>xl</h1>}
    />
  </Provider>
    );

		expect(wrapper.containsMatchingElement(<h1>sm</h1>)).toEqual(true);
		expect(wrapper.containsMatchingElement(<h1>default</h1>)).toEqual(false);
	});
	it('should render the md layout when size md is passsed', () => {
		const mockStore = configureMockStore(
			[
        /* middlewares */
			]
    );
		const mockStoreInitialized = mockStore({
			bluerain: {
				window: {
					width: 223,
					hieght: 45,
					size: 'md'
				}
			}
		});
		const wrapper = mount(
      // enzyme
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout
      default={() => <h1>default</h1>}
      xs={() => <h1>xs</h1>}
      sm={() => <h1>sm</h1>}
      md={() => <h1>md</h1>}
      lg={() => <h1>lg</h1>}
      xl={() => <h1>xl</h1>}
    />
  </Provider>
    );

		expect(wrapper.containsMatchingElement(<h1>md</h1>)).toEqual(true);
		expect(wrapper.containsMatchingElement(<h1>default</h1>)).toEqual(false);
	});
	it('should render the lg layout when size lg is passsed', () => {
		const mockStore = configureMockStore(
			[
        /* middlewares */
			]
    );
		const mockStoreInitialized = mockStore({
			bluerain: {
				window: {
					width: 600,
					hieght: 45,
					size: 'lg'
				}
			}
		});
		const wrapper = mount(
      // enzyme
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout
      default={() => <h1>default</h1>}
      xs={() => <h1>xs</h1>}
      sm={() => <h1>sm</h1>}
      md={() => <h1>md</h1>}
      lg={() => <h1>lg</h1>}
      xl={() => <h1>xl</h1>}
    />
  </Provider>
    );

		expect(wrapper.containsMatchingElement(<h1>lg</h1>)).toEqual(true);
		expect(wrapper.containsMatchingElement(<h1>default</h1>)).toEqual(false);
	});
	it('should render the xl layout when size xl is passsed', () => {
		const mockStore = configureMockStore(
			[
        /* middlewares */
			]
    );
		const mockStoreInitialized = mockStore({
			bluerain: {
				window: {
					width: 600,
					hieght: 45,
					size: 'xl'
				}
			}
		});
		const wrapper = mount(
      // enzyme
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout
      default={() => <h1>default</h1>}
      xs={() => <h1>xs</h1>}
      sm={() => <h1>sm</h1>}
      md={() => <h1>md</h1>}
      lg={() => <h1>lg</h1>}
      xl={() => <h1>xl</h1>}
    />
  </Provider>
    );

		expect(wrapper.containsMatchingElement(<h1>xl</h1>)).toEqual(true);
		expect(wrapper.containsMatchingElement(<h1>default</h1>)).toEqual(false);
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
			const wrapper = mount(
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout
      default={() => <h1>default</h1>}
      xs=""
      sm={() => <h1>sm</h1>}
      md={() => <h1>md</h1>}
      lg={() => <h1>lg</h1>}
      xl={() => <h1>xl</h1>}
    />
  </Provider>
      );

			expect(wrapper.containsMatchingElement(<h1>default</h1>)).toEqual(true);
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
			const wrapper = mount(
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout default={() => <h1>default</h1>} />
  </Provider>
      );

			expect(wrapper.containsMatchingElement(<h1>default</h1>)).toEqual(true);
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
			const wrapper = mount(
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout default={() => <h1>default</h1>} />
  </Provider>
      );

			expect(wrapper.containsMatchingElement(<h1>default</h1>)).toEqual(true);
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
			const wrapper = mount(
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout default={() => <h1>default</h1>} />
  </Provider>
      );

			expect(wrapper.containsMatchingElement(<h1>default</h1>)).toEqual(true);
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
			const wrapper = mount(
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout default={() => <h1>default</h1>} />
  </Provider>
      );

			expect(wrapper.containsMatchingElement(<h1>default</h1>)).toEqual(true);
		});
	});
	describe('Pass components as strings rather than React Components', () => {
		it('should Heading when size xs is not passsed ', () => {
			BR.Components.register('Heading', () => <h1>Heading</h1>);
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
			const wrapper = mount(
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout
      default={() => <h1>default</h1>}
      xs="Heading"
      sm={() => <h1>sm</h1>}
      md={() => <h1>md</h1>}
      lg={() => <h1>lg</h1>}
      xl={() => <h1>xl</h1>}
    />
  </Provider>
      );

			expect(wrapper.containsMatchingElement(<h1>Heading</h1>)).toEqual(true);
		});
		it('should render pargraph when size sm is not passsed ', () => {
			BR.Components.register('Paragraph', () => <p>This is a paragraph</p>);
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
			const wrapper = mount(
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout default={() => <h1>default</h1>} sm="Paragraph" />
  </Provider>
      );

			expect(
        wrapper.containsMatchingElement(<p>This is a paragraph</p>)
      ).toEqual(true);
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
        mount(
          <Provider store={mockStoreInitialized}>
            <ResponsiveLayout
              default={() => <h1>default</h1>}
              lg="NotRegistered"
            />
          </Provider>
        )
      ).toThrow('Component NotRegistered not registered.');
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
        mount(
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
        mount(
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
        mount(
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
			const wrapper = mount(
  <Provider store={mockStoreInitialized}>
    <ResponsiveLayout
      default=""
      xs={() => <h1>xs</h1>}
      lg={() => <h1>lg</h1>}
    />
  </Provider>
      );

			expect(wrapper.containsMatchingElement(<h1>xs</h1>)).toEqual(true);
			mockStoreInitialized.dispatch(setWindowDimentions(1000, 500));
			const actions = mockStoreInitialized.getActions();
			expect(actions[0].width).toEqual(1000);
		});
	});
});
