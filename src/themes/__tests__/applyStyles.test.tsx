import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import React from 'react';
import { Text } from 'react-native';
import { ThemeProvider } from '../ThemeContext';
import { applyStyles } from '../applyStyles';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const Demo = (props: any) => <Text style={props.styles.root}>Demo Text</Text>;
Demo.defaultStyles = { root: { backgroundColor: 'red' } };

describe('applyStyles', () => {
	test(`apply styles without theme & unknown component name`, async () => {
		const ThemedDemo = applyStyles({ name: 'Foo' })(Demo);

		const BB = new BlueBase();
		await BB.boot();

		const wrapper = mount(
			<BlueBaseContext.Provider value={BB}>
				<ThemeProvider>
					<ThemedDemo />
				</ThemeProvider>
			</BlueBaseContext.Provider>
		);

		// Wait for render
		await waitForElement(wrapper as any, ThemedDemo);

		const style =
			wrapper
				.find('Demo Text')
				.first()
				.prop('style') || {};
		expect(style.backgroundColor).toBe('red');
	});
});
