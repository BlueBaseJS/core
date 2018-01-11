import Plugin from '../../models/Plugin';
import { withWindowInfo, withWindowSize } from './connect';
export default class WindowInfoPlugin extends Plugin {
    static pluginName: string;
    static slug: string;
    static hooks: {
        'bluerain.redux.initialState': (state: any, ctx: any) => any;
        'bluerain.redux.reducers.bluerain': (reducers: any, ctx: any) => any;
        'bluerain.redux.middlewares': (middlewares: any, ctx: any) => any;
    };
    static uses: {
        components: never[];
        hooks: never[];
    };
    static getCurrentSize(): "xs" | "sm" | "md" | "lg" | "xl";
}
export { withWindowInfo, withWindowSize };
