import { withBlueRain } from '@blueeast/bluerain-os';
import App from './components/App';

const EnhancedApp = withBlueRain(App);
EnhancedApp.appName = 'Hello World';

export default EnhancedApp;
