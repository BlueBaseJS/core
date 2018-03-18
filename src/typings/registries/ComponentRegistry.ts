import { StatefulComponent } from '../../components/StatefulComponent';
import Registry from '../../registries/ComponentRegistry';
// import React from 'react';

export interface ComponentRegistry extends Registry {
	StatefulComponent: StatefulComponent;
}
