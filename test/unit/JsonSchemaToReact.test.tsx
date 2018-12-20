import React from 'react';
import BR from '../../src/index';

class Paragraph extends React.Component {
	render() {
		return <p>{this.props.paragraph}</p>;
	}
}
class Heading extends React.Component {
	render() {
		return <h1>{this.props.text}</h1>;
	}
}
BR.Components.set('Heading', Heading);
describe('Json to react tests', () => {
	it('should not throw error for null schema', () => {
		expect(() => BR.API.JsonToReact.parse(null)).toThrow();
	});
	it('should throw error for undefined schema', () => {
		expect(() => BR.API.JsonToReact.parse(undefined)).toThrow();
	});
	it('should throw error for empty schema', () => {
		expect(() => BR.API.JsonToReact.parse({})).toThrow();
	});
	it('should render heading', () => {
		const schema = {
			component: 'h1',

			children: [
				{
					component: 'h2',
					text: 'Bye World!'
				}
			]
		};
		const value = BR.API.JsonToReact.parse(schema);
		expect(value.type).toEqual('h1');
		expect(value.props.children[0].type).toEqual('h2');
		expect(value.props.children[0].props.children).toEqual('Bye World!');
	});
	it('should render heading in a div', () => {
		const schema = {
			component: 'div',

			children: [
				{
					component: 'h2',
					text: 'Bye World!',
					props: {}
				}
			]
		};
		const value = BR.API.JsonToReact.parse(schema);
		expect(value.type).toEqual('div');
		expect(value.props.children[0].type).toEqual('h2');
		expect(value.props.children[0].props.children).toEqual('Bye World!');
	});
	it('should render Paragragh component', () => {
		const schema = {
			component: Paragraph,
			props: {
				paragraph: 'this is a pragraph'
			}
		};
		const value = BR.API.JsonToReact.parse(schema);
		expect(value.props.paragraph).toEqual('this is a pragraph');
	});
	it('should throw error', () => {
		const schema = {
			component: 'abcdcomponent',
			props: {
				paragraph: 'this is a pragraph'
			}
		};

		expect(() => BR.API.JsonToReact.parse(schema)).toThrow();
	});
	it('should render heading component', () => {
		const schema = {
			component: 'Heading',
			props: {
				text: 'this is a heading'
			}
		};
		const value = BR.API.JsonToReact.parse(schema);
		expect(value.props.text).toEqual('this is a heading');
	});
});