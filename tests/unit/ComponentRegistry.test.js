import React, { PropTypes } from 'react';
import ComponentRegistry from '../../src/registries/ComponentRegistry';

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
			ComponentRegistry.register('heading', Heading);
			expect(ComponentRegistry.has('heading')).toEqual(true);
		});
		it('should add empty name component to registry', () => {
			ComponentRegistry.register('', <Heading heading="empty" />);
			expect(ComponentRegistry.has('')).toEqual(true);
		});
		it('should add null name component to registry', () => {
			expect(() => ComponentRegistry.register(null, Heading)).toThrow();
		});
		it('should add undefined component to registry', () => {
			expect(() => ComponentRegistry.register(undefined, Heading)).toThrow();
		});
	});
	describe('get components', () => {
		it('should return component from registry', () => {
			const component = ComponentRegistry.get('heading');
			expect(component).toEqual(Heading);
		});
		it('should return component from registry', () => {
			const component = ComponentRegistry.get('');
			expect(component).toEqual(<Heading heading="empty" />);
		});
		it('should throw error', () => {
      // const component = ComponentRegistry.get('abc')
			expect(() => ComponentRegistry.get('abc')).toThrow();
		});
		it('should throw error due to null', () => {
      // const component = ComponentRegistry.get('abc')
			expect(() => ComponentRegistry.get(null)).toThrow();
		});
		it('should throw error due to undefined', () => {
      // const component = ComponentRegistry.get('abc')
			expect(() => ComponentRegistry.get(undefined)).toThrow();
		});
	});
	describe('replace components', () => {
		it('should replace component from registry', () => {
			ComponentRegistry.replace('heading', Paragragh);
			expect(ComponentRegistry.get('heading')).toEqual(Paragragh);
		});
		it('should throw error if component not available', () => {
			expect(() => ComponentRegistry.replace('head', Paragragh)).toThrow(
        'head is not registered. Component should be registered to be replaced'
      );
		});
		it('should throw error b/c name is null', () => {
			expect(() => ComponentRegistry.replace(null, Paragragh)).toThrow(
        'name cannot be null'
      );
		});
		it('should throw error b/c name is undefined', () => {
			expect(() => ComponentRegistry.replace(undefined, Paragragh)).toThrow(
        'name cannot be undefined'
      );
		});
	});
	describe('has components', () => {
		it('should throw error', () => {
			expect(() => ComponentRegistry.has(undefined)).toThrow();
		});
		it('should throw error', () => {
			expect(() => ComponentRegistry.has(null)).toThrow();
		});
	});
	describe('raw components', () => {
		it('should throw error', () => {
			const component = ComponentRegistry.getRawComponent('heading');
			expect(component.propTypes.paragraph).toBeDefined();
		});
	});
	describe('Add HOCs', () => {
		it('should throw error b/c component is not registered', () => {
			expect(() => ComponentRegistry.addHOCs('test', () => Heading)).toThrow(
        'Component test not registered.'
      );
		});
		it('should throw error b/c hoc null', () => {
			expect(() => ComponentRegistry.addHOCs('test', null)).toThrow(
        'HOCs not provided.'
      );
		});
		it('should throw error b/c hoc undefined', () => {
			expect(() => ComponentRegistry.addHOCs('test', undefined)).toThrow(
        'HOCs not provided.'
      );
		});
		it('should throw error b/c hook null', () => {
			expect(() => ComponentRegistry.addHOCs(null, () => Heading)).toThrow();
		});
		it('should throw error b/c hook undefined', () => {
			expect(() =>
        ComponentRegistry.addHOCs(undefined, () => Heading)
      ).toThrow();
		});
		it('should add hoc', () => {
			ComponentRegistry.addHOCs('', () => Heading);
			expect(ComponentRegistry.ComponentsTable[''].hocs.length).toEqual(1);
		});
	});
	describe('copy HOCs', () => {
		it('should throw error b/c hoc undefined', () => {
			ComponentRegistry.constructor.copyHoCs(
        ComponentRegistry.ComponentsTable.heading,
        () => Heading
      );
			expect(ComponentRegistry.ComponentsTable.heading.hocs.length).toEqual(
        0
      );
		});
	});
});
