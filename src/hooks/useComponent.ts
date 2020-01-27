import { useBlueBase } from './useBlueBase';

export function useComponent<T = any>(
	...keys: Array<string | React.ComponentType<T>>
): React.ComponentType<T> {
	const BB = useBlueBase();
	return BB.Components.resolveFromCache<T>(...keys);
}
