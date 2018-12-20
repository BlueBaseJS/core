import * as Native from '../../../native';
import { Noop } from '../../Noop';
import { HoverObserver } from '../HoverObserver';
import React from 'react';
import TestRenderer from 'react-test-renderer';

// beforeEach(() => {
// 	jest.resetModules();
// });


describe('HoverObserver', () => {

	test(`Snapshot HoverObserver component`, () => {
		const component = TestRenderer.create(
			<HoverObserver />
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot HoverObserver component with child`, () => {
		const component = TestRenderer.create(
			<HoverObserver>
				<Native.Text>Hello</Native.Text>
			</HoverObserver>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot HoverObserver component with child as function`, () => {
		const component = TestRenderer.create(
			<HoverObserver>
				{() => (
					<Native.Text>Hello</Native.Text>
				)}
			</HoverObserver>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`Snapshot HoverObserver component with onMouse actions without setTimeout`, () => {
		const component = TestRenderer.create(
			<HoverObserver>
				<Native.Text>Hello</Native.Text>
			</HoverObserver>
		);
		component.root.findByType('div').props.onMouseEnter();
		expect(component.toJSON()).toMatchSnapshot();
		component.root.findByType('div').props.onMouseLeave();
		expect(component.toJSON()).toMatchSnapshot();
		component.root.findByType('div').props.onMouseOver();
		expect(component.toJSON()).toMatchSnapshot();
		component.root.findByType('div').props.onMouseOut();
		expect(component.toJSON()).toMatchSnapshot();
	});

	test(`Snapshot HoverObserver component with onMouse actions after setTimeout`, (done) => {
		const component = TestRenderer.create(
			<HoverObserver>
				<Native.Text>Hello</Native.Text>
			</HoverObserver>
		);
		setTimeout(() => {
			component.root.findByType('div').props.onMouseEnter();
			expect(component.toJSON()).toMatchSnapshot();
			component.root.findByType('div').props.onMouseLeave();
			expect(component.toJSON()).toMatchSnapshot();
			component.root.findByType('div').props.onMouseOver();
			expect(component.toJSON()).toMatchSnapshot();
			component.root.findByType('div').props.onMouseOut();
			expect(component.toJSON()).toMatchSnapshot();
			done();
		});
	});

	test(`Snapshot HoverObserver component with onMouseEnter`, (done) => {
		const component = TestRenderer.create(
			<HoverObserver
				onMouseEnter={(state) => { state.setIsHovering(); }}
			>
				<Native.Text>Hello</Native.Text>
			</HoverObserver>
		);
		component.root.findByType('div').props.onMouseEnter();
		setTimeout(() => {
			expect(component.toJSON()).toMatchSnapshot();
			done();
		});
	});

	test(`Snapshot HoverObserver component with onMouse actions after setTimeout with props`, (done) => {
		const component = TestRenderer.create(
			<HoverObserver
				onHoverChanged={Noop}
				onMouseEnter={Noop}
				onMouseLeave={Noop}
				onMouseOut={Noop}
				onMouseOver={Noop}
				hoverDelayInMs={100}
				hoverOffDelayInMs={100}
			>
				<Native.Text>Hello</Native.Text>
			</HoverObserver>
		);
		const instance: any = component.getInstance();
		setTimeout(() => {
			component.root.findByType('div').props.onMouseEnter();
			expect(component.toJSON()).toMatchSnapshot();
			component.root.findByType('div').props.onMouseLeave();
			expect(component.toJSON()).toMatchSnapshot();
			component.root.findByType('div').props.onMouseOver();
			expect(component.toJSON()).toMatchSnapshot();
			component.root.findByType('div').props.onMouseOut();
			expect(component.toJSON()).toMatchSnapshot();
			instance.componentWillUnmount();
			expect(component.toJSON()).toMatchSnapshot();

			done();
		}, 200);
	});

});
