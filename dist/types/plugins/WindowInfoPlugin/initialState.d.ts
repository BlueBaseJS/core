/**
 * The state of current window or screen. Stored in `bluerain.window` in the redux store.
 * @property {number} width The window width
 * @property {number} height The window height
 * @property {"xs" | "sm" | "md" | "lg" | "xl"} size The window size i.e. (xs|sm|md|lg|xl)
 */
export declare type WindowState = {
    width: number;
    height: number;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};
export default function initialState(): WindowState;
