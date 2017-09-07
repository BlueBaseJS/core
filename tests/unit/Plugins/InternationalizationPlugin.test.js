/**
 * Created by umair on 9/6/17.
 */
import React from 'react';
import RX from 'reactxp';
import { shallow } from 'enzyme';
import BR from '../../../src';
import InternationalizationPlugin
  from '../../../src/plugins/InternationalizationPlugin';
describe('Internationalization Plugin tests', () => {
	it('', () => {
		class HelloWorld extends BR.App {
			static appName = 'Hello World';
			render() {
				return <div>Hello world</div>;
			}
    }
		const element = BR.boot({
			apps: [HelloWorld],
			plugins: [InternationalizationPlugin],
			renderApp: false
		});
		const wrapper = shallow(<element />);
		expect(wrapper.find('IntlProvider')).toBeTruthy();
	});
});
