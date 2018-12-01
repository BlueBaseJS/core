import { renderChildrenWithProps } from '../Components';

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

		});
	});
});