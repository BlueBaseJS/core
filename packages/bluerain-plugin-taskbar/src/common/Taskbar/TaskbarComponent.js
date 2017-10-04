// @flow
import React, { type Node } from 'react';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';

import NavHeader from '../Buttons/NavHeader';
import NavItem from '../Buttons/NavItem';
import Spacer from '../Buttons/Spacer';

/**
 * Renders a taskbar item
 * @param {*} item
 * @param {*} index
 */
function renderItem(item, index) {
	if (item === '->') {
		return <Spacer key={`${index}-spacer`} />;
	} else if (item === '-') {
		return <Divider key={`${index}-divider`} />;
	}
	item.leftIcon = item.icon;
	item.primaryText = item.label;
	return <NavItem key={`${index}-nav-item`} {...item} />;
}

const TaskbarComponent = (props: {
  logo: Node,
  title: string,
  items: Array<{
    icon: Node,
    label: string,
    onClick?: Function
  } | '-' | '->'>,
  hideLabels: boolean
}) => {
	const {
    items,
    hideLabels,
    logo,
    title,
    ...rest
  } = props;

	const theme = getMuiTheme(darkBaseTheme);

	const drawerStyles = (props.docked === true && props.open === true) ? { position: 'relative' } : {};

	return (
  <MuiThemeProvider muiTheme={theme}>
    <Drawer {...rest} containerStyle={drawerStyles}>
      <Paper rounded={false} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <NavHeader title={title} logo={logo} hideLabel={hideLabels} />
        <List style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} >
          {
          items.map((item, index) => {
	if (typeof item !== 'string') {
		item.hideLabel = hideLabels;
	}

	return renderItem(item, index);
})
        }
        </List>
      </Paper>
    </Drawer>
  </MuiThemeProvider>
	);
};

TaskbarComponent.defaultProps = {
	items: [],
	hideLabels: true
};

export default TaskbarComponent;
