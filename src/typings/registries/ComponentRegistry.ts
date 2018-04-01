import { StatefulComponent } from '../../components/StatefulComponent';
import ComponentState from '../../components/ComponentState';
import ImageBackground from '../../components/ImageBackground';
import Page from '../../components/Page';
import Registry from '../../registries/ComponentRegistry';
import Wallpaper from '../../components/Wallpaper';
// import React from 'react';

export interface ComponentRegistry extends Registry {
	ComponentState: typeof ComponentState;
	ImageBackground: typeof ImageBackground;
	Page: typeof Page;
	StatefulComponent: StatefulComponent;

	Wallpaper: typeof Wallpaper;
}
