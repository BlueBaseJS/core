import { forwardRef, renderChildrenWithProps } from '../Components';

import { BlueBaseApp } from '../../components';
import { FlatList } from '../../getComponent';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('Utils', () => {
	describe('Components', () => {
		describe('.renderChildrenWithProps method', () => {
			it('should return children as is', async () => {
				const children = 'foo';

				expect(renderChildrenWithProps(children, {})).toBe('foo');
			});

			it('should call children function and return its result', async () => {
				const children = () => 'bar';

				expect(renderChildrenWithProps(children, {})).toBe('bar');
			});

			it('should call children as undefined function and return null', async () => {
				expect(renderChildrenWithProps(undefined, {})).toBe(null);
			});
		});

		describe('ref methods', () => {
			it('should forward refs', async () => {
				let instance;

				const List = forwardRef(FlatList);
				const wrapper = mount(
					<BlueBaseApp>
						<List ref={(el: any) => (instance = el)} />
					</BlueBaseApp>
				);

				await waitForElement(wrapper, List);
				expect((instance as any).scrollToItem).toBeTruthy();
			});
		});
	});
});
