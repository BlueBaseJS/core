import BR from '../../src/index';
import PropTypes from 'prop-types';
import React from 'react';

class Heading extends React.Component {
	static propTypes = {
		heading: PropTypes.string
	};
	render() {
		return <h1>{this.props.heading}</h1>;
	}
}
const Logo = (props) => {
	return(<h1>{props.logo}</h1>);
};
const Card = (props) => {
	return(<h1>{props.card}</h1>);
};

const HocItem = [Heading];
describe('Component Registry test specifications', () => {
	it('should add component to registry', () => {
		BR.Components.add('heading', Heading);
		expect(() => {
			BR.Components.get('heading');
		}).not.toThrow();
	});
	it('should add logo component to registry', () => {
		BR.Components.add('logo', Logo);
		expect(() => {
			BR.Components.get('logo');
			console.log('Logo', BR.Components.get('logo'));
		}).not.toThrow();
	});

	it('should add logo component to registry', () => {
		BR.Components.add('card', Card);
		expect(() => {
			BR.Components.get('card');
		}).not.toThrow();
	});

	it('replace method throw error as component is not registered', () => {
		expect(() => BR.Components.replace('New','data')).toThrow();
	});
	it(' replace method  should  not throw error as component is  registered', () => {
		expect(() => {
			BR.Components.replace('heading','Changed');
		}).not.toThrow();
	});
	it(' get method should  throw error as component is not registered', () => {
		expect(() => BR.Components.get('component')).toThrow();
	});

	it(' getRawComponent method should  throw error as component is not registered', () => {
		expect(() => BR.Components.getRawComponent('component')).toThrow();
	});
	it(' getRawComponent method  should  not throw error as component is  registered', () => {
		expect(() => {
			BR.Components.getRawComponent('heading');
		}).not.toThrow();
	});
	it(' addHocs method should  throw error as component is not registered', () => {
		expect(() => BR.Components.addHocs('component',() => HocItem)).toThrow();
	});

	it(' addHocs method  should  not throw error as component is  registered', () => {
	expect(() => {
			BR.Components.addHocs('heading',() => HocItem, () => HocItem, () => HocItem);
		}).not.toThrow();
	BR.Components.get('heading');

});

	it(' addHocs method  should  not throw error as logo component is registered', () => {
		expect(() => {
			BR.Components.addHocs('logo',() => HocItem);
		}).not.toThrow();
	});
	it(' addHocs method  should  not throw error as card component is registered', () => {
		expect(() => {
			BR.Components.addHocs('card',() => HocItem);
		}).not.toThrow();
	});

	it(' addHocs method should  throw error as key is empty', () => {
		expect(() => BR.Components.addHocs(null,() => HocItem)).toThrow();
	});
	it(' set method should  throw error as key is empty', () => {
		expect(() => BR.Components.add('',() => HocItem)).toThrow();
	});


	it(' set method should  throw error as rawComponent is empty', () => {
		expect(() => BR.Components.add('App',null)).toThrow();
	});
});
