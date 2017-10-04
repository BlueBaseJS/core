import asyncComponent from '../asyncComponent';
const About = asyncComponent(() =>
import('./About').then(module => module.default)
);
export default About;