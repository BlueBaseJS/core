import { BlueRainType, withBlueRain } from '../../index';
import React from 'react';
import storiesOf from '../../../storybook/storiesOf';

storiesOf('ImageBackground', module)
	.add('Only title', () => {

		const Story = withBlueRain((props: { bluerain: BlueRainType }) => {

			const BR = props.bluerain;
			const ImageBackground = BR.Components.get('ImageBackground');
			const Image = BR.Components.get('Image');

			const Style={ width:400,height:200 };
			const ImageComponent=() =>

			// tslint:disable-next-line:max-line-length
			<Image source="https://lh3.googleusercontent.com/0-BzaWtxoAnsBjQ_wzUcKxyF07XE7v2Kkg1ogPVUdzmQpvaz118uHQEGU6BdtzJuzfo=h1264" style={BR.Utils.createStyleSheet(Style)}/>;

			return <ImageBackground  backgroundColor="green" ><ImageComponent/></ImageBackground>;
		});

		return <Story />;
	});





// storiesOf('ComponentState', module).add('Simple', () => <div>hello </div>);
