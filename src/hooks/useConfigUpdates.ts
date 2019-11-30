import { RegistryItem } from '../registries';
import { useBlueBase } from './useBlueBase';
import { useEffect } from 'react';

export function useConfigUpdates(
	key: string,
	callback: (value: any, item: RegistryItem<any>, cancelled: boolean) => void,
	deps?: readonly any[]
) {
	const BB = useBlueBase();

	useEffect(() => {
		let subscriptionId: string;
		let cancelled = false;

		// Subscribe
		subscriptionId = BB.Configs.subscribe(key, (value, item) => callback(value, item, cancelled));

		// Unsubscribe from config updates
		return () => {
			cancelled = true;
			BB.Configs.unsubscribe(key, subscriptionId);
		};
	}, deps);
}
