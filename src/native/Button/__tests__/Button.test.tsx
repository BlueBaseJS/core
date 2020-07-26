import { Button, ButtonStyles } from '../Button';

import { BlueBaseTheme } from '../../../themes';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Text } from 'react-native';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('Button', () => {
	test(`should render Button with default color styles`, () => {
		const styles = Button.defaultStyles(BlueBaseTheme) as ButtonStyles;
		const rendered = TestRenderer.create(
			<Button styles={styles} testID="button-root">
				Hello
			</Button>
		);

		const el = rendered.root.findAllByProps({ testID: 'button-root' })[1];
		const text = rendered.root.findByType(Text);

		expect(el.props.style[0]).toMatchObject(styles.root);
		expect(el.props.style[1]).toMatchObject(styles.default);

		expect(text.props.style[0]).toMatchObject(styles.text);
		expect(text.props.style[0]).toMatchObject(styles.defaultText);
	});

	test(`should render Button with primary color styles`, () => {
		const styles = Button.defaultStyles(BlueBaseTheme) as ButtonStyles;
		const rendered = TestRenderer.create(
			<Button styles={styles} color="primary" testID="button-root">
				Hello
			</Button>
		);

		const el = rendered.root.findAllByProps({ testID: 'button-root' })[1];
		const text = rendered.root.findByType(Text);

		expect(el.props.style[0]).toMatchObject(styles.root);
		expect(el.props.style[1]).toMatchObject(styles.primary);

		expect(text.props.style[0]).toMatchObject(styles.text);
		expect(text.props.style[1]).toMatchObject(styles.primaryText);
	});

	test(`should render Button with secondary color styles`, () => {
		const styles = Button.defaultStyles(BlueBaseTheme) as ButtonStyles;
		const rendered = TestRenderer.create(
			<Button styles={styles} color="secondary" testID="button-root">
				Hello
			</Button>
		);

		const el = rendered.root.findAllByProps({ testID: 'button-root' })[1];
		const text = rendered.root.findByType(Text);

		expect(el.props.style[0]).toMatchObject(styles.root);
		expect(el.props.style[1]).toMatchObject(styles.secondary);

		expect(text.props.style[0]).toMatchObject(styles.text);
		expect(text.props.style[1]).toMatchObject(styles.secondaryText);
	});

	test(`should render Button with link color styles`, () => {
		const styles = Button.defaultStyles(BlueBaseTheme) as ButtonStyles;
		const rendered = TestRenderer.create(
			<Button styles={styles} color="link" testID="button-root">
				Hello
			</Button>
		);

		const el = rendered.root.findAllByProps({ testID: 'button-root' })[1];
		const text = rendered.root.findByType(Text);

		expect(el.props.style[0]).toMatchObject(styles.root);
		expect(el.props.style[1]).toMatchObject(styles.link);

		expect(text.props.style[0]).toMatchObject(styles.text);
		expect(text.props.style[1]).toMatchObject(styles.linkText);
	});

	test(`should render Button with full width`, () => {
		const styles = Button.defaultStyles(BlueBaseTheme) as ButtonStyles;
		const rendered = TestRenderer.create(
			<Button styles={styles} testID="button-root" fullWidth={true}>
				Hello
			</Button>
		);

		const el = rendered.root.findAllByProps({ testID: 'button-root' })[1];
		const text = rendered.root.findByType(Text);

		expect(el.props.style[0]).toMatchObject(styles.root);
		expect(el.props.style[1]).toMatchObject(styles.default);
		expect(el.props.style[2]).toMatchObject(styles.fullWidth);

		expect(text.props.style[0]).toMatchObject(styles.text);
		expect(text.props.style[1]).toMatchObject(styles.defaultText);
	});

	test(`should render Button with custom children`, () => {
		const styles = Button.defaultStyles(BlueBaseTheme) as ButtonStyles;
		const rendered = TestRenderer.create(
			<Button styles={styles} testID="button-root" fullWidth={true}>
				<Text testID="custom">Custom</Text>
			</Button>
		);

		const el = rendered.root.findAllByProps({ testID: 'button-root' })[1];
		const text = rendered.root.findByType(Text);

		expect(el.props.style[0]).toMatchObject(styles.root);
		expect(el.props.style[1]).toMatchObject(styles.default);
		expect(el.props.style[2]).toMatchObject(styles.fullWidth);

		expect(text.props.style).toBeUndefined();
		expect(text.props.testID).toBe('custom');
	});

	test(`should use TouchableNativeFeedback on android platform`, async () => {
		jest.mock('Platform', () => {
			const Platform = (require as any).requireActual('Platform');
			Platform.OS = 'android';
			return Platform;
		});

		const styles = Button.defaultStyles(BlueBaseTheme) as ButtonStyles;

		// const rendered = TestRenderer.create(
		// 	<Button styles={styles}>
		// 		Hello
		// 	</Button>
		// );

		// // const el = rendered.root.findAllByProps({ testID: 'button-root' })[1];
		// const touchable = rendered.root.findByType(TouchableNativeFeedback);

		// expect(touchable.type).toBe('TouchableNativeFeedback');

		const wrapper = mount(<Button styles={styles}>Hello</Button>);

		// Wait for render
		await waitForElement(wrapper as any, Button);

		expect(wrapper.find('Button DummyTouchableNativeFeedback').length).toBe(1);
	});
});
