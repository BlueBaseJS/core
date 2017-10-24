import React from 'react';
import { withBlueRain } from '@blueeast/bluerain-os';
// import { withRouter } from '@blueeast/bluerain-plugin-react-router';

import { Styles } from 'reactxp';
// import  { history } from '../../../../../../src/router';
import pageStyle from '../pageStyles';

const buttonStyles = Styles.createViewStyle({
	padding: 5,
	backgroundColor: '#007bff',
	color: 'white',
	marginTop: 10,
	borderRadius: 3
});

class About extends React.Component {

	constructor(props) {
		super(props);

		this.onNavigateHome = this.onNavigateHome.bind(this);
	}
	onNavigateHome() {
			// this.props.router.push('/');
		this.props.history.goBack();// eslint-disable-line
	}

	render() {

		const { bluerain: BR } = this.props;// eslint-disable-line

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
    <Button style={buttonStyles} onPress={this.onNavigateHome}>
          Go Back!
        </Button>
  </View>
		);
	}
}

export default withBlueRain(About);
// export default withBlueRain(withRouter(About));
