import React from 'react';
import Col from '../../src/Components/GridView/Column';
import Row from '../../src/Components/GridView/Row';
import {getComponentWidth,getComponentOffset,isHidden} from '../../src/Components/lib/helpers';

import BR, { App } from '../../src';
import Adapter from 'enzyme-adapter-react-16';
import {mount, shallow,  render, configure} from 'enzyme';
import Index from '../../src/pages/IndexPage';
import NotFound from '../../src/pages/NotFoundPage';
import Page from '../../src/pages/Page';

configure({ adapter: new Adapter() });


const View=()=>{

  return 'View';

  };

BR.boot({renderApp:false});
BR.Components.register('View',View);

describe('GridComponents tests', () => {

    document.body.innerHTML = '<div class="app-container"></div>';

it('Component column', () => {
  const wrapper = mount(<Col/>);
  expect(wrapper.find('Col'));
});
it('Component Row', () => {
  const wrapper = mount(<Row />);
  expect(wrapper.find('Row'));
});

it('Component Helpers', () => {

 getComponentWidth(768,'sm');
 getComponentWidth(768,'md');
 getComponentWidth(768,'lg');
 getComponentWidth(768,'xl');
 getComponentOffset(89,'lg');

  getComponentOffset(768,'sm');
  getComponentOffset(768,'md');
  getComponentOffset(768,'xs');
  getComponentOffset(768,'xl');
  isHidden(265,'md');

});
});