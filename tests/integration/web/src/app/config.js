const config = {
	title: 'Hello OS!'
};

if (process.env.NODE_ENV === 'production') {
	config.debug = false;
	config.development = false;
}

export default config;
