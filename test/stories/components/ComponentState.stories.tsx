import { BlueRain, BlueRainConsumer } from '../../../src';
import React from 'react';
import storiesOf from '@blueeast/bluerain-storybook-addon';

storiesOf('ComponentState', module)

	.add('Only title', () => (
		<BlueRainConsumer>
			{(BR: BlueRain) => <BR.Components.ComponentState title="A simple state" />}
		</BlueRainConsumer>
	))

	.add('title with titleStyle prop', () => (
		<BlueRainConsumer>
			{(BR: BlueRain) => (
				<BR.Components.ComponentState
					title="A simple state"
					titleStyle={{ color: 'green', fontSize: 20 }}
				/>
			)}
		</BlueRainConsumer>
	))

	.add('Only description', () => (
		<BlueRainConsumer>
			{(BR: BlueRain) => (
				<BR.Components.ComponentState description="A simple description" />
			)}
		</BlueRainConsumer>
	))


	.add('description with Styles', () => (
		<BlueRainConsumer>
			{(BR: BlueRain) => (
				<BR.Components.ComponentState
					description="A simple description"
					descriptionStyle={{ color: 'green', fontSize: 20 }}
				/>
			)}
		</BlueRainConsumer>
	))


	.add('Only buttonTitle', () => (
		<BlueRainConsumer>
			{(BR: BlueRain) => (
				<BR.Components.ComponentState
					buttonTitle="Bluerain"
				/>
			)}
		</BlueRainConsumer>
	))

	.add('Button with buttonOnPress Prop', () => (
		<BlueRainConsumer>
			{(BR: BlueRain) => {
				const Handler = () => console.log('clicked');

				return (
					<BR.Components.ComponentState
						buttonTitle="Bluerain"
						buttonOnPress={Handler}
					/>
				);
			}}
		</BlueRainConsumer>
	))

	.add('Button with buttonStyle prop', () => (
		<BlueRainConsumer>
			{(BR: BlueRain) => (
				<BR.Components.ComponentState
					buttonTitle="Bluerain"
					buttonStyle={{
						color: 'white',
						backgroundColor: 'red',
						width: 100,
						height: 50,
						borderRadius: 8,
						textAlign: 'center'
					}}
				/>
			)}
		</BlueRainConsumer>
	))

	.add('Button Component', () => (
		<BlueRainConsumer>
			{(BR: BlueRain) => {
				const Button = () => <button>ButtonComponent</button>;
				return (
					<BR.Components.ComponentState
						button={Button}
					/>
				);
			}}
		</BlueRainConsumer>
	))

	.add('imageComponent prop', () => (
		<BlueRainConsumer>
			{(BR: BlueRain) => {
				// tslint:disable-next-line:max-line-length
				const ImageComponent = () => <BR.Components.Image source="https://lh3.googleusercontent.com/0-BzaWtxoAnsBjQ_wzUcKxyF07XE7v2Kkg1ogPVUdzmQpvaz118uHQEGU6BdtzJuzfo=h1264" style={{ width: 200, height: 200 }} />;
				return (
					<BR.Components.ComponentState
						image={ImageComponent}
					/>
				);
			}}
		</BlueRainConsumer>
	))


	.add('imageSource prop', () => (
		<BlueRainConsumer>
			{(BR: BlueRain) => (
				<BR.Components.ComponentState
					// tslint:disable-next-line:max-line-length
					imageSource="https://lh3.googleusercontent.com/0-BzaWtxoAnsBjQ_wzUcKxyF07XE7v2Kkg1ogPVUdzmQpvaz118uHQEGU6BdtzJuzfo=h1264"
					imageStyle={{ width: 200, height: 200 }}
				/>
			)}
		</BlueRainConsumer>
	));
