// @flow

import React, { type Node } from 'react';
import { withBlueRain } from '@blueeast/bluerain-os';
import AppBar from 'material-ui/AppBar';

const styles = {
	backgroundColor: 'rgba(0,0,0,0.3)',
	cursor: 'pointer',
	paddingLeft: 16,
	paddingRight: 16
};
const goHome = BR => (ev) => {
	try {
		BR.refs.router.history.push('/');
	} catch (error) {

	}
};

const NavHeader = (props: {
	title: string,
	logo: Node,
	hideLabel: boolean
}) => {

	const { hideLabel, bluerain: BR, ...other } = props; // eslint-disable-line

	const title = BR.Configs.get('title');
	const logo = BR.Configs.get('logos.default.src');
	const headerLogo = BR.Configs.get('logos.headerLogo.src');
	const headerLogoSquare = BR.Configs.get('logos.headerLogoSquare.src');

	let brand;

	if (hideLabel === true) {
		brand = headerLogoSquare;
	} else {
		brand = headerLogo;
	}

	if (!brand) {
		brand = logo;
	}

	if (brand) {
		brand = <img src={brand} />;
	} else {
		brand = title;
	}

	return (<AppBar
  title={brand}
  showMenuIconButton={false}
  style={styles}
  onClick={goHome(BR)}
  zDepth={0}
  {...other}
	/>);
};

export default withBlueRain(NavHeader);
