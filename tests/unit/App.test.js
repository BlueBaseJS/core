/**
 * Created by umair on 8/21/17.
 */
import App from '../../src/models/App';
describe('get component schema', () => {
	it('should throw error b/c app is not array', () => {
		const path = App.path;
		expect(path).toBeUndefined();
	});
});
