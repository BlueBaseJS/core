import BR from '../../src/index';



describe('boot func tests', () => {
	it('should throw error b/c null', () => {
		BR.Events.on('event-abc', () => 'hello-world');
		expect(BR.Events.listeners('event-abc', true)).toEqual(true);
	});
});
