import React from 'react';
// import TestRenderer from 'react-test-renderer';
import { Header } from '../../..';
import { mount } from 'enzyme';
import { BlueBaseApp } from '../../BlueBaseApp';
import { waitForElement } from 'enzyme-async-helpers';
import { Text } from 'react-native';
import deepmerge = require('deepmerge');

const Right = () => { return <Text testID="right-element">Right</Text> };

describe('Header', () => {

	test(`should only render back image`, async () => {

    const wrapper = mount(
			<BlueBaseApp>
        <Header />
      </BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, Header);

		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('Header HeaderBackButton Image').length).toBe(1);
		expect(wrapper.find('Header [testID="header-back-title"]').length).toBe(0);
	});

	test(`should only render back image and title`, async () => {

    const wrapper = mount(
			<BlueBaseApp>
        <Header title="Foo" />
      </BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, Header);

		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('Header HeaderBackButton Image').length).toBe(1);
		expect(wrapper.find('Header [testID="header-title"] Text').last().text()).toBe('Foo');
	});

	test(`should not render anything when header prop is null`, async () => {

    const wrapper = mount(
			<BlueBaseApp>
        <Header header={null} title="Foo" />
      </BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, Header);

		expect(wrapper).toMatchSnapshot();

		expect(wrapper.find('Header').last().html()).toBe(null);
	});

	test(`should render transparent Header`, async () => {

    const wrapper = mount(
			<BlueBaseApp>
        <Header title="Foo" headerTransparent />
      </BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, Header);

		expect(wrapper).toMatchSnapshot();

		const text = wrapper.find('Header View').first().prop('style') as any;
		const textStyles = deepmerge.all(text.filter((a: any) => a !== undefined)) as any;

		expect(textStyles.backgroundColor).toBeUndefined();
	});

	test(`should not render a back button`, async () => {

    const wrapper = mount(
			<BlueBaseApp>
        <Header 
					title="Foo"
					headerLeft={null}
				/>
      </BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, Header);

		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('Header HeaderBackButton').length).toBe(0);
		expect(wrapper.find('Header [testID="header-title"] Text').last().text()).toBe('Foo');
	});

	test(`should not render a back button with custom button text`, async () => {

    const wrapper = mount(
			<BlueBaseApp>
        <Header 
					title="Foo"
					backTitleVisible
					headerBackTitle="Go Back"
				/>
      </BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, Header);

		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('Header HeaderBackButton Text').last().text()).toBe('Go Back');
		expect(wrapper.find('Header [testID="header-title"] Text').last().text()).toBe('Foo');
	});

	test(`should not render a right element`, async () => {

    const wrapper = mount(
			<BlueBaseApp>
        <Header 
					title="Foo"
					headerRight={<Right />}
				/>
      </BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, Header);

		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('Header Right Text').last().text()).toBe('Right');
	});

	test(`should not render a right element with custom styles`, async () => {

    const wrapper = mount(
			<BlueBaseApp>
        <Header 
					title="Foo"
					headerRight={<Right />}
					headerRightContainerStyle={{ backgroundColor: 'yellow' }}
					/>
      </BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, Header);

		const view = wrapper.find('Header [testID="header-right-container"]').last().prop('style') as any;
		const styles = deepmerge.all(view.filter((a: any) => a !== undefined)) as any;

		expect(wrapper).toMatchSnapshot();
		expect(styles.backgroundColor).toBe('yellow');
	});

	test(`should not render a left element with custom styles`, async () => {

    const wrapper = mount(
			<BlueBaseApp>
        <Header 
					title="Foo"
					headerRight={<Right />}
					headerLeftContainerStyle={{ backgroundColor: 'orange' }}
					/>
      </BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, Header);

		const view = wrapper.find('Header [testID="header-back-wrapper"]').first().prop('style') as any;
		const styles = deepmerge.all(view.filter((a: any) => a !== undefined)) as any;

		expect(wrapper).toMatchSnapshot();
		expect(styles.backgroundColor).toBe('orange');
	});


	test(`should only render back image and custom truncated title`, async () => {

    const wrapper = mount(
			<BlueBaseApp>
        <Header 
					title="Foo"
					headerRight={<Right />}
				/>
      </BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, Header);

		// Update layout
		(wrapper.find('Header SafeAreaView').last().prop('onLayout') as any)({
			nativeEvent: { layout: { width: 200 } }
		});
		wrapper.update();

		(wrapper.find('Header [testID="header-title"]').last().prop('onLayout') as any)({
			nativeEvent: { layout: { width: 50 } }
		});

		wrapper.update();
		wrapper.update();

		expect(wrapper).toMatchSnapshot();

		expect(wrapper.find('Header').last().state('initWidth')).toBe(200);
		expect(wrapper.find('Header').last().state('titleWidth')).toBe(50);
		// expect(wrapper.find('Header HeaderTitle[testID="header-title"]').last().prop('width')).toBe(75);
	});

	test(`should render back button and title with tint color`, async () => {

    const wrapper = mount(
			<BlueBaseApp>
        <Header 
					backTitleVisible
					headerTintColor="yellow"
					headerBackTitle="Go Back"
					title="Foo"
				/>
      </BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, Header);
		
		expect(wrapper).toMatchSnapshot();

		const title = wrapper.find('HeaderTitle').last().prop('style') as any;
		const image = wrapper.find('HeaderBackButton Image').last().prop('style') as any;
		const text = wrapper.find('HeaderBackButton Text').last().prop('style') as any;

		const imageStyles = deepmerge.all(image) as any;
		// A value is undefined in styles array. Filter it.
		const titleStyles = deepmerge.all(title.filter((a: any) => a !== undefined)) as any;
		const textStyles = deepmerge.all(text.filter((a: any) => a !== undefined)) as any;

		expect(wrapper).toMatchSnapshot();

		expect(titleStyles.color).toBe('yellow');
		expect(imageStyles.tintColor).toBe('yellow');
		expect(textStyles.color).toBe('yellow');
	});

	test(`should render custom title component`, async () => {

    const wrapper = mount(
			<BlueBaseApp>
        <Header 
					headerTitle={<Right />}
				/>
      </BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, Header);
		
		expect(wrapper).toMatchSnapshot();

		expect(wrapper.find('Header Right').last().length).toBeGreaterThan(0);
	});

	test(`should prefer headerTitle prop over title prop`, async () => {

    const wrapper = mount(
			<BlueBaseApp>
        <Header 
					headerTitle="Bar"
					title="Foo"
				/>
      </BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, Header);
		
		expect(wrapper).toMatchSnapshot();

		expect(wrapper.find('Header [testID="header-title"] Text').last().text()).toBe('Bar');
	});

	describe('android enviornment', () => {

		beforeEach(() => {
			jest.mock('Platform', () => {
				const Platform = (require as any).requireActual('Platform');
				Platform.OS = 'android';
				return Platform;
			});
		});

		test(`should only render on android platform`, async () => {


			const wrapper = mount(
				<BlueBaseApp>
					<Header />
				</BlueBaseApp>
			);
	
			// Wait for render
			await waitForElement(wrapper, Header);
	
			expect(wrapper).toMatchSnapshot();
			expect(wrapper.find('Header MaskedViewIOS').length).toBe(0);
		});
	});
	
	test(`should handler rtl layout`, async () => {

		jest.mock('I18nManager', () => {
			const I18nManager = (require as any).requireActual('I18nManager');
			I18nManager.isRTL = true;
			return I18nManager;
		});

    const wrapper = mount(
			<BlueBaseApp>
        <Header />
      </BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, Header);

		expect(wrapper).toMatchSnapshot();

		const styles = wrapper.find('Header').last().prop('styles') as any;
		expect(styles.iconMask.transform[0].scaleX).toBe(-1);
	});

});
