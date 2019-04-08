import { ComponentState, Image, View } from '../../../getComponent';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('ComponentState', module)


	.add('Everything', () => (
		<View style={{ width: '100%', height: 500, backgroundColor: '#fff' }}>
			<ComponentState
				title="Looks like your'e new here!"
				description="Start by creating your first entry."
				imageSource={{ uri: 'https://picsum.photos/200' }}
				styles={{ image: { width: 100, height: 100 } }}
				actionTitle="Tap to Create"
			/>
		</View>
	))

	.add('Only title', () => (
		<ComponentState title="A simple state" />
	))

	.add('Title with custom styles', () => (
		<ComponentState
			title="A simple state"
			styles={{ title: { color: 'green', fontSize: 20 } }}
		/>
	))

	.add('Only description', () => (
		<ComponentState description="A simple description" />
	))


	.add('Description with custom styles', () => (
		<ComponentState
			description="A simple description"
			styles={{ description: { color: 'green', fontSize: 20 } }}
		/>
	))


	.add('Only action title', () => (
		<ComponentState actionTitle="Bluerain" />
	))

	.add('Action button with onPress listener', () => {
		const Handler = () => console.log('clicked');

		return(
			<ComponentState
				actionTitle="Bluerain"
				actionOnPress={Handler}
			/>
		);
	})

	.add('Image with custom image component', () => {
		// tslint:disable-next-line:max-line-length
		const ImageComponent = <Image source={{ uri: 'https://picsum.photos/200' }} style={{ width: 200, height: 200 }} />;
		return (<ComponentState image={ImageComponent} />);
	})


	.add('Image with source path', () => (
		<ComponentState
			imageSource={{ uri: 'https://picsum.photos/200/200/?random' }}
			styles={{ image: { width: 100, height: 100 } }}
		/>
	));