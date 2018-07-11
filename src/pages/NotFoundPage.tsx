import { BlueRain, BlueRainConsumer } from '../index';
import React from 'react';

// Components

// Custom Components
// const FOFIcon = () => <Icon title="404" />;

/**
 * Returns the 404 Page.
 *
 * @returns {React.Component} The layout react component
 */
const descriptionStyle = {
	marginTop: 10
};
const ButtonStyle = {
	backgroundColor: '#5c6ac4',
	color: '#fff'

};
export class NotFoundPage extends React.Component<{ systemNavActions: any, systemNav: any }, null> {
	componentWillMount() {
		if (!this.props.systemNav.disabled) {
			this.props.systemNavActions.disable();
		}
	}
	componentWillUnmount() {
		if (this.props.systemNav.disabled) {
			this.props.systemNavActions.enable();
		}
	}
	render() {
		return (
			<BlueRainConsumer>
				{(BR: BlueRain) => {
					const buttonOnPress = () => {
						const route: any = BR.refs ? BR.refs : {};
						if (route) {
							return route.router.history.goBack();

						} else { return null; }
					};
					return (
						<BR.Components.Page >
							<BR.Components.CenterLayout style={{ height: 100 + 'vh' }}>
								<BR.Components.ComponentState
									title="Oooop's!"
									description="Things you are looking for aren't here!"
									imageSource="https://s3-us-west-2.amazonaws.com/bluerainimages/not-found.svg"
									buttonOnPress={buttonOnPress}
									descriptionStyle={descriptionStyle}
									buttonTitle="go Back"
									buttonStyle={ButtonStyle}
								/>
							</BR.Components.CenterLayout>
						</BR.Components.Page >
					);
				}}
			</BlueRainConsumer>
		);
	}
}
const NotFoundPageWithSystemNav = (props: any) => {
	return (
		<BlueRainConsumer>
			{(BR: BlueRain) => (
				<BR.Components.SystemNavSupplier Component={NotFoundPage} otherProps={props} />
			)}
		</BlueRainConsumer>
	);
};

export default NotFoundPageWithSystemNav;
