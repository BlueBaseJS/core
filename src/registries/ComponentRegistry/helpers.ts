import { ComponentRegistryItem, ComponentRegistryItemInternal } from './types';
import { getDefiniteBlueRainModule } from '../../api';

export function createComponentRegistryItem(input: ComponentRegistryItemInternal): ComponentRegistryItem {

	if (!input.rawComponent) {
		// tslint:disable-next-line:max-line-length
		throw Error(`"rawComponent" property is required to register a component. Please provide valid component while adding component.`);
	}

	const rawComponent = getDefiniteBlueRainModule(input.rawComponent);

	return {
		hocs: [],
		isAsync: rawComponent.isAsync,
		preload: false,

		...input,

		rawComponent,
	};
}

/**
 * Type guard to check if an object is a ComponentRegistryItem
 * @param item
 */
export function isComponentRegistryItem(item: any): item is ComponentRegistryItem {
	return (item as ComponentRegistryItem).rawComponent !== undefined;
}