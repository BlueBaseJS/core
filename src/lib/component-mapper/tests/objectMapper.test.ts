import { objectMapper } from '../objectMapper';

describe('Utils', () => {

	describe('objectMapper', () => {

		it('should map a simple object', () => {

			const src = {
				foo: 5,
				fzz: 10,
			};

			const output = objectMapper(src, { foo: 'bar', fzz: 'baz' });

			const expected = {
				bar: 5,
				baz: 10
			};

			expect(output).toMatchObject(expected);
		});

		it('should ignore an undefined value', () => {

			const src = {
				foo: undefined,
				fzz: 10,
			};

			const output = objectMapper(src, { foo: 'bar', fzz: 'baz' });

			const expected = { baz: 10 };

			expect(output).toMatchObject(expected);
		});

		it('should map function prop', () => {

			// Use case:
			// We have to map an external lib to match our internal api for button
			// External lib has an onClick event, that send required value on param.target
			// Our internal api understands onPress event, with value in param.value
			const src = {
				label: 'Submit',
				onClick: (event: any) => `${event.target} Clicks`
			};

			const fields = {
				label: 'children',
				onClick: {
					key: 'onPress',
					transform: (onClickFn: any) => {

						// Return a onPress function
						return (onPressParam: any) => onClickFn({ target: onPressParam.value });
					}
				}
			};

			const output = objectMapper(src, fields);

			expect(output.children).toBe('Submit');
			expect(output.onPress({ value: 5 })).toBe('5 Clicks');
		});

	});

});