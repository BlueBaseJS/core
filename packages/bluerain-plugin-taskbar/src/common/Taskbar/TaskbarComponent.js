// @flow
import React, { type Node } from 'react';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';

import withSystemNav from '../../redux/withSystemNav';

import NavHeader from '../Buttons/NavHeader';

const changeRequestHandler = props => (open) => {
	props.systemNavActions.toggle();
};

const TaskbarComponent = (props: {
  logo: Node,
  title: string,
  items: Array<{
    icon: Node,
    label: string,
    onClick?: Function
  } | '-' | '->'>,
  hideLabels: boolean,
  children: Array,
  docked: boolean,
  open: boolean
}) => {
	const {
    hideLabels,
    children,
    ...rest
  } = props;

	const theme = getMuiTheme(darkBaseTheme);

	const drawerStyles = (props.docked === true && props.open === true) ? { position: 'relative' } : {};
	const zDepth = (props.docked === true) ? 0 : 2;

	if (hideLabels === true) {
		drawerStyles.width = 64;
		drawerStyles.textAlign = 'center';
	}

	return (
  <MuiThemeProvider muiTheme={theme}>
    <Drawer {...rest} zDepth={zDepth} containerStyle={drawerStyles} onRequestChange={changeRequestHandler(props)}>
      <Paper rounded={false} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <NavHeader hideLabel={hideLabels} />
        <List style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: 0 }} >
          {children}
        </List>
      </Paper>
    </Drawer>
  </MuiThemeProvider>
	);
};

TaskbarComponent.defaultProps = {
	items: [],
	hideLabels: true,
	children: []
};

export default withSystemNav(TaskbarComponent);
