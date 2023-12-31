import React, { useEffect, useState } from 'react';

import { RegistryItem } from '../registries';
import { useBlueBase } from './useBlueBase';

export function useConfig<T = any>(
	key: string,
	callback?: (value: any, item: RegistryItem<any>, cancelled: boolean) => void,
	deps: readonly any[] = []
): [T, React.Dispatch<React.SetStateAction<T>>] {
	const BB = useBlueBase();
	const [value, setConfig] = useState<T>(BB.Configs.getValue(key));

	const setValue = (v: any) => {
		BB.Configs.setValue(key, v);
		BB.Configs.setMeta(key, 'mutated', true);
	};

	useEffect(() => {
		let cancelled = false;

		// Subscribe
		const subscriptionId: string = BB.Configs.subscribe(key, (v: any, item: RegistryItem<any>) => {
			if (cancelled) {
				BB.Configs.unsubscribe(key, subscriptionId);
				return;
			}

			setConfig(v);

			if (callback) {
				callback(v, item, cancelled);
			}
		});

		// Unsubscribe from config updates
		return () => {
			cancelled = true;
			BB.Configs.unsubscribe(key, subscriptionId);
		};
	}, [value, ...deps]);

	return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}
