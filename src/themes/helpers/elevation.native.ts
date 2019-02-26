
export function elevation(value: number) {
	let height, radius;

	switch (value) {
		case 1:
			height = 0.5;
			radius = 0.75;
			break;
		case 2:
			height = 0.75;
			radius = 1.5;
			break;
		default:
			height = value - 1;
			radius = value;
	}

	return {
		shadowColor: '#000',
		shadowOffset: {
			height,
			width: 0,
		},
		shadowOpacity: 0.24,
		shadowRadius: radius,
	};


	// return {
	// 	shadowOffset: {
	// 		height: 0.6 * value,
	// 	},
	// 	shadowOpacity: 0.0015 * value + 0.18,
	// 	shadowRadius: 0.54 * value,
	// };
}