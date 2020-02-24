import { useEffect, useState } from 'react';

import { useBlueBase } from './useBlueBase';

export function useFilter<T = any>(
	name: string,
	initialValue: T,
	args?: {
		[key: string]: any;
	},
	deps: any[] = []
): { value: T; loading: boolean; error?: Error } {
	const BB = useBlueBase();
	const [value, setValue] = useState(initialValue);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | undefined>();

	let cancelled = false;

	useEffect(() => {
		setLoading(true);

		(async () => {
			try {
				const result = await BB.Filters.run(name, initialValue, args);

				if (!cancelled) {
					setValue(result);
					setLoading(false);
				}
			} catch (error) {
				if (!cancelled) {
					setError(error);
					setLoading(false);
				}
			}
		})();

		// Unsubscribe from config updates
		return () => {
			cancelled = true;
		};
	}, [name, ...deps,args]);

	return { value, loading, error };
}
