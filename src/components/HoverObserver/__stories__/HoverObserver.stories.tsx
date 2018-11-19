import { BlueBase, BlueBaseConsumer } from '../../..';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';
// import { SystemApp } from '../SystemApp';

storiesOf('HoverObserver', module)

	.add('Basic Example', () => (
		<BlueBaseConsumer>
			{(BB: BlueBase) => (
				<BB.Components.HoverObserver>
					<BB.Components.Text>Text as a children</BB.Components.Text>
				</BB.Components.HoverObserver>
			)}
		</BlueBaseConsumer>
	))

	.add('with onHoverChanged', () => (
		<BlueBaseConsumer>
			{(BB: BlueBase) => (
				<BB.Components.HoverObserver onHoverChanged={() => console.log('onHoverChanged')}>
					<BB.Components.Text>Text as a children with onHoverChanged</BB.Components.Text>
				</BB.Components.HoverObserver>
			)}
		</BlueBaseConsumer>
	))

	.add('with onHoverChanged with event object', () => (
		<BlueBaseConsumer>
			{(BB: BlueBase) => (
				<BB.Components.HoverObserver onHoverChanged={(e: any) => console.log('onHoverChanged ', e)}>
					<BB.Components.Text>Text as a children with onHoverChanged with event object</BB.Components.Text>
				</BB.Components.HoverObserver>
			)}
		</BlueBaseConsumer>
	))

	.add('with onHoverChanged with hoverDelayInMs', () => (
		<BlueBaseConsumer>
			{(BB: BlueBase) => (
				<BB.Components.HoverObserver
					onHoverChanged={() => console.log('onHoverChanged after one second')}
					hoverDelayInMs={1000}
				>
					<BB.Components.Text>Text as a children with onHoverChanged</BB.Components.Text>
				</BB.Components.HoverObserver>
			)}
		</BlueBaseConsumer>
	))

	.add('with onHoverChanged with hoverDelayInMs and hoverOffDelayInMs both', () => (
		<BlueBaseConsumer>
			{(BB: BlueBase) => (
				<BB.Components.HoverObserver
					onHoverChanged={(e: any) => console.log(`${e.isHovering ? 'onHoverStart' : 'onHoverEnd'} after one second delay `)}
					hoverDelayInMs={1000}
					hoverOffDelayInMs={1000}
				>
					<BB.Components.Text>Text as a children with onHoverChanged
						with hoverDelayInMs and hoverOffDelayInMs both</BB.Components.Text>
				</BB.Components.HoverObserver>
			)}
		</BlueBaseConsumer>
	))

	.add('with onMouseEnter', () => (
		<BlueBaseConsumer>
			{(BB: BlueBase) => (
				<BB.Components.HoverObserver onMouseEnter={() => console.log('onMouseEnter')}>
					<BB.Components.Text>Text as a children with onMouseEnter</BB.Components.Text>
				</BB.Components.HoverObserver>
			)}
		</BlueBaseConsumer>
	))

	.add('with onMouseEnter with event object', () => (
		<BlueBaseConsumer>
			{(BB: BlueBase) => (
				<BB.Components.HoverObserver onMouseEnter={(e: any) => console.log('onMouseEnter ', e)}>
					<BB.Components.Text>Text as a children with onMouseEnter with event object</BB.Components.Text>
				</BB.Components.HoverObserver>
			)}
		</BlueBaseConsumer>
	))

	.add('with onMouseLeave', () => (
		<BlueBaseConsumer>
			{(BB: BlueBase) => (
				<BB.Components.HoverObserver onMouseLeave={() => console.log('onMouseLeave')}>
					<BB.Components.Text>Text as a children with onMouseLeave</BB.Components.Text>
				</BB.Components.HoverObserver>
			)}
		</BlueBaseConsumer>
	))

	.add('with onMouseLeave with event object', () => (
		<BlueBaseConsumer>
			{(BB: BlueBase) => (
				<BB.Components.HoverObserver onMouseLeave={(e: any) => console.log('onMouseLeave ', e)}>
					<BB.Components.Text>Text as a children with onMouseLeave with event object</BB.Components.Text>
				</BB.Components.HoverObserver>
			)}
		</BlueBaseConsumer>
	))

	.add('with onMouseOver', () => (
		<BlueBaseConsumer>
			{(BB: BlueBase) => (
				<BB.Components.HoverObserver onMouseOver={() => console.log('onMouseOver')}>
					<BB.Components.Text>Text as a children with onMouseOver</BB.Components.Text>
				</BB.Components.HoverObserver>
			)}
		</BlueBaseConsumer>
	))

	.add('with onMouseOver with event object', () => (
		<BlueBaseConsumer>
			{(BB: BlueBase) => (
				<BB.Components.HoverObserver onMouseOver={(e: any) => console.log('onMouseOver ', e)}>
					<BB.Components.Text>Text as a children with onMouseOver with event object</BB.Components.Text>
				</BB.Components.HoverObserver>
			)}
		</BlueBaseConsumer>
	))

	.add('with onMouseOut', () => (
		<BlueBaseConsumer>
			{(BB: BlueBase) => (
				<BB.Components.HoverObserver onMouseOut={() => console.log('onMouseOut')}>
					<BB.Components.Text>Text as a children with onMouseOut</BB.Components.Text>
				</BB.Components.HoverObserver>
			)}
		</BlueBaseConsumer>
	))

	.add('with onMouseOut with event object', () => (
		<BlueBaseConsumer>
			{(BB: BlueBase) => (
				<BB.Components.HoverObserver onMouseOut={(e: any) => console.log('onMouseOut ', e)}>
					<BB.Components.Text>Text as a children with onMouseOut with event object</BB.Components.Text>
				</BB.Components.HoverObserver>
			)}
		</BlueBaseConsumer>
	));