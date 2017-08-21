/**
 * Created by umair on 8/21/17.
 */
import App from '../../src/App/App';
const app = new App();
describe('get component schema', () => {
	it('should throw error b/c app is not array', () => {
		const path = app.getPath();
		expect(path).toBeDefined();
	});
});
