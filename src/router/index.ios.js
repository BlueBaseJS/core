export * from 'react-router-native';
export { NativeRouter as SystemRouter } from 'react-router-native';

import createHistory from 'history/createMemoryHistory'
const history = createHistory();

export {
	history
}
