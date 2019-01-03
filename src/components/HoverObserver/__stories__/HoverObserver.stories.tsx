import { HoverObserver, Text } from '../../../getComponent';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';
// import { SystemApp } from '../SystemApp';

storiesOf('HoverObserver', module)

	.add('Basic Example', () => (
		<HoverObserver>
			<Text>Text as a children</Text>
		</HoverObserver>
	))

	.add('with onHoverChanged', () => (
		<HoverObserver onHoverChanged={() => console.log('onHoverChanged')}>
			<Text>Text as a children with onHoverChanged</Text>
		</HoverObserver>
	))

	.add('with onHoverChanged with event object', () => (
		<HoverObserver onHoverChanged={(e: any) => console.log('onHoverChanged ', e)}>
			<Text>Text as a children with onHoverChanged with event object</Text>
		</HoverObserver>
	))

	.add('with onHoverChanged with hoverDelayInMs', () => (
		<HoverObserver
			onHoverChanged={() => console.log('onHoverChanged after one second')}
			hoverDelayInMs={1000}
		>
			<Text>Text as a children with onHoverChanged</Text>
		</HoverObserver>
	))

	.add('with onHoverChanged with hoverDelayInMs and hoverOffDelayInMs both', () => (
		<HoverObserver
			onHoverChanged={(e: any) => console.log(`${e.isHovering ? 'onHoverStart' : 'onHoverEnd'} after one second delay `)}
			hoverDelayInMs={1000}
			hoverOffDelayInMs={1000}
		>
			<Text>Text as a children with onHoverChanged
				with hoverDelayInMs and hoverOffDelayInMs both</Text>
		</HoverObserver>
	))

	.add('with onMouseEnter', () => (
		<HoverObserver onMouseEnter={() => console.log('onMouseEnter')}>
			<Text>Text as a children with onMouseEnter</Text>
		</HoverObserver>
	))

	.add('with onMouseEnter with event object', () => (
		<HoverObserver onMouseEnter={(e: any) => console.log('onMouseEnter ', e)}>
			<Text>Text as a children with onMouseEnter with event object</Text>
		</HoverObserver>
	))

	.add('with onMouseLeave', () => (
		<HoverObserver onMouseLeave={() => console.log('onMouseLeave')}>
			<Text>Text as a children with onMouseLeave</Text>
		</HoverObserver>
	))

	.add('with onMouseLeave with event object', () => (
		<HoverObserver onMouseLeave={(e: any) => console.log('onMouseLeave ', e)}>
			<Text>Text as a children with onMouseLeave with event object</Text>
		</HoverObserver>
	))

	.add('with onMouseOver', () => (
		<HoverObserver onMouseOver={() => console.log('onMouseOver')}>
			<Text>Text as a children with onMouseOver</Text>
		</HoverObserver>
	))

	.add('with onMouseOver with event object', () => (
		<HoverObserver onMouseOver={(e: any) => console.log('onMouseOver ', e)}>
			<Text>Text as a children with onMouseOver with event object</Text>
		</HoverObserver>
	))

	.add('with onMouseOut', () => (
		<HoverObserver onMouseOut={() => console.log('onMouseOut')}>
			<Text>Text as a children with onMouseOut</Text>
		</HoverObserver>
	))

	.add('with onMouseOut with event object', () => (
		<HoverObserver onMouseOut={(e: any) => console.log('onMouseOut ', e)}>
			<Text>Text as a children with onMouseOut with event object</Text>
		</HoverObserver>
	));