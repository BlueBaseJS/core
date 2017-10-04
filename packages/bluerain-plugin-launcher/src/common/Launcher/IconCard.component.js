import React from 'react';
import { PropTypes } from 'prop-types';
import tinycolor from 'tinycolor2';
import Paper from 'material-ui/Paper';
import BulbIcon from '../icons/Bulb.component';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Skeleton from 'react-loading-skeleton';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router-dom';

const style = {
	height: 100,
	width: 100,
	margin: 20,
	textAlign: 'center',
	display: 'inline-block',
};

class IconCard extends React.Component {

    static propTypes = {
        icon: PropTypes.element,
        appName: PropTypes.string,
        size: PropTypes.string,
        color: PropTypes.string,
        backgroundColors: PropTypes.array,
        gradient: PropTypes.bool,
        src: PropTypes.string,
        shadow: PropTypes.bool,
        textColor: PropTypes.string,
        onClick: PropTypes.func,
        link: PropTypes.string,
    };

    static defaultProps = {
        icon: <BulbIcon />,
        size: '120px',
        color: 'white',
        backgroundColors: ['rgb(242, 0, 0)', 'yellow'],
        gradient: false,
        src: null,
        shadow: true,
        textColor: 'white',
      	onClick: () => { console.log('AppIcon from inside of component clicked!'); },
        link: '#',

	};
	render() {
        const {
            icon:iconProp,
            size,
            color,
            backgroundColors,
            gradient,
            src,
            png,
            shadow,
            textColor,
            appName,
            onClick,
            link,
        } = this.props;

		let backgroundHexColor,
			iconGradient = 'linear-gradient(to right,';

		const iconHexColor = `${`#${tinycolor(color).toHex()}`}`;

		const iconParent = {
			display: 'flex',
			width: size,
			height: size,
			color: `#${tinycolor(textColor).toHex()}`,
			borderRadius: '10px',
			justifyContent:'center',
			alignItems: 'center',
			marginBottom: '7px',
		};
        //
		const iconStyle = {
			width: `${parseInt(size.slice(0, -2)) / 1.05}px`,
			height: `${parseInt(size.slice(0, -2)) / 1.05}px`,
			padding: '22px 0px',
			fill: color,
            // display: "inline-block",
			textAlign: 'center',
		};

		let elevation = 0;
        if (shadow) {
          elevation = 2;
        }
        if (!appName) {
      		const timelineTitleEmptyStyle = {
      			width: '120px',
      			height: '16px',
      			marginBottom: '10px',
      		};

          const timelineContentEmptyStyle = {
            width: '120px',
            height: '120px',
            backgroundColor: 'rgb(238, 238, 238)',
            borderRadius: '10px',
            justifyContent:'center',
            alignItems: 'center',
            marginBottom: "7px",
          };

      		const timelineDescEmptyStyle = {
      			width: '220px',
      			height: '16px',
      		};
      		return (
          <div>
            <div style={timelineContentEmptyStyle} ></div>
            <div style={timelineTitleEmptyStyle}><Skeleton /></div>
          </div>
      			);
      	}
        if(png){
            iconStyle.background = `${'url('+png +')'}`;
            iconStyle.backgroundSize = size;
            return (
            <div>
              <Paper style={style} zDepth={1} />
              <span>{appName}</span>
            </div>
			);
		}
		if (src) {
			iconParent.background = `${`url(${src})`}`;
		} else {
			if (gradient) {
				backgroundColors.forEach((color) => {
					iconGradient += color;
					iconGradient += ',';
				});
				iconGradient = iconGradient.substring(0, iconGradient.length - 1);
				iconGradient += ')';
			} else {
				backgroundHexColor = `${`#${tinycolor(backgroundColors[0]).toHex()}`}`;
			}
			iconParent.background = gradient ? iconGradient : backgroundHexColor;

        }

        const icon = React.isValidElement(iconProp) ? (
              React.cloneElement(iconProp, { style: iconStyle })
            ) : (
              <Icon>{iconProp}</Icon>
            );

            return (onClick) ? <Link to={link} onClick={onClick} style={{textDecoration: 'none'}}>
            <div style={{width:size, textAlign:'center', color:textColor, fontSize: parseInt(size.slice(0, -2))/8+ 'px'}}>
                <Paper style={iconParent} zDepth={elevation}>
                  {icon}
                </Paper>
                <span>{appName}</span>
              </div></Link> :
              <div style={{width:size, textAlign:'center', color:textColor, fontSize: parseInt(size.slice(0, -2))/8+ 'px'}} onClick={onClick}>
                  <Paper style={iconParent} zDepth={elevation}>
                    {icon}
                  </Paper>
                  <span>{appName}</span>
                </div>;
    }

}
export default IconCard;
