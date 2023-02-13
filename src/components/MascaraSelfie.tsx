import React from 'react';
import {Dimensions} from 'react-native';
import Svg, {Circle, Rect, Mask, Ellipse} from 'react-native-svg';
import {useHeaderHeight} from '@react-navigation/elements';

interface IProps {
  color?: string;
}

function MascaraSelfie({color}: IProps) {
  const {height, width} = Dimensions.get('window');
  const viewBox = `0 0 ${width} ${height}`;
  const headerHeight = useHeaderHeight();
  const heightSinHeader = height - headerHeight;

  return (
    <Svg height={height} viewBox={viewBox}>
      <Mask id="mask">
        <Rect height={heightSinHeader} width={'100%'} fill="white" />
        <Ellipse cx="50%" cy="47%" rx={'47%'} ry={'30%'} fill="black" />
      </Mask>
      <Rect
        height={heightSinHeader}
        width={'100%'}
        fill={color}
        mask="url(#mask)"
      />
    </Svg>
  );
}

export default MascaraSelfie;
