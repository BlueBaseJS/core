import React from 'react';
import BulbIcon from '../icons/Bulb.component';
import IconCard from './IconCard.component';
import { PropTypes } from 'prop-types';
import FileFolder from 'material-ui/svg-icons/file/folder';
import { GridList, GridTile } from 'material-ui/GridList';

const styleMainPage = {
	height: '100vh',
	width: '100%',
	justifyContent: 'center',
	display: 'flex',
};

const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
	},
	gridList: {
		width: '90%',
		marginTop: 20,
	},
};


class MainPage extends React.Component {
	static propTypes = {
		Apps: PropTypes.array,
	};
	render() {
		const {
            Apps,
        } = this.props;
		return (
  <div style={styleMainPage}>
    <GridList style={styles.gridList} cols={0} cellHeight={200} padding={20}>
      {Apps.map(tile => (
                    <GridTile>
                    <IconCard icon={tile.icon} appName={tile.appName} backgroundColors={tile.backgroundColors} gradient={tile.gradient} link={tile.link} />
                  </GridTile>
                ))}
    </GridList>
  </div>);
	}

}
export default MainPage;
