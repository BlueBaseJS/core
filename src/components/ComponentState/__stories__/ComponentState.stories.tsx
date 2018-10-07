import { BlueRain, BlueRainConsumer } from '../../../';
import React from 'react';
import storiesOf from '@blueeast/bluerain-storybook-addon';

storiesOf('ComponentState', module)


	.add('Everything', () => (
		<BlueRainConsumer>
			{(BR: BlueRain) => (
				<BR.Components.ComponentState
					title="Error!"
					description="A unknown error occured!"
					imageSource="https://picsum.photos/200"
					imageStyle={{ width: 100, height: 100 }}
					actionTitle="Retry"
				/>
			)}
		</BlueRainConsumer>
	))

	.add('Only title', () => (
		<BlueRainConsumer>
		{(BR: BlueRain) => <BR.Components.ComponentState title="A simple state" />}
		</BlueRainConsumer>
	))

	.add('Title with custom styles', () => (
	<BlueRainConsumer>
		{(BR: BlueRain) => (
			<BR.Components.ComponentState
				title= "A simple state"
				titleStyle = {{ color: 'green', fontSize: 20 }}
			/>
		)}
		</BlueRainConsumer>
	))

	.add('Only description', () => (
		<BlueRainConsumer>
		{(BR: BlueRain) => (
			<BR.Components.ComponentState description= "A simple description" />
		)}
		</BlueRainConsumer>
	))


	.add('Description with custom styles', () => (
		<BlueRainConsumer>
		{(BR: BlueRain) => (
			<BR.Components.ComponentState
				description= "A simple description"
				descriptionStyle = {{ color: 'green', fontSize: 20 }}
			/>
		)}
		</BlueRainConsumer>
	))


	.add('Only action title', () => (
		<BlueRainConsumer>
		{(BR: BlueRain) => (
			<BR.Components.ComponentState actionTitle="Bluerain" />
		)}
		</BlueRainConsumer>
	))

	.add('Action button with onPress listener', () => (
		<BlueRainConsumer>
		{(BR: BlueRain) => {
			const Handler = () => console.log('clicked');

			return(
				<BR.Components.ComponentState
					actionTitle = "Bluerain"
					actionOnPress = { Handler }
				/>
			);
		}}
		</BlueRainConsumer>
	))

	.add('Action button with custom styles', () => (
		<BlueRainConsumer>
		{(BR: BlueRain) => (
			<BR.Components.ComponentState
				actionTitle= "Bluerain"
				actionStyle = {{
					// color: 'white',
					backgroundColor: 'red',
					width: 100,
					height: 50,
					borderRadius: 8,
					// textAlign: 'center'
				}}
			/>
		)}
		</BlueRainConsumer>
	))

	.add('Image with custom image component', () => (
		<BlueRainConsumer>
		{(BR: BlueRain) => {
			// tslint:disable-next-line:max-line-length
			const ImageComponent = <BR.Components.Image source="https://picsum.photos/200" style = {{ width: 200, height: 200 }} />;
			return (<BR.Components.ComponentState image={ImageComponent} />);
		}}
		</BlueRainConsumer>
	))


	.add('Image with source path', () => (
		<BlueRainConsumer>
			{(BR: BlueRain) => (
				<BR.Components.ComponentState
					imageSource="https://picsum.photos/200/200/?random"
					imageStyle={{ width: 100, height: 100 }}
				/>
			)}
		</BlueRainConsumer>
	));