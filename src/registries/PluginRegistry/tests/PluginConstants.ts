
export const SingleListener = {
	handler: (val: number) => val + 5,
	name: 'add.five',
};

export const MultipleListeners = [{
	handler: (val: number) => val + 10,
	name: 'add.ten',
}, {
	handler: (val: number) => val * 2,
	name: 'multiply.by.two',
}];

export const SingleHookHandler = (val: number) => val + 10;

export const SingleListenerInESModule = {
	__esModule: true,
	default: {
		handler: (val: number) => val + 2,
		name: 'add.two',
	},
};

export const SingleListenerInPromisedESModule = Promise.resolve({
	__esModule: true,
	default: {
		handler: (val: number) => val + 6,
		name: 'add.six',
	}
});
