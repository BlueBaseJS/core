import createHistory from 'history/createBrowserHistory';

export * from 'react-router-dom';
export { BrowserRouter as SystemRouter } from 'react-router-dom';

const history = createHistory();

export {
	history
};
