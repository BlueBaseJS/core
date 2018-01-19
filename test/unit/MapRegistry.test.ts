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

	it('should throw error if duplicate key is added in the data Map', () => {
		const mapRegistry = new MapRegistry('apollo-config');
		mapRegistry.set('apollo-config-key', 'apollo-config-key-item-1');
		expect(() => {
			mapRegistry.set('apollo-config-key', 'apollo-config-key-item-2');
		}).toThrowError();
	});

	it('should not  throw error if exisiting key is  replaced in the data Map', () => {
		const mapRegistry = new MapRegistry('apollo-config');
		mapRegistry.set('apollo-config-key', 'apollo-config-key-item-1');
		expect(() => {
			mapRegistry.setOrReplace('apollo-config-key', 'replaced code');
		}).not.toThrow();
	});

	it('should throw error if boolean item is added in the data Map', () => {
		const mapRegistry = new MapRegistry('apollo-config');
		mapRegistry.set('apollo-config-key-item-2', 'data');

		expect(() => {
			mapRegistry.setOrReplace('apollo-config-key-item-2', false);
		}).toThrowError();
	});

	it('should  throw error if   key is added to setOrReplace method', () => {
		const mapRegistry = new MapRegistry('apollo-config');
		mapRegistry.set('apollo-config-key-item-2', 'data');

		expect(() => {
			mapRegistry.setOrReplace('apollo-config-key-item-2', true);
		}).toThrowError();
	});

	it('should  throw error if  empty string item is added to setOrReplace method', () => {
		const mapRegistry = new MapRegistry('apollo-config');
		mapRegistry.set('apollo-config-key-item-2', 'data');

		expect(() => {
			mapRegistry.setOrReplace('apollo-config-key-item-2', '');
		}).toThrowError();
	});
	it('should  throw error if  undefined item is added to setOrReplace method', () => {
		const mapRegistry = new MapRegistry('apollo-config');
		expect(() => {
			mapRegistry.setOrReplace('apollo-config-key-item-2', undefined);
		}).toThrowError();
	});

	it('should  throw error if  null item is added to setOrReplace method', () => {
		const mapRegistry = new MapRegistry('apollo-config');
		expect(() => {
			mapRegistry.setOrReplace('apollo-config-key-item-2', null);
		}).toThrowError();
	});
});
