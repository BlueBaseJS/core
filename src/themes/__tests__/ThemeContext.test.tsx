import { BlueBaseApp } from '../../index';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { ThemeDemo } from '../__stories__/ThemeDemo';
import { ThemePicker } from '../__stories__/ThemePicker';
import { ThemeProvider } from '../..';
import { mount } from 'enzyme';

// beforeEach(() => {
// 	jest.resetModules();
// });

describe('ThemeContext', () => {

	test(`should render a ThemeDemo component with themed background color`, (done) => {
		const component = TestRenderer.create(
			<BlueBaseApp>
				<ThemeDemo />
			</BlueBaseApp>
		);
		let tree = component.toJSON();
		expect((tree as any).children.join()).toBe('Loading');
		expect(tree).toMatchSnapshot();


		setTimeout(() => {
			tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			expect((tree as any).children[0].props.style.backgroundColor).toBe('#fafafa');
			done();
		});
	});


	test(`should render a overwritten ThemeDemo component with red background color`, (done) => {
		const component = TestRenderer.create(
			<BlueBaseApp>
				<ThemeProvider theme="bluebase-dark" overrides={{ palette: { background: { default: 'red' } } }}>
					<ThemeDemo />
				</ThemeProvider>
			</BlueBaseApp>
		);
		let tree = component.toJSON();
		expect((tree as any).children.join()).toBe('Loading');
		expect(tree).toMatchSnapshot();


		setTimeout(() => {
			tree = component.toJSON();
			expect(tree).toMatchSnapshot();
			expect((tree as any).children[0].props.style.backgroundColor).toBe('red');
			done();
		});
	});


	test(`should change theme based on callback function`, async (done) => {
		const wrapper = mount(
			<BlueBaseApp>
				<ThemeProvider>
					<ThemePicker />
					<ThemeDemo />
				</ThemeProvider>
			</BlueBaseApp>
		);

		expect(wrapper).toMatchSnapshot();

		setTimeout(() => {
			wrapper.update();
			expect(wrapper).toMatchSnapshot();

			// Verify that background color is light
			let view = wrapper.find('ThemeDemo').childAt(0).first();
			expect((view.prop('style') as any).backgroundColor).toBe('#fafafa');

			// Update theme to dark
			wrapper.find('Picker').simulate('change', { target: { value: 'bluebase-dark' } });

			setTimeout(() => {
				wrapper.update();
				expect(wrapper).toMatchSnapshot();

				// Verify that background color is dark
				view = wrapper.find('ThemeDemo').childAt(0).first();
				expect((view.prop('style') as any).backgroundColor).toBe('#fafafa');

				// Finish
				done();
			});
		});
	});
});

