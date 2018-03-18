import storiesOf, { bluerainStory } from '@blueeast/bluerain-storybook-addon';
import { BlueRain } from '../../index';
import React from 'react';

storiesOf('ComponentState', module)
	.add('Only title', bluerainStory((props: { bluerain: BlueRain }) => {

		const BR = props.bluerain;
		const ComponentState = BR.Components.get('ComponentState');

		return <ComponentState title="A simple state" />;
	}))
	.add('title with titleStyle prop', bluerainStory((props: { bluerain: BlueRain }) => {

		const BR = props.bluerain;
		const ComponentState = BR.Components.get('ComponentState');
		const Style = { color: 'green', fontSize: 20 };

		return <ComponentState title="A simple state" titleStyle={Style} />;
	}))
	.add('Only description', bluerainStory((props: { bluerain: BlueRain }) => {

		const BR = props.bluerain;
		const ComponentState = BR.Components.get('ComponentState');

		return <ComponentState description="A simple description" />;
	}))
	.add('description with Styles ', bluerainStory((props: { bluerain: BlueRain }) => {

		const BR = props.bluerain;
		const ComponentState = BR.Components.get('ComponentState');
		const Style={ color:'green',fontSize:20 };

		return <ComponentState description="A simple description"  descriptionStyle={Style} />;
	}))
	.add('Only buttonTitle', bluerainStory((props: { bluerain: BlueRain }) => {

		const BR = props.bluerain;
		const ComponentState = BR.Components.get('ComponentState');

		return <ComponentState buttonTitle="Bluerain"  />;
	}))
	.add('Button with buttonOnPress Prop', bluerainStory((props: { bluerain: BlueRain }) => {
		const Handler=() => console.log('clicked');

		const BR = props.bluerain;
		const ComponentState = BR.Components.get('ComponentState');

		return <ComponentState   buttonTitle="Bluerain" buttonOnPress={Handler}  />;
	}))
	.add('Button with buttonStyle prop', bluerainStory((props: { bluerain: BlueRain }) => {
		const BR = props.bluerain;
		const ComponentState = BR.Components.get('ComponentState');
		const Style={ color:'white',backgroundColor:'red',width:100,height:50,borderRadius:8, textAlign:'center' };

		return <ComponentState  buttonTitle="Bluerain"  buttonStyle={Style}  />;

	}))
	.add('Button Component', bluerainStory((props: { bluerain: BlueRain }) => {

		const Button=() =>  <button>ButtonComponent</button>;
		const BR = props.bluerain;
		const ComponentState = BR.Components.get('ComponentState');
		// const Style={ color:'white',backgroundColor:'red',width:100,height:50,borderRadius:8, textAlign:'center' };

		return <ComponentState  button={Button}  />;
	}))
	.add('imageComponent prop', bluerainStory((props: { bluerain: BlueRain }) => {

		const BR = props.bluerain;
		const Image = BR.Components.get('Image');
		const Style = { width: 200, height: 200 };
		// tslint:disable-next-line:max-line-length
		const ImageComponent = () => <Image source="https://lh3.googleusercontent.com/0-BzaWtxoAnsBjQ_wzUcKxyF07XE7v2Kkg1ogPVUdzmQpvaz118uHQEGU6BdtzJuzfo=h1264" imageStyle={Style} />;
		const ComponentState = BR.Components.get('ComponentState');
		return <ComponentState image={ImageComponent} />;
	}))

	.add('imageSource prop', bluerainStory((props: { bluerain: BlueRain }) => {

		const BR = props.bluerain;
		const Style={ width:200,height:200 };
		return (
			<BR.Components.ComponentState
				// tslint:disable-next-line:max-line-length
				imageSource="https://lh3.googleusercontent.com/0-BzaWtxoAnsBjQ_wzUcKxyF07XE7v2Kkg1ogPVUdzmQpvaz118uHQEGU6BdtzJuzfo=h1264"
				imageStyle={Style}
			/>
		);
	}));
