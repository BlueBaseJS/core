import DummyComponent from './DummyComponent';
import { createPlugin } from '../../../src';

export default createPlugin({

	key: 'dummy-plugin',
	name: 'DummyPlugin',

	components: {
		DummyComponent,
	}
});
