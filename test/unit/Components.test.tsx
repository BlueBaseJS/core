import BR,{ BlueRainProvider } from '../../src/index';
import { configure, mount,render,shallow  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CenterLayout from '../../src/layouts/CenterLayout';
import CompentStateButton from '../../src/components/ComponentState/ComponentStateButton';
import ComponeStateImage from '../../src/components/ComponentState/ComponentStateImage';
import ComponentStateText from '../../src/components/ComponentState/ComponentStateText';
import SystemAp,{} from '../../src/components/SystemApp/SystemApp';
import SystemContent from '../../src/components/SystemContent/SystemContent';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import { createApp as App } from '../../src/models/App';

import Component from '../../src/components/ComponentState/ComponentState';
import ComponentState from '../../src/components/ComponentState/';
import EmptyState from '../../src/components/StatefulComponent/EmptyState';
import ErrorPage from '../../src/pages/ErrorPage';
import LoadingPage from '../../src/pages/LoadingPage';
import ErrorState from '../../src/components/StatefulComponent/ErrorState';
import Icon from '../../src/components/Icon/Icon';
import ImageBackground from '../../src/components/ImageBackground/ImageBackground';
import IndexPage from '../../src/pages/IndexPage';
import LoadingState from '../../src/components/StatefulComponent/LoadingState';
import NotFoundPage from '../../src/pages/NotFoundPage';
import Page from '../../src/components/Page/Page';
import PropTypes from 'prop-types';
import React from 'react';
import StatefulComponent from '../../src/components/StatefulComponent/StatefulComponent';
import SystemApp from '../../src/SystemApp';
import SystemLayout from '../../src/layouts/SystemLayout';
import Wallpaper from '../../src/components/Wallpaper/Wallpaper';
import Platform from '../Platform';
configure({ adapter: new Adapter() });

beforeAll(() => {
	document.body.innerHTML = '<div class="app-container">' + '</div>';
});



describe('Component Registry test specifications', () => {
	it('should return conditional  component State ', () => {
		BR.Components.add('ErrorState',() => 'ErrorState');
		BR.Components.add('EmptyState',() => 'EmptyState');

		BR.Components.add('LoadingState',() => 'LoadingState');
		BR.Components.add('Image',() => 'Image');
		BR.Components.add('ImageBackground', ImageBackground);
	    BR.Components.add('Button',() => 'Button');
	    BR.Components.add('View',() => 'View');
		BR.Components.add('Text',() => 'Text');
		BR.Components.add('Page',() => 'Page');
		BR.Components.add('Wallpaper',() => 'Wallpaper');
		BR.Components.add('ComponentState',() => 'ComponentState');
		BR.Components.add('IndexPage',() => 'IndexPage');
		BR.Components.add('NotFoundPage',() => 'NotFoundPage');
		BR.Components.add('SystemLayout',() => 'SystemLayout');
		BR.Components.add('RouterSwitch',() => 'RouterSwitch');
		BR.Components.add('Route',() => 'Route');
		BR.Components.add('ActivityIndicator',() => 'ActivityIndicator');
		BR.Components.add('CenterLayout',() => 'CenterLayout');
		// tslint:disable-next-line:max-line-length
    	const wrapper=mount(<BlueRainProvider><Component image="" imageSource="https://www.gifs.com"   buttonTitle="App"/></BlueRainProvider>);
		expect(wrapper.find('Component')).toBeDefined();

	});

	    });
it('should return component CompentStateButton ', () => {
	const wrapper=mount(<BlueRainProvider><CompentStateButton buttonTitle="Button"  /></BlueRainProvider>);
	expect(wrapper.find('CompentStateButton')).toBeDefined();
});

it('should return component ErrorPage ', () => {

	const wrapper=mount(<BlueRainProvider><ErrorPage   /></BlueRainProvider>);
	 expect(wrapper.find('ErrorPage')).toBeDefined();
});


it('It should  CreateApp ', () => {
	const AppComponent=() => 'Component';
	const options ={ appName:'BluerainApp' };
	 expect(App(AppComponent,options)).toBeDefined();
});
it('should return Icon  Component', () => {
	const wrapper=mount(<BlueRainProvider><Icon/></BlueRainProvider>);
	expect(wrapper.find('Icon')).toBeDefined();
});

it('should return component CenterLayout', () => {
	const wrapper=mount(<BlueRainProvider><CenterLayout  /></BlueRainProvider>);
	expect(wrapper.find('CenterLayout')).toBeDefined();
});
it('should return component StatefulComponent ', () => {
	const wrapper=mount(<BlueRainProvider>
		<StatefulComponent>
		{() => {
			throw new Error('Boom!');
		}}
		</StatefulComponent>

		</BlueRainProvider>);
	expect(wrapper.find('StatefulComponent')).toBeDefined();
});
it('should return component EmptyState ', () => {
	const wrapper=mount(<BlueRainProvider><EmptyState  /></BlueRainProvider>);
	expect(wrapper.find('EmptyState')).toBeDefined();
});
it('should return component Loading State ', () => {
	const wrapper=mount(<BlueRainProvider><LoadingState  /></BlueRainProvider>);
	expect(wrapper.find('LoadingState')).toBeDefined();
});

it('should return component Erorr State ', () => {
	const wrapper=mount(<BlueRainProvider><ErrorState  /></BlueRainProvider>);
	expect(wrapper.find('ErrorState')).toBeDefined();
});
	  it('should return component CompentStateButton with title ', () => {
		const wrapper=mount(<BlueRainProvider><CompentStateButton  /></BlueRainProvider>);
	 expect(wrapper.find('CompentStateButton')).toBeDefined();
	});

	  it('should return component ComponentStatImage ', () => {
		const wrapper=mount(<BlueRainProvider><ComponeStateImage/></BlueRainProvider>);
	 expect(wrapper.find('ComponeStateImage')).toBeDefined();
	});

it('should return component ComponentStatImage with source prop ', () => {
	const wrapper=mount(<BlueRainProvider><ComponeStateImage  imageSource="https://www.gifs.com" /></BlueRainProvider>);
	 expect(wrapper.find('ComponeStateImage')).toBeDefined();
});

it('should return component ComponentStateText ', () => {
	const wrapper=mount(<BlueRainProvider><ComponentStateText  /></BlueRainProvider>);
	 expect(wrapper.find('ComponentStateText')).toBeDefined();
});

it('should return component ComponentStateText  with text prop', () => {
	const wrapper=mount(<BlueRainProvider><ComponentStateText text="title"  /></BlueRainProvider>);
	 expect(wrapper.find('ComponentStateText')).toBeDefined();
});

it('should return component ComponentState ', () => {
	const wrapper=mount(<BlueRainProvider><ComponentState/></BlueRainProvider>);
	 expect(wrapper.find('ComponentState')).toBeDefined();
});



it('should return component default  State ', () => {
		 // tslint:disable-next-line:max-line-length
	 const wrapper=mount(<BlueRainProvider><Component title="component" description="App of Components" /></BlueRainProvider>);
	  expect(wrapper.find('Component')).toBeDefined();
	 });

	  it('should return component default  State ', () => {
       	// tslint:disable-next-line:max-line-length
       	const wrapper=mount(<BlueRainProvider><Component title="component" description="App of Components" /></BlueRainProvider>);
		expect(wrapper.find('Component')).toBeDefined();
	   });



it('should return ImageBackground Component', () => {

	const wrapper=mount(<BlueRainProvider><ImageBackground/></BlueRainProvider>);
	expect(wrapper.find('ImageBackground')).toBeDefined();
});

it('should return ImageBackground Component with backgroundColor prop', () => {

	const wrapper=mount(<BlueRainProvider><ImageBackground  backgroundColor="red"/></BlueRainProvider>);
	expect(wrapper.find('ImageBackground')).toBeDefined();
});
it('should return Page Component', () => {

	const wrapper=mount(<BlueRainProvider><Page/></BlueRainProvider>);
	expect(wrapper.find('Page')).toBeDefined();
});

it('should return SystemLayout Component', () => {

	const wrapper=mount(<BlueRainProvider><SystemLayout/></BlueRainProvider>);
	expect(wrapper.find('SystemLayout')).toBeDefined();
});


it('should return Wallpaper Component', () => {

	const wrapper=mount(<BlueRainProvider><Wallpaper /></BlueRainProvider>);
	expect(wrapper.find('Wallpaper')).toBeDefined();
});


it('should return IndexPage Component', () => {

	const wrapper=mount(<BlueRainProvider><IndexPage/></BlueRainProvider>);
	expect(wrapper.find('IndexPage')).toBeDefined();
});
it('should return NotFoundPage Component', () => {

	const wrapper=mount(<BlueRainProvider><NotFoundPage/></BlueRainProvider>);
	expect(wrapper.find('NotFoundPage')).toBeDefined();
});

it('should return SystemApp Component', () => {

	const wrapper=mount(<BlueRainProvider><SystemApp/></BlueRainProvider>);
	expect(wrapper.find('SystemApp')).toBeDefined();
});

it('should return SystemAp Component', () => {

	const RouterSwitch=() => 'RouterSwitch';
	const ReactRouterConfig={
		androidBackButton: true,
		deepLinking: true,
		forceMemoryHistory:false,
		historyConfigs: {},
	};
	BR.Configs.set('plugins.router',ReactRouterConfig);

	BR.boot({ platform:[Platform],renderApp:false });

	BR.Components.replace('RouterSwitch',RouterSwitch);

	const mockStore = configureMockStore(
        []
    );
	const mockStoreInitialized = mockStore({
		bluerain: {
			intl:{
				locale:'en'
			}
		}
	});

	const options=[];
        // tslint:disable-next-line:max-line-length

	const wrapper=mount(<BlueRainProvider><Provider store={mockStoreInitialized}><SystemAp/></BlueRainProvider></Provider>);
	expect(wrapper.find('SystemAp')).toBeDefined();

});

it('should return SystemContent Component', () => {
	const wrapper=mount(<BlueRainProvider><SystemContent/></BlueRainProvider>);
	expect(wrapper.find('SystemContent')).toBeDefined();
});

