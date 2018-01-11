import { ComponentType } from 'react';
import { App, Plugin } from './index';
import { ConfigType } from './config';
/**
 * Options object that `boot` and `bootOnServer` methods expect.
 *
 * @property {Array<BR.App>} apps		An array of apps to load
 * @property {ConfigType} config		Configuration object
 * @property {boolean} 	renderApp	If set to false, BlueRain will not render the main app,
 *  instead it is up to the developer to render it. The App is returned from the boot function.
 * @property {Array<BR.Plugin>} plugins		An array of plugins to load
 * @property {boolean} 	serverMode	Set this flag to true when rendering during Server Side Rendering
 */
export declare type BootOptions = {
    apps?: App[];
    config?: ConfigType;
    renderApp?: boolean;
    plugins?: Plugin[];
    serverMode?: boolean;
    platform?: Plugin[];
};
/**
 * Boots the OS and renders the main UI. Use it on the client side
 */
export default function (options?: BootOptions): ComponentType<any>;
