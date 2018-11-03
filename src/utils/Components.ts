export type RenderPropChildren<Props = any> = ((props: Props) => React.ReactNode);

export type MaybeRenderPropChildren<T = any> = RenderPropChildren<T> | React.ReactNode;

export function renderChildrenWithProps<T = any>(children: MaybeRenderPropChildren<T>, props: T) {
	if (typeof children === 'function') {
		return (children as any)(props);
	}

	return children;
}