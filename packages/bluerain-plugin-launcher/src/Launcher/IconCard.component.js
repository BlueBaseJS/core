import React, { type Node } from 'react';
import RX from 'reactxp';
import { withBlueRain, type BlueRain } from '@blueeast/bluerain-os';
import Card from 'material-ui/Card';

const AppLink = (props: {
	bluerain: BlueRain,
	name: string,
	icon: Node,
	link: string,
	size: string,
	color: string,
	borderRadius: number
}) => {

	const { bluerain: BR, name, icon: Icon, link, size, color, borderRadius } = props;
	const View = BR.Components.get('View');
	const Link = BR.Components.get('Link');

	const style = RX.Styles.createViewStyle({
		width: size,
		color: '#fff',
		textAlign: 'center',
		alignSelf: 'center'
	}, false);

	const appIconStyle = {
		borderRadius,
		backgroundColor: color,
		width: size,
		height: size,
		padding: 16,
	};

	const iconStyle = RX.Styles.createViewStyle({
		width: '100%',
		height: '100%',
		fill: '#FFF'
	}, false);

	const appNameStyle = RX.Styles.createViewStyle({
		paddingTop: 5,
		paddingBottom: 5,
	}, false);

	return (
  <View style={style}>
    <Link to={link}>
      <Card zDepth={2} style={appIconStyle}>
        <View>
          <Icon style={iconStyle} />
        </View>
      </Card>
    </Link>
    <View style={appNameStyle}>{name}</View>
  </View>
	);
};

AppLink.defaultProps = {
	size: '120px',
	color: 'brown',
	borderRadius: 10
};

export default withBlueRain(AppLink);
