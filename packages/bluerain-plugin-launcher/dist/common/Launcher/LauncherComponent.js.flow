import React from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconCard from './IconCard.component';

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

const MainPage = props => (<div style={styleMainPage}>
  <GridList style={styles.gridList} cols={0} cellHeight={200} padding={20}>
    {props.apps.map(tile => (
      <GridTile>
        <IconCard icon={tile.icon} appName={tile.appName} backgroundColors={tile.backgroundColors} gradient={tile.gradient} link={tile.link} />
      </GridTile>
      ))}
  </GridList>
	</div>);

MainPage.propTypes = {
	apps: PropTypes.arrayOf.isRequired
};

export default MainPage;
