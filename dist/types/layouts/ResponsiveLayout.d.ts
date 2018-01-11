import React from 'react';
export declare type ResponsiveLayoutProps = {
    windowSize: string;
    default: Node | string;
    xs?: Node;
    sm?: Node;
    md?: Node;
    lg?: Node;
    xl?: Node;
};
declare const _default: React.ComponentClass<Pick<{
    windowSize: any;
}, never>> & {
    WrappedComponent: React.ComponentType<{
        windowSize: any;
    }>;
};
export default _default;
