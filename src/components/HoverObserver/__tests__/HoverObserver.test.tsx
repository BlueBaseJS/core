import { HoverObserver } from '../HoverObserver';
import { HoverObserver as HoverObserverWeb } from '../HoverObserver.web';
import React from 'react';
import { Text } from 'react-native';
import { mount } from 'enzyme';

jest.useFakeTimers();

describe('HoverObserver', () => {

	it(`should render a HoverObserver with default props`, () => {

		const wrapper = mount(
			<HoverObserverWeb>
			{({ isHovering }) => <Text>{isHovering ? 'Hovering!' : 'Not Hovering!'}</Text>}
			</HoverObserverWeb>
		);

		// Check component
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('HoverObserver Text').last().text()).toBe('Not Hovering!');

		// Change state: mouseEnter
		wrapper.find('HoverObserver div').simulate('mouseEnter');
		jest.advanceTimersByTime(1);
		wrapper.update();

		// Check component
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('HoverObserver Text').last().text()).toBe('Hovering!');

		// Change state: mouseLeave
		wrapper.find('HoverObserver div').simulate('mouseLeave');
		jest.advanceTimersByTime(1);
		wrapper.update();

		// Check component
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('HoverObserver Text').last().text()).toBe('Not Hovering!');

		// Change state: mouseOver
		expect((wrapper as any).find('HoverObserver').instance().onMouseOver()).toBeUndefined();
		expect((wrapper as any).find('HoverObserver').instance().onMouseOut()).toBeUndefined();

		wrapper.unmount();
	});

	it(`should always set isHovering to false on android`, () => {

		const wrapper = mount(
			<HoverObserver>
			{({ isHovering }: any) => <Text>{isHovering ? 'Hovering!' : 'Not Hovering!'}</Text>}
			</HoverObserver>
		);

		// Check component
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('HoverObserver Text').last().text()).toBe('Not Hovering!');

		// Change state: mouseEnter
		wrapper.find('HoverObserver Text').first().simulate('mouseEnter');
		jest.advanceTimersByTime(1);
		wrapper.update();

		// Check component
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('HoverObserver Text').last().text()).toBe('Not Hovering!');
	});

});
