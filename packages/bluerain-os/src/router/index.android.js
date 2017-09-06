import createHistory from 'history/createMemoryHistory';

export * from 'react-router-native';
export { NativeRouter as SystemRouter } from 'react-router-native';

const history = createHistory();

export {
	history
};
