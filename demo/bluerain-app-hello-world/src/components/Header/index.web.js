import asyncComponent from '../asyncComponent';
const Header = asyncComponent(() =>
import('./Header').then(module => module.default)
);
export default Header;