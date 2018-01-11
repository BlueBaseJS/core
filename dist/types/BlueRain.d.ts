import AppRegistry from './registries/AppRegistry';
import ComponentRegistry from './registries/ComponentRegistry';
import ConfigRegistry from './registries/ConfigRegistry';
import EventRegistry from './registries/EventRegistry';
import FilterRegistry from './registries/FilterRegistry';
import PluginRegistry from './registries/PluginRegistry';
import HooksRegistry from './registries/HooksRegistry';
export declare type BlueRainType = {
    Apps: AppRegistry;
    Components: ComponentRegistry;
    Configs: ConfigRegistry;
    Events: EventRegistry;
    Filters: FilterRegistry;
    Plugins: PluginRegistry;
    Hooks: HooksRegistry;
    Platform: PluginRegistry;
    Dimensions?: any;
    Utils: {
        parseJsonSchema: Function;
        setMainView: Function;
        createStyleSheet: any;
    };
    refs: {
        [id: string]: {};
    };
    boot: Function;
};
declare const BlueRain: BlueRainType;
export default BlueRain;
