const config = {
	title: 'Todo MVC',

	plugins: {
		apollo: {
			networkInterface: {
				uri: 'http://localhost:3000/graphql'
			}
		}
	}
};

if (process.env.NODE_ENV === 'production') {
	config.debug = false;
	config.development = false;
}

export default config;
