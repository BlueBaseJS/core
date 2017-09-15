import React from 'react';
import { Styles, View, Button } from 'reactxp';
import { FormattedMessage } from 'react-intl';
import { history } from '../../../bluerain-os/src/router';
import pageStyle from './pageStyles';

const buttonStyles = Styles.createViewStyle({
	padding: 5,
	backgroundColor: '#007bff',
	color: 'white',
	marginTop: 10,
	borderRadius: 3
});

export default class About extends React.Component {
	static onNavigateHome() {
		history.push('/');
	}

	render() {
		return (
  <View style={pageStyle}>
    <FormattedMessage id="hello.about" defaultMessage="The About Page" />
    {/* <p>User ID: {this.props.params.id}</p> */}
    <Button style={buttonStyles} onPress={About.onNavigateHome}>
          Click Me!
        </Button>
  </View>
		);
	}
}
