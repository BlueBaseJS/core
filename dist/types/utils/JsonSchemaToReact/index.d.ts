import { ReactElement } from 'react';
export declare type ComponentSchema = {
    component: string | ReactElement<any>;
    text?: string;
    props?: {
        [key: string]: any;
    };
    children?: ComponentSchema[];
};
export default class JsonToReact {
    resolveComponent(schema: ComponentSchema): any | string;
    parseSchema(schema: ComponentSchema | ComponentSchema[]): ReactElement<any> | Array<ReactElement<any>> | null;
    parseSubSchemas(subSchemas?: ComponentSchema[]): any[];
    createComponent(schema: ComponentSchema): ReactElement<any>;
    resolveComponentChildren(schema: ComponentSchema): ReactElement<any> | ReactElement<any>[] | null | undefined;
}
export declare const parseJsonSchema: (schema: ComponentSchema) => ReactElement<any> | ReactElement<any>[] | null;
