import { BlueRainType } from '../../index';
import { bluerainStory } from '../../../storybook/bluerain';
import React from 'react';
import storiesOf from '../../../storybook/storiesOf';

storiesOf('ComponentState', module)
	.add('Only title', bluerainStory((props: { bluerain: BlueRainType }) => {

		const BR = props.bluerain;
		const ComponentState = BR.Components.get('ComponentState');

		return <ComponentState title="A simple state" />;
	}))
	.add('title with titleStyle prop', bluerainStory((props: { bluerain: BlueRainType }) => {

		const BR = props.bluerain;
		const ComponentState = BR.Components.get('ComponentState');
		const Style = { color: 'green', fontSize: 20 };

		return <ComponentState title="A simple state" titleStyle={BR.Utils.createStyleSheet(Style)} />;
	}))
	.add('Only description', bluerainStory((props: { bluerain: BlueRainType }) => {

		const BR = props.bluerain;
		const ComponentState = BR.Components.get('ComponentState');

		return <ComponentState description="A simple description" />;
	}))
	.add('description with Styles ', bluerainStory((props: { bluerain: BlueRainType }) => {

		const BR = props.bluerain;
		const ComponentState = BR.Components.get('ComponentState');
		const Style={ color:'green',fontSize:20 };

		return <ComponentState description="A simple description"  descriptionStyle={Style} />;
	}))
	.add('Only buttonTitle', bluerainStory((props: { bluerain: BlueRainType }) => {

		const BR = props.bluerain;
		const ComponentState = BR.Components.get('ComponentState');

		return <ComponentState buttonTitle="Bluerain"  />;
	}))
	.add('Button with buttonOnPress Prop', bluerainStory((props: { bluerain: BlueRainType }) => {
		const Handler=() => console.log('clicked');

		const BR = props.bluerain;
		const ComponentState = BR.Components.get('ComponentState');

		return <ComponentState   buttonTitle="Bluerain" buttonOnPress={Handler}  />;
	}))
	.add('Button with buttonStyle prop', bluerainStory((props: { bluerain: BlueRainType }) => {
		const BR = props.bluerain;
		const ComponentState = BR.Components.get('ComponentState');
		const Style={ color:'white',backgroundColor:'red',width:100,height:50,borderRadius:8, textAlign:'center' };

		return <ComponentState  buttonTitle="Bluerain"  buttonStyle={BR.Utils.createStyleSheet(Style)}  />;

	}))
	.add('Button Component', bluerainStory((props: { bluerain: BlueRainType }) => {

		const Button=() =>  <button>ButtonComponent</button>;
		const BR = props.bluerain;
		const ComponentState = BR.Components.get('ComponentState');
		// const Style={ color:'white',backgroundColor:'red',width:100,height:50,borderRadius:8, textAlign:'center' };

		return <ComponentState  button={Button}  />;
	}))
	.add('imageComponent prop', bluerainStory((props: { bluerain: BlueRainType }) => {

		const BR = props.bluerain;
		const Image = BR.Components.get('Image');
		const Style = { width: 200, height: 200 };
		// tslint:disable-next-line:max-line-length
		const ImageComponent = () => <Image source="https://lh3.googleusercontent.com/0-BzaWtxoAnsBjQ_wzUcKxyF07XE7v2Kkg1ogPVUdzmQpvaz118uHQEGU6BdtzJuzfo=h1264" imageStyle={BR.Utils.createStyleSheet(Style)} />;
		const ComponentState = BR.Components.get('ComponentState');
		return <ComponentState image={ImageComponent} />;
	}))

	.add('imageSource prop', bluerainStory((props: { bluerain: BlueRainType }) => {

		const BR = props.bluerain;
		// const Image = BR.Components.get('Image');
		const Style={ width:200,height:200 };
		const ComponentState = BR.Components.get('ComponentState');
		// tslint:disable-next-line:max-line-length
		return <ComponentState  imageSource="https://lh3.googleusercontent.com/0-BzaWtxoAnsBjQ_wzUcKxyF07XE7v2Kkg1ogPVUdzmQpvaz118uHQEGU6BdtzJuzfo=h1264"  imageStyle={BR.Utils.createStyleSheet(Style)} />;
	}));

// storiesOf('ComponentState', module).add('Simple', () => <div>hello </div>);
