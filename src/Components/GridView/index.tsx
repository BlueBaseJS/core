import React from 'react';
import BR   from '../../index';
import Row from './Row';
import Col from './Column';
import { withWindowSize } from '../../plugins/WindowInfoPlugin';


const withWindowInfo = BR.Plugins.get('window-info').withWindowInfo;
const  Grid = (props) => {
	const View = BR.Components.get('View');
	const Text = BR.Components.get('Text');


  return (
  <View>
    <Row size={12}>
      <Col   size={props.window.size} style={{ backgroundColor:'blue' }}  xl={3} xs={3} sm={12} lg={6} md={3}>
        <Text>
        First Column
        </Text>
      </Col>
      <Col  size={props.window.size} style={{ backgroundColor:'green' }} xl={6} xs={3} sm={12} lg={6} md={6} >
        <Text>
        Second Column
        </Text>
      </Col>
      <Col   size={props.window.size} style={{ backgroundColor:'red' }} xl={6} xs={6} sm={12} lg={12} md={3} >
        <Text>
        Third Column
        </Text>
      </Col>
    </Row>
  </View>
	);
};

export default withWindowInfo(Grid);
