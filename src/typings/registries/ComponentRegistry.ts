import Registry from '../../registries/ComponentRegistry';
import StatefulComponent from '../../components/StatefulComponent';
// import React from 'react';

export interface ComponentRegistry extends Registry {
	StatefulComponent: typeof StatefulComponent;
}
