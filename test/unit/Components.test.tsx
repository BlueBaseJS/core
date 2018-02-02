import BR,{ BlueRainProvider } from '../../src/index';
import { configure, mount,render,shallow  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CompentStateButton from '../../src/components/ComponentState/ComponentStateButton';
import ComponeStateImage from '../../src/components/ComponentState/ComponentStateImage';
import Component from '../../src/components/ComponentState/ComponentState';
import ComponentState from '../../src/components/ComponentState/';
import ComponentStateText from '../../src/components/ComponentState/ComponentStateText';
import ImageBackground from '../../src/components/ImageBackground/ImageBackground';
import IndexPage from '../../src/pages/IndexPage';
import NotFoundPage from '../../src/pages/NotFoundPage';
import Page from '../../src/components/Page/Page';
import PropTypes from 'prop-types';
import React from 'react';
import SystemApp from '../../src/SystemApp';
import SystemLayout from '../../src/layouts/SystemLayout';
import Wallpaper from '../../src/components/Wallpaper/Wallpaper';
import checkHooks from '../../src/checkHooks';

configure({ adapter: new Adapter() });

beforeAll(() => {
	document.body.innerHTML = '<div class="app-container">' + '</div>';
});


describe('Component Registry test specifications', () => {
	it('should return conditional  component State ', () => {

	    BR.Components.set('Image',() => 'Image');
	    BR.Components.set('Button',() => 'Button');
	    BR.Components.set('View',() => 'View');
		BR.Components.set('Text',() => 'Text');
		BR.Components.set('Page',() => 'Page');
		BR.Components.set('Wallpaper',() => 'Wallpaper');
		BR.Components.set('ComponentState',() => 'ComponentState');
		BR.Components.set('IndexPage',() => 'IndexPage');
		BR.Components.set('NotFoundPage',() => 'NotFoundPage');
		BR.Components.set('SystemLayout',() => 'SystemLayout');
		BR.Components.set('RouterSwitch',() => 'RouterSwitch');
		BR.Components.set('Route',() => 'Route');
		// tslint:disable-next-line:max-line-length
    	const wrapper=mount(<BlueRainProvider><Component image="" imageSource="https://www.gifs.com"   buttonTitle="App"/></BlueRainProvider>);
		expect(wrapper.find('Component')).toBeDefined();

	    });
	it('should return component CompentStateButton ', () => {
		const wrapper=mount(<BlueRainProvider><CompentStateButton buttonTitle="Button"  /></BlueRainProvider>);
	 expect(wrapper.find('Component')).toBeDefined();
	});

	  it('should return component CompentStateButton with title ', () => {
		const wrapper=mount(<BlueRainProvider><CompentStateButton  /></BlueRainProvider>);
	 expect(wrapper.find('Component')).toBeDefined();
	});

	  it('should return component CompentStateButton ', () => {
		const wrapper=mount(<BlueRainProvider><ComponeStateImage/></BlueRainProvider>);
	 expect(wrapper.find('Component')).toBeDefined();
	});


	it('should return component CompentStateButton ', () => {
		const wrapper=mount(<BlueRainProvider><ComponentStateText/></BlueRainProvider>);
	 expect(wrapper.find('Component')).toBeDefined();
	});

	it('should return component CompentStateButton ', () => {
		const wrapper=mount(<BlueRainProvider><ComponentState/></BlueRainProvider>);
	 expect(wrapper.find('Component')).toBeDefined();
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

	it('should return checkHooks Component', () => {
        	const wrapper=mount(<BlueRainProvider><checkHooks/></BlueRainProvider>);
		expect(wrapper.find('checkHooks')).toBeDefined();
	});

});
