
import {
	HeaderBackButton,
	HeaderTitle,
	NavigationOptions,
} from '../../index';
import {
	I18nManager,
  Image,
  ImageStyle,
  MaskedViewIOS,
  Platform,
	SafeAreaView,
	StyleProp,
  StyleSheet,
	View,
	ViewStyle,
} from 'react-native';
import React from 'react';
import { Theme } from '../../registries';

// const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
// const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;


const getTitleOffsets = (
  layoutPreset: 'left' | 'center',
  hasLeftComponent: boolean,
  hasRightComponent: boolean
) => {

  // These can be adjusted by using headerTitleContainerStyle on navigationOptions
	const TITLE_OFFSET_CENTER_ALIGN = Platform.OS === 'ios' ? 70 : 56;
	const TITLE_OFFSET_LEFT_ALIGN = Platform.OS === 'ios' ? 20 : 56;

	if (layoutPreset === 'left') {
    // Maybe at some point we should do something different if the back title is
    // explicitly enabled, for now people can control it manually

		const style = {
			left: TITLE_OFFSET_LEFT_ALIGN,
			right: TITLE_OFFSET_LEFT_ALIGN,
		};

		if (!hasLeftComponent) {
			style.left = 0;
		}
		if (!hasRightComponent) {
			style.right = 0;
		}

		return style;
	} else if (layoutPreset === 'center') {
		const style = {
			left: TITLE_OFFSET_CENTER_ALIGN,
			right: TITLE_OFFSET_CENTER_ALIGN,
		};
		if (!hasLeftComponent && !hasRightComponent) {
			style.left = 0;
			style.right = 0;
		}

		return style;
	}

	return null;
};

const getAppBarHeight = (isLandscape: boolean) => {
	return Platform.OS === 'ios'
    ? isLandscape
    // && !Platform.isPad
      ? 32
      : 44
    : 56;
};

export interface HeaderProps extends NavigationOptions {
	headerTitleContainerStyle?: StyleProp<ViewStyle>,
	headerRightContainerStyle?: StyleProp<ViewStyle>,
	headerLeftContainerStyle?: StyleProp<ViewStyle>,
	layoutPreset?: 'left' | 'center',

	backTitleVisible?: boolean,
	headerBackAllowFontScaling?: boolean,

	styles?: Partial<HeaderStyles>
}

export interface HeaderState {
	titleWidth?: number,
	initWidth?: number,
}

export interface HeaderStyles {
	root: StyleProp<ViewStyle>,
	wrapper: StyleProp<ViewStyle>,
	transparentContainer: StyleProp<ViewStyle>,
	header: StyleProp<ViewStyle>,
	item: StyleProp<ViewStyle>,
	iconMaskContainer: StyleProp<ViewStyle>,
	iconMaskFillerRect: StyleProp<ViewStyle>,
	iconMask: StyleProp<ImageStyle>,
	title: StyleProp<ViewStyle>,
	left: StyleProp<ViewStyle>,
	right: StyleProp<ViewStyle>,
	flexOne: StyleProp<ViewStyle>,
}

/**
 * 🎩 Header
 */
export class Header extends React.PureComponent<HeaderProps, HeaderState> {
	// static get HEIGHT() {
	// 	return APPBAR_HEIGHT + STATUSBAR_HEIGHT;
	// }

	static get defaultProps () {

		return {
			headerTitleAllowFontScaling: true,
			layoutPreset: Platform.OS === 'ios' ? 'center' : 'left',
		};
	}

	readonly state: HeaderState = {};

	static defaultStyles = (theme: Theme): HeaderStyles => {

    // TODO: Add shadows
		let platformContainerStyles;
		if (Platform.OS === 'ios') {
			platformContainerStyles = {
        // borderBottomColor: '#A7A7AA',
        // borderBottomWidth: StyleSheet.hairlineWidth,
			};
		} else {
			platformContainerStyles = {
				elevation: 4,
			};
		}

		return {
			flexOne: {
				flex: 1,
			},
			header: {
				...StyleSheet.absoluteFillObject,
        // justifyContent: 'space-between',
				alignItems: 'center',
				flexDirection: 'row',
			},
			iconMask: {
        // These are mostly the same as the icon in ModularHeaderBackButton
				alignSelf: 'center',
				height: 23,
				marginLeft: 8.5,
				marginTop: -2.5,
				resizeMode: 'contain',
				transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
				width: 14.5,
			},
			iconMaskContainer: {
				flex: 1,
				flexDirection: 'row',
				justifyContent: 'center',
			},
			iconMaskFillerRect: {
				backgroundColor: '#d8d8d8',
				flex: 1,
				marginLeft: -5,
			},
			item: {
				backgroundColor: 'transparent',
			},
			left: {
        // left: 0,
        // bottom: 0,
        // top: 0,
        // position: 'absolute',
				alignItems: 'center',
				flexDirection: 'row',
				marginRight: theme.spacing.unit * 2,
			},
			right: {
				// bottom: 0,
        // top: 0,
				alignItems: 'center',
				flexDirection: 'row',
				marginLeft: theme.spacing.unit * 2,
				position: 'absolute',
				right: 0,
			},
			root: {
				backgroundColor: theme.palette.primary.main ,// || '#FFF',
				...platformContainerStyles,
			},
			title: {
        // bottom: 0,
        // top: 0,
        // left: 0,
        // right: 0,
        // position: 'absolute',
				alignItems: 'center',
				flexDirection: 'row',
				marginHorizontal: theme.spacing.unit * 2,
			},
			transparentContainer: {
				borderBottomColor: 'transparent',
				borderBottomWidth: 0,
				left: 0,
				position: 'absolute',
				right: 0,
				top: 0,
				...platformContainerStyles,
				elevation: 0,
			},
			wrapper: {
				paddingHorizontal: theme.spacing.unit * 2,
			},
		};
	}

	render() {
		const { header, headerStyle, headerTransparent, layoutPreset } = this.props;
		const styles = this.props.styles as HeaderStyles;

		if (header === null) {
			return null;
		}

		const appBarHeight = getAppBarHeight(false);
		// const appBarHeight = getAppBarHeight(isLandscape);

		const rootStyles = [
			headerTransparent ? styles.transparentContainer : styles.root,
			headerStyle,
		];

		const wrapperStyles = [
			styles.wrapper,
			{ height: appBarHeight },
		];

		const onLayout = layoutPreset === 'center'
		? (e: any) => { this.setState({ initWidth: e.nativeEvent.layout.width, }); }
    : undefined;

		const appBar = this._renderHeader();
		const background = this._renderBackground();

		return (
      <SafeAreaView onLayout={onLayout} style={rootStyles} >
        <View style={wrapperStyles}>
          {background}
          <View style={styles.flexOne}>{appBar}</View>
        </View>
			</SafeAreaView>
		);
	}

	private _getHeaderTitleString() {
		const { headerTitle, title } = this.props;

		if (typeof headerTitle === 'string') {
			return headerTitle;
		}

		return title;
	}

	private _getBackButtonTitleString() {
		const { headerBackTitle } = this.props;
		if (headerBackTitle || headerBackTitle === null) {
			return headerBackTitle;
		}
		return null;
	}

	private _getTruncatedBackButtonTitle() {
		return this.props.headerTruncatedBackTitle;
	}

	private _renderTitleComponent = () => {
		const {
			headerTitle,
			headerTitleStyle: titleStyle,
			headerTintColor: color,
			headerTitleAllowFontScaling: allowFontScaling,
			layoutPreset,
		} = this.props;

		const styles = this.props.styles as HeaderStyles;

    // If headerTitle is a react element, return it
		const HeaderTitleComponent = (headerTitle && typeof headerTitle !== 'string')
		? headerTitle
		: HeaderTitle;

		if (React.isValidElement<any>(HeaderTitleComponent)) {
			return HeaderTitleComponent;
		}

    // Resolve header title string
		const titleString = this._getHeaderTitleString();

    // When title is centered, the width of left/right components depends on the
    // calculated size of the title.
		const onLayout = (layoutPreset === 'center')
		? (e: any) => { this.setState({ titleWidth: e.nativeEvent.layout.width }); }
    : undefined;

    // Styles
		const stylesheet = [
			styles.title,
			color ? { color } : null,
			layoutPreset === 'center'
      ? {
	left: 0,
	position: 'absolute',
	right: 0,
	textAlign: 'center',
}
      : {
	textAlign: 'left'
} as any,
			titleStyle,
		];

		return (
      <HeaderTitleComponent
        testID="header-title"
        onLayout={onLayout}
        allowFontScaling={allowFontScaling}
        style={stylesheet}
      >
        {titleString}
      </HeaderTitleComponent>
		);
	}

  /**
   * Renders left area of the header
   */
	private _renderLeft() {

		const {
      headerLeft,
      headerLeftContainerStyle,
			headerPressColorAndroid,
			headerTintColor,
			headerBackImage,
			backTitleVisible,
			headerBackAllowFontScaling,
      headerBackTitleStyle,
      // layoutPreset,
    } = this.props;

		const styles = this.props.styles as HeaderStyles;

    // If headerLeft is an element or null, return as is
		const RenderedLeftComponent = headerLeft || HeaderBackButton;

		if (React.isValidElement<any>(RenderedLeftComponent) || headerLeft === null) {
			return RenderedLeftComponent;
		}

    // Create a styles array
		let style = styles.left;

    // If there is a headerLeftContainerStyle, push it in the styles array
		if (headerLeftContainerStyle) {
			style = [style, headerLeftContainerStyle];
		}

    // Back button strings
		const backButtonTitle = this._getBackButtonTitleString();
		const truncatedBackButtonTitle = this._getTruncatedBackButtonTitle();

    // Calculate width, works if layoutPreset === 'center'
		const width = (this.state.initWidth && this.state.titleWidth)
      ? (this.state.initWidth - this.state.titleWidth) / 2
      : undefined;

		return (
      <RenderedLeftComponent
        testId="header-left"
        pressColorAndroid={headerPressColorAndroid}
        tintColor={headerTintColor}
        backImage={headerBackImage}
        title={backButtonTitle}
        truncatedTitle={truncatedBackButtonTitle}
        backTitleVisible={backTitleVisible}
        allowFontScaling={headerBackAllowFontScaling}
        titleStyle={headerBackTitleStyle}
        style={style}
        // layoutPreset={layoutPreset}
        width={width}
      />
		);
	}

	private _renderTitle(
		options: { hasLeftComponent: boolean, hasRightComponent: boolean, headerTitleContainerStyle: StyleProp<ViewStyle> }
	) {

		const styles = this.props.styles as HeaderStyles;

		const { layoutPreset } = this.props;

		const style = [
			styles.title,
      { justifyContent: layoutPreset === 'center' ? 'center' : 'flex-start' },
			layoutPreset ? getTitleOffsets(layoutPreset, options.hasLeftComponent, options.hasRightComponent) : null,
			options.headerTitleContainerStyle,
		];

		return this._renderSubView(this._renderTitleComponent, { ...this.props, style },);
	}

	private _renderRight() {

		const { headerRight, headerRightContainerStyle } = this.props;
		const styles = this.props.styles as HeaderStyles;

		const style = [styles.right];

		if (headerRightContainerStyle) {
			style.push(headerRightContainerStyle);
		}

		return (
      <View testID="header-right-container" style={style}>
        {this._renderSubView(headerRight || null, { ...this.props })}
      </View>
		);
	}

	private _renderBackground() {
		const { headerBackground } = this.props;
		return this._renderSubView(headerBackground, { ...this.props, style: StyleSheet.absoluteFill });
	}

	private _renderSubView(
		renderer?: null | React.ReactElement<any> | ((...props: any[]) => React.ReactElement<any>), props?: any
	) {
		if (!renderer) {
			return null;
		}
		else if (React.isValidElement<any>(renderer)) {
			return renderer;
		}

		return renderer(props);
	}

	private _renderHeader() {
		const { headerTitleContainerStyle } = this.props;
		const styles = this.props.styles as HeaderStyles;

		const left = this._renderLeft();
		const right = this._renderRight();

		const title = this._renderTitle({
			hasLeftComponent: !!left,
			hasRightComponent: !!right,
			headerTitleContainerStyle: headerTitleContainerStyle,
		});

		// const { transitionPreset } = this.props;

		const wrapperProps = { style: styles.header };

		if (
      this.props.headerLeft ||
      this.props.headerBackImage ||
      Platform.OS !== 'ios'
      // transitionPreset !== 'uikit'
    ) {
			return (
        <View {...wrapperProps}>
          {left}
          {title}
          {right}
        </View>
			);
		} else {
			return (
        <MaskedViewIOS
          {...wrapperProps}
          maskElement={
            <View style={styles.iconMaskContainer}>
              <Image
                source={require('../../../assets/common/back-icon-mask.png')}
                style={styles.iconMask}
              />
              <View style={styles.iconMaskFillerRect} />
            </View>}
        >
          {left}
          {title}
          {right}
        </MaskedViewIOS>
			);
		}
	}
}