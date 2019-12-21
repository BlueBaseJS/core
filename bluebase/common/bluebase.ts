import { ThemedCard } from '../../src/themes/__stories__/ThemedCard';

// This file contain all the apps, plugins and configuration which are required
// for booting bluebase. see https://blueeast.gitbooks.io/bluebase/
export default {
	assets: {
		Icon: require('../../assets/common/icon.png'),
	},

	configs: {
		'theme.overrides': {
			components: {
				ThemedCard2: {
					root: {
						backgroundColor: 'green',
					},
				},
			},
		},
		// wallpaper: {
		// 	backgroundColor: 'white',
		// 	resizeMode: 'cover',
		// 	source: require('../../assets/wallpaper.jpg'),
		// },
	},

	components: {
		ThemedCard,
		ThemedCard2: ThemedCard,
		ThemedCard3: {
			styles: {
				root: {
					backgroundColor: 'orange',
				},
			},
			value: ThemedCard,
		},
	},
};
