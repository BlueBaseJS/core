import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';
import { Text } from 'react-native';

import { BlueBaseApp } from '../../../OfflineComponents';
import { Button } from '../Button';

describe('Button', () => {
	// test(`should render Button with default color styles`, () => {
	// 	const styles = Button.defaultStyles(BlueBaseTheme) as ButtonStyles;
	// 	const rendered = TestRenderer.create(
	// 		<Button styles={styles} testID="button-root">
	// 			Hello
	// 		</Button>
	// 	);

	// 	const el = rendered.root.findAllByProps({ testID: 'button-root' })[1];
	// 	const text = rendered.root.findByType(Text);

	// 	expect(el.props.style[0]).toMatchObject(styles.root);
	// 	expect(el.props.style[1]).toMatchObject(styles.default);

	// 	expect(text.props.style[0]).toMatchObject(styles.text);
	// 	expect(text.props.style[0]).toMatchObject(styles.defaultText);
	// });

	// test(`should render Button with primary color styles`, () => {
	// 	const styles = Button.defaultStyles(BlueBaseTheme) as ButtonStyles;
	// 	const rendered = TestRenderer.create(
	// 		<Button styles={styles} color="primary" testID="button-root">
	// 			Hello
	// 		</Button>
	// 	);

	// 	const el = rendered.root.findAllByProps({ testID: 'button-root' })[1];
	// 	const text = rendered.root.findByType(Text);

	// 	expect(el.props.style[0]).toMatchObject(styles.root);
	// 	expect(el.props.style[1]).toMatchObject(styles.primary);

	// 	expect(text.props.style[0]).toMatchObject(styles.text);
	// 	expect(text.props.style[1]).toMatchObject(styles.primaryText);
	// });

	// test(`should render Button with secondary color styles`, () => {
	// 	const styles = Button.defaultStyles(BlueBaseTheme) as ButtonStyles;
	// 	const rendered = TestRenderer.create(
	// 		<Button styles={styles} color="secondary" testID="button-root">
	// 			Hello
	// 		</Button>
	// 	);

	// 	const el = rendered.root.findAllByProps({ testID: 'button-root' })[1];
	// 	const text = rendered.root.findByType(Text);

	// 	expect(el.props.style[0]).toMatchObject(styles.root);
	// 	expect(el.props.style[1]).toMatchObject(styles.secondary);

	// 	expect(text.props.style[0]).toMatchObject(styles.text);
	// 	expect(text.props.style[1]).toMatchObject(styles.secondaryText);
	// });

	// test(`should render Button with link color styles`, () => {
	// 	// const styles = Button.defaultStyles(BlueBaseTheme) as ButtonStyles;
	// 	const rendered = TestRenderer.create(
	// 		<Button styles={styles} color="link" testID="button-root">
	// 			Hello
	// 		</Button>
	// 	);

	// 	const el = rendered.root.findAllByProps({ testID: 'button-root' })[1];
	// 	const text = rendered.root.findByType(Text);

	// 	expect(el.props.style[0]).toMatchObject(styles.root);
	// 	expect(el.props.style[1]).toMatchObject(styles.link);

	// 	expect(text.props.style[0]).toMatchObject(styles.text);
	// 	expect(text.props.style[1]).toMatchObject(styles.linkText);
	// });

	// test(`should render Button with full width`, () => {
	// 	const styles = Button.defaultStyles(BlueBaseTheme) as ButtonStyles;
	// 	const rendered = TestRenderer.create(
	// 		<Button styles={styles} testID="button-root" fullWidth={true}>
	// 			Hello
	// 		</Button>
	// 	);

	// 	const el = rendered.root.findAllByProps({ testID: 'button-root' })[1];
	// 	const text = rendered.root.findByType(Text);

	// 	expect(el.props.style[0]).toMatchObject(styles.root);
	// 	expect(el.props.style[1]).toMatchObject(styles.default);
	// 	expect(el.props.style[2]).toMatchObject(styles.fullWidth);

	// 	expect(text.props.style[0]).toMatchObject(styles.text);
	// 	expect(text.props.style[1]).toMatchObject(styles.defaultText);
	// });

	test('should render Button with custom children', async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<Button testID="button-root" fullWidth>
					<Text testID="custom">Custom</Text>
				</Button>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Button);

		expect(wrapper.find('Button Text[testID="custom"]').last().text()).toBe('Custom');
	});

	test('should use TouchableNativeFeedback on android platform', async () => {
		jest.mock('react-native/Libraries/Utilities/Platform', () => {
			const Platform = jest.requireActual('react-native/Libraries/Utilities/Platform');
			Platform.OS = 'android';
			return Platform;
		});

		const wrapper = mount(
			<BlueBaseApp>
				<Button>Hello</Button>
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Button);

		expect(wrapper.find('Button TouchableNativeFeedback').length).toBe(1);
	});
});
