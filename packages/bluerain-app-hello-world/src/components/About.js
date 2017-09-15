import React from 'react';
import { withBlueRain } from '@blueeast/bluerain-os';

import { Styles } from 'reactxp';
// import  { history } from '../../../../../../src/router';
import pageStyle from './pageStyles';

const buttonStyles = Styles.createViewStyle({
	padding: 5,
	backgroundColor: '#007bff',
	color: 'white',
	marginTop: 10,
	borderRadius: 3
});

class About extends React.Component {
	onNavigateHome() {
		// history.push('/');
	}

	render() {


		const { bluerain: BR } = this.props;

		const View = BR.Components.get('View');
		const Button = BR.Components.get('Button');
		const FormattedMessage = BR.Components.get('FormattedMessage');

		return (
  <View style={pageStyle}>
    <FormattedMessage
      id="hello.about"
      defaultMessage="The About Page"
    />
    {/* <p>User ID: {this.props.params.id}</p> */}
    <Button style={buttonStyles} onPress={About.onNavigateHome}>
          Click Me!
        </Button>
  </View>
		);
	}
}

export default withBlueRain(About);
