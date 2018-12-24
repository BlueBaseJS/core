import { Text, View } from 'react-native';
import React from 'react';
// import TestRenderer from 'react-test-renderer';
import { WaitObserver } from '../WaitObserver';
import { mount } from 'enzyme';

jest.useFakeTimers();

const LoadingState = (props: any) => {

	const { timedOut } = props;

	let title = 'Loading now...';

	if (timedOut === true) {
		title = 'This is taking longer than usual';

		// if (retry) {
		// 	props.actionTitle = 'Retry';
		// 	props.actionOnPress = retry;
		// }
	}

	return (
		<View>
			<Text testID="title">{title}</Text>
		</View>
	);
};

describe.only('WaitObserver', () => {

	test(`should change states based on custom delay & timeout`, () => {

		const onTimeout = jest.fn();
		const onRetry = jest.fn();

		const component = mount(
			<WaitObserver
				delay={1000}
				timeout={3000}
				onTimeout={onTimeout}
				onRetry={onRetry}
				children={(props: any) => <LoadingState {...props} />}
			/>
		);

		// Should render null
		expect(component).toMatchSnapshot();
		expect(onTimeout.mock.calls.length).toBe(0);
		expect(onRetry.mock.calls.length).toBe(0);
		expect(component.find('WaitObserver').text()).toBeNull();
		expect(component.find('WaitObserver').state()).toMatchObject({
			pastDelay: false,
			timedOut: false,
		});

		// Fast-forward
		jest.advanceTimersByTime(1000);
		component.update();

		// Should render Loading message
		expect(component).toMatchSnapshot();
		expect(onTimeout.mock.calls.length).toBe(0);
		expect(onRetry.mock.calls.length).toBe(0);
		expect(component.find('WaitObserver').text()).toBe('Loading now...');
		expect(component.find('WaitObserver').state()).toMatchObject({
			pastDelay: true,
			timedOut: false,
		});

		// Fast-forward
		jest.advanceTimersByTime(2000);
		component.update();

		// Should render timeout message
		expect(component).toMatchSnapshot();
		expect(onTimeout.mock.calls.length).toBe(1);
		expect(onRetry.mock.calls.length).toBe(0);
		expect(component.find('WaitObserver').text()).toBe('This is taking longer than usual');
		expect(component.find('WaitObserver').state()).toMatchObject({
			pastDelay: true,
			timedOut: true,
		});

		// Retry
		const instance = component.find('WaitObserver').instance();
		(instance as any).retry();
		component.update();

		//////// Start the process again

		// Should render Loading message
		expect(component).toMatchSnapshot();
		expect(onTimeout.mock.calls.length).toBe(1);
		expect(onRetry.mock.calls.length).toBe(1);
		expect(component.find('WaitObserver').text()).toBe('Loading now...');
		expect(component.find('WaitObserver').state()).toMatchObject({
			pastDelay: true,
			timedOut: false,
		});

		// Fast-forward
		jest.advanceTimersByTime(3000);
		component.update();

		// Should render timeout message
		expect(component).toMatchSnapshot();
		expect(onTimeout.mock.calls.length).toBe(2);
		expect(onRetry.mock.calls.length).toBe(1);
		expect(component.find('WaitObserver').text()).toBe('This is taking longer than usual');
		expect(component.find('WaitObserver').state()).toMatchObject({
			pastDelay: true,
			timedOut: true,
		});
	});

	test(`should change states based on custom delay & timeouts`, () => {

		const onTimeout = jest.fn();

		const Comp = WaitObserver as any;

		const component = mount(
			<Comp
				delay={false}
				timeout={false}
				onTimeout={onTimeout}
				children={(props: any) => <LoadingState {...props} />}
			/>
		);

		// Should render null
		expect(component).toMatchSnapshot();
		expect(onTimeout.mock.calls.length).toBe(0);
		expect(component.find('WaitObserver').text()).toBeNull();
		expect(component.find('WaitObserver').state()).toMatchObject({
			pastDelay: false,
			timedOut: false,
		});

		// Fast-forward
		jest.advanceTimersByTime(1000);
		component.update();

		// Should render Loading message
		expect(component).toMatchSnapshot();
		expect(onTimeout.mock.calls.length).toBe(0);
		expect(component.find('WaitObserver').state()).toMatchObject({
			pastDelay: false,
			timedOut: false,
		});

		// Fast-forward
		component.unmount();

		// Should render timeout message
		expect(component).toMatchSnapshot();
		expect(component.getElements()).toHaveLength(0);

	});

	test(`should not change states based on timeouts, becuase it gets unmounted`, () => {

		const onTimeout = jest.fn();

		const component = mount(
			<WaitObserver
				delay={1000}
				timeout={3000}
				onTimeout={onTimeout}
				children={(props: any) => <LoadingState {...props} />}
			/>
		);

		// Should render null
		expect(component).toMatchSnapshot();
		expect(onTimeout.mock.calls.length).toBe(0);
		expect(component.find('WaitObserver').text()).toBeNull();
		expect(component.find('WaitObserver').state()).toMatchObject({
			pastDelay: false,
			timedOut: false,
		});

		// unmount
		component.unmount();

		// Fast-forward
		jest.advanceTimersByTime(1000);
		component.update();

		// Should render Loading message
		expect(component).toMatchSnapshot();
		expect(onTimeout.mock.calls.length).toBe(0);
		expect(component.getElements()).toHaveLength(0);

		// Fast-forward
		jest.advanceTimersByTime(2000);
		component.update();

		// Should render timeout message
		expect(component).toMatchSnapshot();
		expect(component.getElements()).toHaveLength(0);

	});

	test(`should show loading state if delay is 0`, () => {

		const component = mount(
			<WaitObserver
				delay={0}
				timeout={2000}
				onRetry={null as any}
				onTimeout={null as any}
				children={<LoadingState />}
			/>
		);

		// Should render Loading message
		expect(component).toMatchSnapshot();
		expect(component.find('WaitObserver').text()).toBe('Loading now...');
		expect(component.find('WaitObserver').state()).toMatchObject({
			pastDelay: true,
			timedOut: false,
		});

		// Fast-forward
		jest.advanceTimersByTime(2000);
		component.update();

		// Should render Loading message
		expect(component).toMatchSnapshot();
		expect(component.find('WaitObserver').text()).toBe('Loading now...');
		expect(component.find('WaitObserver').state()).toMatchObject({
			pastDelay: true,
			timedOut: true,
		});

		// Retry
		const instance = component.find('WaitObserver').instance();
		(instance as any).retry();
		component.update();

		// Should render Loading message
		expect(component).toMatchSnapshot();
		expect(component.find('WaitObserver').text()).toBe('Loading now...');
		expect(component.find('WaitObserver').state()).toMatchObject({
			pastDelay: true,
			timedOut: false,
		});

	});

	test(`default callback functions should return undefined`, () => {

		const component = mount(
			<WaitObserver
				children={<LoadingState />}
			/>
		);

		const onRetry: any = component.find('WaitObserver').prop('onRetry');
		const onTimeout: any = component.find('WaitObserver').prop('onTimeout');

		expect(onRetry()).toBe(undefined);
		expect(onTimeout()).toBe(undefined);

	});

});
