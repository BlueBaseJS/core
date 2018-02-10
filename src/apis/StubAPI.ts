const myObj = {};
export const StubAPI = (apiName: string) => {
	return new Proxy(myObj, {
		get: () => {
			return () => {
				throw new Error(`${apiName} API is not implemented in BlueRain!
				Maybe you forgot to install a platform plugin.`);
			};
		}
	});
};
