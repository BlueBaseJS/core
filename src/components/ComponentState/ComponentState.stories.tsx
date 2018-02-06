import { BlueRainType, withBlueRain } from '../../index';
import React from 'react';
import storiesOf from '../../../storybook/storiesOf';

storiesOf('ComponentState', module)
	.add('Only title', () => {

		const Story = withBlueRain((props: { bluerain: BlueRainType }) => {

			const BR = props.bluerain;
			const ComponentState = BR.Components.get('ComponentState');

			return <ComponentState title="A simple state" />;
		});

		return <Story />;
	})

	.add('title with titleStyle prop', () => {

		const Story = withBlueRain((props: { bluerain: BlueRainType }) => {

			const BR = props.bluerain;
			const ComponentState = BR.Components.get('ComponentState');
			const Style={ color:'green',fontSize:20 };

			return <ComponentState title="A simple state" titleStyle={BR.Utils.createStyleSheet(Style)} />;
		});

		return <Story />;
	})

	.add('Only description', () => {

		const Story = withBlueRain((props: { bluerain: BlueRainType }) => {

			const BR = props.bluerain;
			const ComponentState = BR.Components.get('ComponentState');

			return <ComponentState description="A simple description" />;
		});

		return <Story />;
	})
	.add('description with Styles ', () => {

		const Story = withBlueRain((props: { bluerain: BlueRainType }) => {

			const BR = props.bluerain;
			const ComponentState = BR.Components.get('ComponentState');
			const Style={ color:'green',fontSize:20 };

			return <ComponentState description="A simple description"  descriptionStyle={Style} />;
		});

		return <Story />;
	})

	.add('Only buttonTitle', () => {

		const Story = withBlueRain((props: { bluerain: BlueRainType }) => {

			const BR = props.bluerain;
			const ComponentState = BR.Components.get('ComponentState');

			return <ComponentState buttonTitle="Bluerain"  />;
		});

		return <Story />;
	})

	.add('Button with buttonOnPress Prop', () => {

    	const Handler=() => console.log('clicked');
		const Story = withBlueRain((props: { bluerain: BlueRainType }) => {

			const BR = props.bluerain;
			const ComponentState = BR.Components.get('ComponentState');

			return <ComponentState   buttonTitle="Bluerain" buttonOnPress={Handler}  />;
		});

		return <Story />;
	})

	.add('Button with buttonStyle prop', () => {

		const Story = withBlueRain((props: { bluerain: BlueRainType }) => {

			const BR = props.bluerain;
			const ComponentState = BR.Components.get('ComponentState');
			const Style={ color:'white',backgroundColor:'red',width:100,height:50,borderRadius:8, textAlign:'center' };

			return <ComponentState  buttonTitle="Bluerain"  buttonStyle={BR.Utils.createStyleSheet(Style)}  />;
		});

		return <Story/>;
	})


	.add('Button Component', () => {

		const Story = withBlueRain((props: { bluerain: BlueRainType }) => {
			const Button=() =>  <button>ButtonComponent</button>;
			const BR = props.bluerain;
			const ComponentState = BR.Components.get('ComponentState');
			const Style={ color:'white',backgroundColor:'red',width:100,height:50,borderRadius:8, textAlign:'center' };

			return <ComponentState  button={Button}  />;
		});

		return <Story/>;
	})


	.add('imageComponent prop', () => {

		const Story = withBlueRain((props: { bluerain: BlueRainType }) => {

			const BR = props.bluerain;
			const Image = BR.Components.get('Image');
			const Style={ width:200,height:200 };
          	// tslint:disable-next-line:max-line-length
          	const ImageComponent=() => <Image source="https://lh3.googleusercontent.com/0-BzaWtxoAnsBjQ_wzUcKxyF07XE7v2Kkg1ogPVUdzmQpvaz118uHQEGU6BdtzJuzfo=h1264"  imageStyle={BR.Utils.createStyleSheet(Style)} />;
			const ComponentState = BR.Components.get('ComponentState');
        	return <ComponentState  image={ImageComponent} />;
		});

		return <Story/>;
	})


	.add('imageSource prop', () => {

		const Story = withBlueRain((props: { bluerain: BlueRainType }) => {

			const BR = props.bluerain;
			const Image = BR.Components.get('Image');
			const Style={ width:200,height:200 };
			const ComponentState = BR.Components.get('ComponentState');
			// tslint:disable-next-line:max-line-length
			return <ComponentState  imageSource="https://lh3.googleusercontent.com/0-BzaWtxoAnsBjQ_wzUcKxyF07XE7v2Kkg1ogPVUdzmQpvaz118uHQEGU6BdtzJuzfo=h1264"  imageStyle={BR.Utils.createStyleSheet(Style)} />;

		});

		return <Story/>;
	});











// storiesOf('ComponentState', module).add('Simple', () => <div>hello </div>);
