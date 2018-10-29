export type RenderPropChildren<Props = any> = ((props: Props) => React.ReactNode);

export type MaybeRenderPropChildren<T = any> = RenderPropChildren<T> | React.ReactNode;