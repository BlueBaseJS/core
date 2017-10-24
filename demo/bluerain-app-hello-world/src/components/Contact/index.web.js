import asyncComponent from '../asyncComponent';
const Contact = asyncComponent(() =>
import('./Contact').then(module => module.default)
);
export default Contact;