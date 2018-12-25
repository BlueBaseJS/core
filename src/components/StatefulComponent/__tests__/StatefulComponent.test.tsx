import { BlueBaseApp } from '../../BlueBaseApp';
import React from 'react';
import { StatefulComponent } from '../StatefulComponent';
import { Text } from 'react-native';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
// import TestRenderer from 'react-test-renderer';

// jest.useFakeTimers();

describe('StatefulComponent', () => {

	test(`should show empty state as no data is provided`, async () => {
		const component = mount(
			<BlueBaseApp>
				<StatefulComponent />
			</BlueBaseApp>
		);

		await waitForElement(component, StatefulComponent);

		expect(component).toMatchSnapshot();

		expect(component.find('StatefulComponent').find('Text').at(0).text()).toBe('Empty Area');
		expect(component.find('StatefulComponent').find('Text').at(2).text()).toBe('Create new items to fill this area.');
	});

	test(`should show empty state as data is an empty array`, async () => {

		const component = mount(
			<BlueBaseApp>
				<StatefulComponent data={[]} />
			</BlueBaseApp>
		);

		await waitForElement(component, StatefulComponent);

		expect(component).toMatchSnapshot();

		expect(component.find('StatefulComponent').find('Text').at(0).text()).toBe('Empty Area');
		expect(component.find('StatefulComponent').find('Text').at(2).text()).toBe('Create new items to fill this area.');

	});

	test(`should show loading state if loading is set to true`, async () => {
		const component = mount(
			<BlueBaseApp>
				<StatefulComponent loading={true} delay={0} />
			</BlueBaseApp>
		);

		await waitForElement(component, StatefulComponent);

		expect(component).toMatchSnapshot();
		expect(component.exists('LoadingState')).toBe(true);
	});

	it(`should show children nodes`, async () => {
		const component = mount(
			<BlueBaseApp>
				<StatefulComponent data={true}>
					<Text>Content</Text>
				</StatefulComponent>
			</BlueBaseApp>
		);

		await waitForElement(component, StatefulComponent);

		expect(component).toMatchSnapshot();
		expect(component.find('StatefulComponent').find('Text').last().text()).toBe('Content');
	});

	it(`should show render prop children`, async () => {
		const component = mount(
			<BlueBaseApp>
				<StatefulComponent data={true}>
					{() => <Text>Render prop</Text>}
				</StatefulComponent>
			</BlueBaseApp>
		);

		await waitForElement(component, StatefulComponent);

		expect(component).toMatchSnapshot();
		expect(component.find('StatefulComponent').find('Text').last().text()).toBe('Render prop');
	});

	it(`should show children from Component prop`, async () => {

		const Comp = () => <Text>Custom Component</Text>;

		const component = mount(
			<BlueBaseApp>
				<StatefulComponent data={true} component={Comp}>
					<Text>Content</Text>
				</StatefulComponent>
			</BlueBaseApp>
		);

		await waitForElement(component, StatefulComponent);

		expect(component).toMatchSnapshot();
		expect(component.find('StatefulComponent').find('Text').last().text()).toBe('Custom Component');
	});

});
