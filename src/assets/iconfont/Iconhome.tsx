/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let Iconhome: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M986.681558 525.395078 593.370751 145.642055c-83.743286-91.241051-162.750711 0-162.750711 0L37.310256 511.830131c-29.843702 114.316605 81.372286 81.378425 81.372286 81.378425l325.502445-298.373575c75.656097-75.616188 135.622864 0 135.622864 0l339.066369 311.937498C1019.426333 627.00836 986.681558 525.395078 986.681558 525.395078z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M566.242903 376.208291c0 0-60.786435-51.998281-108.49297 0L145.811412 661.024082l0 230.560096c0 0 13.849426 20.37198 40.685631 27.128871 12.636808-1.802042 230.565213 0 230.565213 0L417.062256 769.525238c0 0-1.947352-10.677177 13.557784-13.564947l162.750711 0c0 0 11.949146-8.768711 13.564947 13.564947l0 149.186787 217.001289 0c0 0 35.288714 4.278443 40.693818-27.128871L864.630804 661.024082 566.242903 376.208291z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

Iconhome.defaultProps = {
  size: 18,
};

Iconhome = React.memo ? React.memo(Iconhome) : Iconhome;

export default Iconhome;
