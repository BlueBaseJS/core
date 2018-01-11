import React from 'react';
export declare const withWindowInfo: (Component: any) => React.ComponentClass<any> & {
    WrappedComponent: React.ComponentType<{
        window: any;
    } & {
        setWindowDimentions: (w: any, h: any) => any;
    }>;
};
export declare const withWindowSize: (Component: any) => React.ComponentClass<Pick<{
    windowSize: any;
}, never>> & {
    WrappedComponent: React.ComponentType<{
        windowSize: any;
    }>;
};
