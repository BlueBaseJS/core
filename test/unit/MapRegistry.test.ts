import MapRegistry from '../../src/registries/MapRegistry';
// just only to test my code.These are not final tests
describe('Map Registry Unit Tests', () => {
	it('should throw error when no name is passed to class constructor', () => {
		expect(() => {
			const mapRegistry = new MapRegistry();
		}).toThrowError();
	});

	it('should throw error when empty name is passed to class constructor', () => {
		expect(() => {
			const mapRegistry = new MapRegistry();
		}).toThrowError();
	});

	it('should initialize name and registry within class constructor', () => {
		const mapRegistry = new MapRegistry('map-registry-test');
		expect(mapRegistry.name).toBe('map-registry-test');
		expect(mapRegistry.data.isEmpty).toBeTruthy();
	});

	it('should set key and value in the registry via set method', () => {
		const mapRegistry = new MapRegistry('apollo-config');
		mapRegistry.set('apollo-config', 'apollo-config-item');
		// expect(mapRegistry.data.has('apollo-config')).toBeTruthy();
		expect(mapRegistry.data.contains('apollo-config-item')).toBeTruthy();
	});

	it('should throw error if registry key is empty', () => {
		const mapRegistry = new MapRegistry('apollo-config');
		mapRegistry.set('', 'apollo-config-item');
		// expect(mapRegistry.data.has('apollo-config')).toBeTruthy();
		expect(mapRegistry.data.contains('apollo-config-item')).toThrowError();
	});

	it('should throw error if registry item is empty', () => {
		const mapRegistry = new MapRegistry('apollo-config');
		mapRegistry.set('apollo-config', '');
		// expect(mapRegistry.data.has('apollo-config')).toBeTruthy();
		expect(mapRegistry.data.contains('')).toThrowError();
	});
});
