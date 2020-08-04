import { Platform } from 'react-native';
import { createPalette } from '../Palette';
import { createTypography } from '../Typography';

// declare const require: any;

describe('createTypography', () => {
	// beforeEach(() => {
	// 	jest.resetModules();
	// });

	test(`fontFamily should be undefined on native`, () => {
		const palette = createPalette('light');
		const typography = createTypography(palette);
		expect(typography.body1.fontFamily).toBeUndefined();
	});

	test(`fontFamily should NOT be undefined on web`, () => {
		// jest.mock('Platform', () => {
		// 	const Platform = jest.requireActual('Platform');
		// 	Platform.OS = 'web';
		// 	return Platform;
		// });

		// jest.resetModules();
		// jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));

		Platform.OS = 'web';

		const palette = createPalette('light');
		const typography = createTypography(palette);

		expect(typography.body1.fontFamily).toBe('"Roboto", "Helvetica", "Arial", sans-serif');
	});
});
