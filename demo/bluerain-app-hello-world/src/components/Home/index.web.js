import asyncComponent from '../asyncComponent';
const Home = asyncComponent(() =>
import('./Home').then(module => module.default)
);
export default Home;