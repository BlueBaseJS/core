import EventEmitter from '../../src/registries/Events';

describe('boot func tests', () => {
	it('should throw error b/c null', () => {
		EventEmitter.on('event-abc', () => 'hello-world');
		expect(EventEmitter.listeners('event-abc', true)).toEqual(true);
	});
});
