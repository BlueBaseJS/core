import React from 'react';
import PropTypes from 'prop-types';
import BR from '../../src/index';

class Heading extends React.Component {
	static propTypes = {
		heading: PropTypes.string
	};
	render() {
		return <h1>{this.props.heading}</h1>;
	}
}

describe('Component Registry test specifications', () => {
	describe('Add components', () => {
		it('should add component to registry', () => {
			BR.Components.set('heading', Heading);
			expect(BR.Components.has('heading')).toEqual(true);
		});
