import React from 'react';
import { browserHistory } from 'react-router';

export class About extends React.Component {
	onNavigateHome() {
		browserHistory.push('/home');
	}

	render() {
		return (
  <div>
    <h3>The About Page</h3>
    {/* <p>User ID: {this.props.params.id}</p> */}
    <button onClick={this.onNavigateHome} className="btn btn-primary">Go Home!</button>
  </div>
		);
	}
}
