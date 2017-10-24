import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconCard from './IconCard.component';

const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
	},
	gridList: {
		padding: 30
	},
};
/* eslint-disable */
const MainPage = props => (
  <GridList style={styles.gridList} cols={props.cols} cellHeight="auto" padding={20}>
    {props.apps.map(tile => (
      <GridTile key={tile.slug}>
        <IconCard icon={tile.icon} name={tile.name} backgroundColors={tile.backgroundColors} gradient={tile.gradient} link={tile.link} color={tile.color} />
      </GridTile>
      ))}
  </GridList>
	);

export default MainPage;
