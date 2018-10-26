import { BlueBase, BlueBaseConsumer } from '../../../';
import React from 'react';
import storiesOf from '@blueeast/bluerain-storybook-addon';

storiesOf('ComponentState', module)


	.add('Everything', () => (
		<BlueBaseConsumer>
			{(BB: BlueBase) => (
				<BB.Components.ComponentState
					title="Error!"
					description="A unknown error occured!"
					imageSource="https://picsum.photos/200"
					imageStyle={{ width: 100, height: 100 }}
					actionTitle="Retry"
				/>
			)}
		</BlueBaseConsumer>
	))

	.add('Only title', () => (
		<BlueBaseConsumer>
		{(BB: BlueBase) => <BB.Components.ComponentState title="A simple state" />}
		</BlueBaseConsumer>
	))

	.add('Title with custom styles', () => (
	<BlueBaseConsumer>
		{(BB: BlueBase) => (
			<BB.Components.ComponentState
				title= "A simple state"
				titleStyle = {{ color: 'green', fontSize: 20 }}
			/>
		)}
		</BlueBaseConsumer>
	))

	.add('Only description', () => (
		<BlueBaseConsumer>
		{(BB: BlueBase) => (
			<BB.Components.ComponentState description= "A simple description" />
		)}
		</BlueBaseConsumer>
	))


	.add('Description with custom styles', () => (
		<BlueBaseConsumer>
		{(BB: BlueBase) => (
			<BB.Components.ComponentState
				description= "A simple description"
				descriptionStyle = {{ color: 'green', fontSize: 20 }}
			/>
		)}
		</BlueBaseConsumer>
	))


	.add('Only action title', () => (
		<BlueBaseConsumer>
		{(BB: BlueBase) => (
			<BB.Components.ComponentState actionTitle="Bluerain" />
		)}
		</BlueBaseConsumer>
	))

	.add('Action button with onPress listener', () => (
		<BlueBaseConsumer>
		{(BB: BlueBase) => {
			const Handler = () => console.log('clicked');

			return(
				<BB.Components.ComponentState
					actionTitle = "Bluerain"
					actionOnPress = { Handler }
				/>
			);
		}}
		</BlueBaseConsumer>
	))

	.add('Action button with custom styles', () => (
		<BlueBaseConsumer>
		{(BB: BlueBase) => (
			<BB.Components.ComponentState
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
		</BlueBaseConsumer>
	))

	.add('Image with custom image component', () => (
		<BlueBaseConsumer>
		{(BB: BlueBase) => {
			// tslint:disable-next-line:max-line-length
			const ImageComponent = <BB.Components.Image source="https://picsum.photos/200" style = {{ width: 200, height: 200 }} />;
			return (<BB.Components.ComponentState image={ImageComponent} />);
		}}
		</BlueBaseConsumer>
	))


	.add('Image with source path', () => (
		<BlueBaseConsumer>
			{(BB: BlueBase) => (
				<BB.Components.ComponentState
					imageSource="https://picsum.photos/200/200/?random"
					imageStyle={{ width: 100, height: 100 }}
				/>
			)}
		</BlueBaseConsumer>
	));