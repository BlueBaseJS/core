import createHistory from 'history/createBrowserHistory';

export * from 'react-router-dom';
export { MemoryRouter as SystemRouter } from 'react-router-dom';

const history = createHistory();

export {
	history
};
