import { Text, View } from 'react-native';

import { BlueBase } from '../../../BlueBase';
import { BlueBaseApp } from '../../../';
import { DynamicIcon } from '../DynamicIcon';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('DynamicIcon', () => {
	test(`should return null if there is no type prop`, async () => {
		const DIcon = DynamicIcon as any;

		const wrapper = mount(
			<BlueBaseApp>
				<DIcon />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, DIcon);

		expect(wrapper.find(DIcon).text()).toBe('');
	});

	test(`should render an image with default size of 100x100`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<DynamicIcon type="image" source={{ uri: 'https://picsum.photos/200' }} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, DynamicIcon);
		const node = wrapper.find('Image').first();

		expect(node.prop('size')).toBe(100);
		expect(node.prop('style')).toMatchObject({ height: 100, width: 100 });
	});

	test(`should render an image with default size of 250x250`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<DynamicIcon type="image" size={250} source={{ uri: 'https://picsum.photos/200' }} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, DynamicIcon);
		const node = wrapper.find('Image').first();

		expect(node.prop('size')).toBe(250);
		expect(node.prop('style')).toMatchObject({ height: 250, width: 250 });
	});

	test(`should render an image with style prop overwritten`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<DynamicIcon
					type="image"
					style={{ height: 250, width: 250 }}
					source={{ uri: 'https://picsum.photos/200' }}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, DynamicIcon);
		const node = wrapper.find('Image').first();

		expect(node.prop('size')).toBe(100);
		expect(node.prop('style')).toMatchObject({ height: 100, width: 100 });
	});

	test(`should render an image with style prop overwritten`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<DynamicIcon
					type="image"
					style={{ height: 250, width: 250 }}
					source={{ uri: 'https://picsum.photos/200' }}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, DynamicIcon);
		const node = wrapper.find('Image').first();

		expect(node.prop('size')).toBe(100);
		expect(node.prop('style')).toMatchObject({ height: 100, width: 100 });
	});

	test(`should render an custom component`, async () => {
		const CustomComponent = ({ size }: { size: number }) => (
			<View testID="custom" style={{ height: size, width: size, backgroundColor: 'red' }} />
		);

		const wrapper = mount(
			<BlueBaseApp>
				<DynamicIcon type="component" component={CustomComponent} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, DynamicIcon);
		const node = wrapper.find('[testID="custom"]').last();

		expect(node.prop('style')).toMatchObject({ height: 100, width: 100, backgroundColor: 'red' });
	});

	test(`should render an custom component that is registered in component registry`, async () => {
		const CustomComponent = ({ size }: { size: number }) => (
			<View testID="custom" style={{ height: size, width: size, backgroundColor: 'green' }} />
		);

		const BB = new BlueBase();

		const wrapper = mount(
			<BlueBaseApp BB={BB} components={{ CustomComponent }}>
				<DynamicIcon type="component" component="CustomComponent" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, DynamicIcon);
		const node = wrapper.find('[testID="custom"]').last();

		expect(node.prop('style')).toMatchObject({ height: 100, width: 100, backgroundColor: 'green' });
	});

	test(`should render an Icon component`, async () => {
		const Icon = ({ size, name }: { size: number; name: string }) => (
			<View testID="custom" style={{ height: size, width: size, backgroundColor: 'blue' }}>
				<Text>{name}</Text>
			</View>
		);

		const BB = new BlueBase();

		const wrapper = mount(
			<BlueBaseApp BB={BB} components={{ Icon }}>
				<DynamicIcon type="icon" name="bus" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, DynamicIcon);
		const node = wrapper.find('[testID="custom"]').last();

		expect(node.prop('style')).toMatchObject({ height: 100, width: 100, backgroundColor: 'blue' });
	});
});
