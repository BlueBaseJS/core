import { RegistryItem, RegistrySubscriptionFn } from '../registries';

import { useBlueBase } from './useBlueBase';
import { useEffect } from 'react';

export function useConfigUpdates(
	key: string,
	callback: RegistrySubscriptionFn<RegistryItem<any>>,
	deps?: readonly any[]
) {
	const BB = useBlueBase();

	let subscriptionId: string;

	useEffect(() => {
		// Subscribe
		subscriptionId = BB.Configs.subscribe(key, callback);

		// Unsubscribe from config updates
		return () => {
			BB.Configs.unsubscribe(key, subscriptionId);
		};
	}, deps);
}
