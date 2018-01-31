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

const HocItem=[Heading];
 describe('Component Registry test specifications', () => {
		it('should add component to registry', () => {
			BR.Components.set('heading', Heading);
			expect(() => {
				BR.Components.get('heading');
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
			 expect(() =>BR.Components.get('component')).toThrow();
		});

		it(' getRawComponent method should  throw error as component is not registered', () => {
			expect(() =>BR.Components.getRawComponent('component')).toThrow();
	   });
	   it(' getRawComponent method  should  not throw error as component is  registered', () => {
		expect(() => {
			BR.Components.getRawComponent('heading');
		}).not.toThrow();
       });
		it(' addHocs method should  throw error as component is not registered', () => {
			expect(() =>BR.Components.addHocs('component',()=>HocItem)).toThrow();
	   });
	   it(' addHocs method  should  not throw error as component is  registered', () => {
		expect(() => {
			BR.Components.addHocs('heading',()=>HocItem);
		}).not.toThrow();
	    });
     	it(' addHocs method should  throw error as key is empty', () => {
			expect(() =>BR.Components.addHocs(null,()=>HocItem)).toThrow();
	   });
        it(' set method should  throw error as key is empty', () => {
		  expect(() =>BR.Components.set('',()=>HocItem)).toThrow();
		});


        it(' set method should  throw error as rawComponent is empty', () => {
			expect(() =>BR.Components.set('App',null)).toThrow();
		});
	});



