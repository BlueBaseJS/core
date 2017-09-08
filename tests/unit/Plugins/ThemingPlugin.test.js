/**
 * Created by umair on 9/7/17.
 */
import React from 'react';
import { mount, shallow } from 'enzyme';
import BR from '../../../src';
import ThemingPlugin from '../../../src/plugins/themingPlugin';
describe('Theming Plugin tests', () => {
  it('should add plugin', () => {
    class HelloWorld extends BR.App {
      static appName = 'Hello World';
      render() {
        return <div>Hello world</div>;
      }
    }
    BR.boot({
      apps: [HelloWorld],
      plugins: [ThemingPlugin],
      renderApp: false
    });
    expect(BR.Filters.FiltersTable['bluerain.redux.reducers.bluerain'].length).toEqual(2);

  });
  it('should tests with theme', () => {
    class HelloWorld extends BR.App {
      static appName = 'Hello World';
      render() {
        return <div>Hello world</div>;
      }
    }
    const mycomponent = ThemingPlugin.withTheme(HelloWorld)
    const wrapper = mount(<mycomponent />)
    expect(wrapper.type()).toEqual('mycomponent');

  });
});
