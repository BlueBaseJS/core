import DummyComponent from './DummyComponent';

export default class TestPlugin {

	static pluginName = 'DummyPlugin';

	static components = {
		DummyComponent,
	};
}