import React from 'react';

import  { history } from '../../../../../src/router';


export class About extends React.Component {
	onNavigateHome() {
		history.push('/contact');
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
