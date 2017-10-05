import React from 'react';
import { PropTypes } from 'prop-types';
import { withBlueRain } from '@blueeast/bluerain-os';
import FileFolder from 'material-ui/svg-icons/file/folder';
import BulbIcon from '../icons/Bulb.component';
import Launcher from './LauncherComponent';
const forEach = require('lodash.foreach');


// const styles = {
// 	root: {
// 		display: 'flex',
// 		flexWrap: 'wrap',
// 		justifyContent: 'space-around',
// 	},
// 	gridList: {
// 		marginTop: 20,
// 	},
// };

let appListData = [];

class Container extends React.Component {

	static populateAppsList(appsList) {
		forEach(appsList, (app, key) => {
			appListData.push({
				icon: app.icon || <BulbIcon />,
				appName: app.appName,
				backgroundColors: app.iconColor ? [app.iconColor] : ['purple'],
				link:  app.path
			});
		});
	}
	render() {
		const BR = this.props.bluerain;
		appListData = [];
		Container.populateAppsList(BR.Apps.AppsTable);
		return (
  <div>
    <Launcher Apps={appListData}  />
  </div>);
	}

}
export default withBlueRain(Container);
