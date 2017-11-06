import React from 'react';
import PropTypes from 'prop-types';
import BR from '../../src/index';

class Heading extends React.Component {
	static propTypes = {
		heading: PropTypes.string
	};
	render() {
		return (
  <h1>
    {this.props.heading}
  </h1>
		);
	}
}
class Paragragh extends React.Component {
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
describe('Component Registry test specifications', () => {
	describe('Add components', () => {
		it('should add component to registry', () => {
			BR.Components.set('heading', Heading);
			expect(BR.Components.has('heading')).toEqual(true);
		});
		it('should add empty name component to registry', () => {
			BR.Components.set('', <Heading heading="empty" />);
			expect(BR.Components.has('')).toEqual(true);
		});
		it('should add null name component to registry', () => {
			expect(() => BR.Components.set(null, Heading)).toThrow();
		});
		it('should add undefined component to registry', () => {
			expect(() => BR.Components.set(undefined, Heading)).toThrow();
		});
		it('should throw because undefined component', () => {
			expect(() => BR.Components.set('undefined', undefined)).toThrow();
		});
	});
	describe('get components', () => {
		it('should return component from registry', () => {
			const component = BR.Components.get('heading');
			expect(component).toEqual(Heading);
		});
		it('should return component from registry', () => {
			const component = BR.Components.get('abc', 'error', 'heading');
			expect(component).toEqual(Heading);
		});
		it('should return first available component from registry', () => {
			const component = BR.Components.get('abc', 'error', '', 'heading');
			expect(component).toEqual(<Heading heading="empty" />);
		});
		it('should return first available component from registry', () => {
			expect(() => BR.Components.get('abc', 'error', 'def' )).toThrow();
		});
		it('should return component from registry', () => {
			const component = BR.Components.get('');
			expect(component).toEqual(<Heading heading="empty" />);
		});
		it('should throw error', () => {
      // const component = BR.Components.get('abc')
			expect(() => BR.Components.get('abc')).toThrow();
		});
		it('should throw error due to null', () => {
      // const component = BR.Components.get('abc')
			expect(() => BR.Components.get(null)).toThrow();
		});
		it('should throw error due to undefined', () => {
      // const component = BR.Components.get('abc')
			expect(() => BR.Components.get(undefined)).toThrow();
		});
	});
	describe('get raw components', () => {
		it('should return component from registry', () => {
			const component = BR.Components.getRawComponent('heading');
			expect(component).toEqual(Heading);
		});
		it('should return component from registry', () => {
			const component = BR.Components.getRawComponent('');
			expect(component).toEqual(<Heading heading="empty" />);
		});
		it('should throw error', () => {
      // const component = BR.Components.get('abc')
			expect(() => BR.Components.getRawComponent('abc')).toThrow();
		});
		it('should throw error due to null', () => {
      // const component = BR.Components.get('abc')
			expect(() => BR.Components.getRawComponent(null)).toThrow();
		});
		it('should throw error due to undefined', () => {
      // const component = BR.Components.get('abc')
			expect(() => BR.Components.getRawComponent(undefined)).toThrow();
		});
	});
	describe('replace components', () => {
		it('should replace component from registry', () => {
			BR.Components.replace('heading', Paragragh);
			expect(BR.Components.get('heading')).toEqual(Paragragh);
		});
		it('should throw error if component not available', () => {
			expect(() => BR.Components.replace('head', Paragragh)).toThrow(
        'Component head not registered.'
      );
		});
		it('should throw error b/c name is null', () => {
			expect(() => BR.Components.replace(null, Paragragh)).toThrow(
        'name cannot be null'
      );
		});
		it('should throw error b/c name is undefined', () => {
			expect(() => BR.Components.replace(undefined, Paragragh)).toThrow(
        'name cannot be undefined'
      );
		});
	});
	describe('has components', () => {
		it('should throw error', () => {
			expect(() => BR.Components.has(undefined)).toThrow();
		});
		it('should throw error', () => {
			expect(() => BR.Components.has(null)).toThrow();
		});
	});
	describe('raw components', () => {
		it('should throw error', () => {
			const component = BR.Components.getRawComponent('heading');
			expect(component.propTypes.paragraph).toBeDefined();
		});
	});
	describe('Add HOCs', () => {
		it('should throw error b/c component is not registered', () => {
			expect(() => BR.Components.addHocs('test', () => Heading)).toThrow(
        'Component test not registered.'
      );
		});
		it('should throw error b/c hook null', () => {
			expect(() => BR.Components.addHocs(null, () => Heading)).toThrow();
		});
		it('should throw error b/c hook undefined', () => {
			expect(() =>
        BR.Components.addHocs(undefined, () => Heading)
      ).toThrow();
		});
		it('should add hoc', () => {
			BR.Components.addHocs('heading', () => Heading);
			expect(BR.Components.data.get('heading').hocs.length).toEqual(1);
		});
	});
});
