/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconnextM from './IconnextM';
import Iconlike from './Iconlike';
import Iconhome from './Iconhome';

export type IconNames = 'iconnext-m' | 'iconlike' | 'iconhome';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'iconnext-m':
      return <IconnextM key="1" {...rest} />;
    case 'iconlike':
      return <Iconlike key="2" {...rest} />;
    case 'iconhome':
      return <Iconhome key="3" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
