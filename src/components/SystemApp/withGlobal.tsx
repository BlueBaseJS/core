import React from 'react';

const withGlobal = (WrappedCompopnent: React.ComponentType): React.ComponentType => {
	const _global: any = global;
	if (typeof _global.self === 'undefined') {
		_global.self = global;
	}
	return WrappedCompopnent;
};

export default withGlobal;
