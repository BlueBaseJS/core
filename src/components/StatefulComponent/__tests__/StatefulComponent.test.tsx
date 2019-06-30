import { BlueBaseApp } from '../../BlueBaseApp';
import React from 'react';
import { StatefulComponent } from '../StatefulComponent';
import { Text } from 'react-native';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
// import TestRenderer from 'react-test-renderer';

// jest.useFakeTimers();
const loadingComponent: React.ComponentType<any> = () => 'loading';
const emptyComponent: React.ComponentType<any> = () => 'empty';
describe('StatefulComponent', () => {
	test(`should show empty state as no data is provided`, async () => {
		const component = mount(
			<BlueBaseApp>() => 'loading'} emptyComponent={() => 'empty'} /></BlueBaseApp>
		);

		await waitForElement(component as any, StatefulComponent);

		// expect(component).toMatchSnapshot();

		expect(
			component
				.find('StatefulComponent H6 Text')
				.last()
				.text()
		).toBe('Empty Area');
		expect(
			component
				.find('StatefulComponent Body2 Text')
				.last()
				.text()
		).toBe('Create new items to fill this area.');
	});

	test(`should show empty state as data is an empty array`, async () => {
		const component = mount(
			<BlueBaseApp>
				<StatefulComponent
					loadingComponent={loadingComponent}
					emptyComponent={emptyComponent}
					data={[]}
				/>
			</BlueBaseApp>
		);

		await waitForElement(component as any, StatefulComponent);

		// expect(component).toMatchSnapshot();

		expect(
			component
				.find('StatefulComponent H6 Text')
				.last()
				.text()
		).toBe('Empty Area');
		expect(
			component
				.find('StatefulComponent Body2 Text')
				.last()
				.text()
		).toBe('Create new items to fill this area.');
	});

	test(`should show loading state if loading is set to true`, async () => {
		const component = mount(
			<BlueBaseApp>
				<StatefulComponent
					loadingComponent={loadingComponent}
					emptyComponent={emptyComponent}
					loading={true}
					delay={0}
					timeout={0}
				/>
			</BlueBaseApp>
		);

		await waitForElement(component as any, StatefulComponent);

		// expect(component).toMatchSnapshot();
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

		await waitForElement(component as any, StatefulComponent);

		// expect(component).toMatchSnapshot();
		expect(
			component
				.find('StatefulComponent')
				.find('Text')
				.last()
				.text()
		).toBe('Content');
	});

	it(`should show render prop children`, async () => {
		const component = mount(
			<BlueBaseApp>
				<StatefulComponent
					loadingComponent={loadingComponent}
					emptyComponent={emptyComponent}
					data={true}
				>
					{() => <Text>Render prop</Text>}
				</StatefulComponent>
			</BlueBaseApp>
		);

		await waitForElement(component as any, StatefulComponent);

		// expect(component).toMatchSnapshot();
		expect(
			component
				.find('StatefulComponent')
				.find('Text')
				.last()
				.text()
		).toBe('Render prop');
	});

	it(`should show children from Component prop`, async () => {
		const Comp = () => <Text>Custom Component</Text>;

		const component = mount(
			<BlueBaseApp>
				<StatefulComponent loadingComponent={} emptyComponent={} data={true} component={Comp}>
					<Text>Content</Text>
				</StatefulComponent>
			</BlueBaseApp>
		);

		await waitForElement(component as any, StatefulComponent);

		// expect(component).toMatchSnapshot();
		expect(
			component
				.find('StatefulComponent')
				.find('Text')
				.last()
				.text()
		).toBe('Custom Component');
	});
});
