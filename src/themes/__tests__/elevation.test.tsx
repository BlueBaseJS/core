describe('elevation', () => {
	test(`should return shadow styles on native`, () => {
		const elevation = require('../elevation/elevation.native').elevation;

		expect(elevation(1)).toMatchObject({
			shadowColor: '#000',
			shadowOffset: {
				height: 0.5,
				width: 0,
			},
			shadowOpacity: 0.24,
			shadowRadius: 0.75,
		});

		expect(elevation(2)).toMatchObject({
			shadowColor: '#000',
			shadowOffset: {
				height: 0.75,
				width: 0,
			},
			shadowOpacity: 0.24,
			shadowRadius: 1.5,
		});

		expect(elevation(3)).toMatchObject({
			shadowColor: '#000',
			shadowOffset: {
				height: 2,
				width: 0,
			},
			shadowOpacity: 0.24,
			shadowRadius: 3,
		});
	});

	test(`should return elevation prop on web`, () => {
		const elevation = require('../elevation/elevation.android').elevation;

		expect(elevation(1)).toMatchObject({ elevation: 1 });
	});

	test(`should return box shadow prop on web`, () => {
		const elevation = require('../elevation/elevation.ts').elevation;

		// tslint:disable: max-line-length
		expect(elevation(-1)).toMatchObject({ boxShadow: 'none' });
		expect(elevation(1)).toMatchObject({
			boxShadow:
				'0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)',
		});
		expect(elevation(25)).toMatchObject({
			boxShadow:
				'0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
		});
	});
});
