import { Plugin } from '@blueeast/bluerain';
import DummyComponent from './DummyComponent';

export default class TestPlugin extends Plugin {

	public name = 'DummyPlugin';

	public components = {
		DummyComponent,
	};
}