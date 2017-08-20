export * from 'react-router-dom';
export { BrowserRouter as SystemRouter } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';
const history = createHistory();

export {
	history
}
