import { ComponentState } from '../../index';
import React from 'react';

export interface HomeScreenProps {

  /**
   * Used to locate this view in end-to-end tests.
   */
	testID?: string,

}

/**
 * # 🏠 HomeScreen
 *
 * ## Usage
 * ```jsx
 * <HomeScreen/>
 * ```
 */
export const HomeScreen = (props: HomeScreenProps) =>
(
  <ComponentState
    title="BlueBase"
    description="Welcome to BlueBase Framework!"
    imageSource={require('../../../assets/common/logo.png')}
    styles={{ image: { width: 100, height: 100 } }}
    {...props}
  />
);

HomeScreen.displayName = 'HomeScreen';