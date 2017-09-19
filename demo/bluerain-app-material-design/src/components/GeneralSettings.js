import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Card from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';


const styles = {
	root: {
	},
	card: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
	},
};

const ListExampleSettings = () => (
  <div style={styles.root}>
    <Card style={styles.card}>
      <List>
        <Subheader>General</Subheader>
        <ListItem
          primaryText="Profile photo"
          secondaryText="Change your Google+ profile photo"
        />
        <ListItem
          primaryText="Show your status"
          secondaryText="Your status is visible to everyone you use with"
        />
      </List>
      <Divider />
      <List>
        <Subheader>Hangout Notifications</Subheader>
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Notifications"
          secondaryText="Allow notifications"
        />
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Sounds"
          secondaryText="Hangouts message"
        />
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Video sounds"
          secondaryText="Hangouts video call"
        />
      </List>
    </Card>
  </div>
);

export default ListExampleSettings;
