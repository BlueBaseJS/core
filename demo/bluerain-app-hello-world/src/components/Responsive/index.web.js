import asyncComponent from '../asyncComponent';
const Responsive = asyncComponent(() =>
import('./Responsive').then(module => module.default)
);
export default Responsive;