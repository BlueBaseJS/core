const myObj = {};
export const StubAPI = apiName => {
	return new Proxy(myObj, {
		get: function get() {
			return function wrapper() {
				// var args = Array.prototype.slice.call(arguments);
				// console.log(args[0]);
				throw new Error(`${apiName} API is not implemented in BlueRain!
				Maybe you forgot to install a platform plugin.`);
			};
		}
	});
};

// console.log(StubAPI.foo('bar'));  // prints 'bar'
