import React from 'react';

export type RenderPropChildren<Props = any> = (props: Props) => React.ReactNode;

export type MaybeRenderPropChildren<T = any> = RenderPropChildren<T> | React.ReactNode;

export function renderChildrenWithProps<T = any>(children: MaybeRenderPropChildren<T>, props: T) {
	if (typeof children === 'function') {
		return (children as any)(props);
	}

	return children || null;
}

/**
 * Use this HOC on the raw component, before registering in BlueBase
 * @param Component
 */
export function applyRef<T = any>(Component: React.ComponentType<T>): React.ComponentType<T> {
	const ComponentWithApplyRef = ({ bluebaseRef, ...rest }: any) => (
		<Component ref={bluebaseRef} {...rest} />
	);
	ComponentWithApplyRef.displayName = 'ComponentWithApplyRef';
	return ComponentWithApplyRef;
}

/**
 * Use this HOC on the component resolved from BlueBase or "getComponent" method
 * @param Component
 */
export function forwardRef<T = any>(Component: React.ComponentType<T>): React.ComponentType<T> {
	const ForwardRefComponent = Component as any;
	// eslint-disable-next-line react/display-name
	return React.forwardRef((props: any, ref: any) => {
		return <ForwardRefComponent {...props} bluebaseRef={ref} />;
	}) as any;
}
