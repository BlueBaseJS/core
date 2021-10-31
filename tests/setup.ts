import 'jest-enzyme';
import 'react-native';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';

/**
 * Set up DOM in node.js environment for Enzyme to mount to
 */
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
	url: 'http://localhost'
});
const { window } = jsdom;
window.Date = Date;

function copyProps(src: any, target: any) {
	Object.defineProperties(target, {
		...Object.getOwnPropertyDescriptors(src),
		...Object.getOwnPropertyDescriptors(target),
	});
}

declare const global: {
	document: any,
	navigator: any,
	window: any,
};

global.window = window;
global.document = window.document;
global.navigator = {
	userAgent: 'node.js',
};

copyProps(window, global);

/**
 * Set up Enzyme to mount to DOM, simulate events,
 * and inspect the DOM in tests.
 */
Enzyme.configure({ adapter: new Adapter() });

/**
 * Ignore some expected warnings
 * see: https://jestjs.io/docs/en/tutorial-react.html#snapshot-testing-with-mocks-enzyme-and-react-16
 * see https://github.com/Root-App/react-native-mock-render/issues/6
 */
const originalConsoleError = console.error;
// tslint:disable-next-line: no-console
console.error = (message: any) => {
	if (message.startsWith('Warning:')) {
		return;
	}

	originalConsoleError(message);
};
