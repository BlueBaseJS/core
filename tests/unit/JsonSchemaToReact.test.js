import React, { PropTypes } from 'react';
import { parseJsonSchema } from '../../src/utils/JsonSchemaToReact';
class Paragraph extends React.Component {
	static propTypes = {
		paragraph: PropTypes.string
	};
	render() {
		return (
  <p>
    {this.props.paragraph}
  </p>
		);
	}
}

describe('Json to react tests', () => {
	it('should throw error for null schema', () => {
		expect(() => parseJsonSchema(null)).toThrow();
	});
	it('should throw error for undefined schema', () => {
		expect(() => parseJsonSchema(undefined)).toThrow();
	});
	it('should throw error for empty schema', () => {
		expect(() => parseJsonSchema({})).toThrow();
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
		const value = parseJsonSchema(schema);
		expect(value.type).toEqual('h1');
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
		const value = parseJsonSchema(schema);
		expect(value.props.paragraph).toEqual('this is a pragraph');
	});
});
