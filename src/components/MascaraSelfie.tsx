import React from 'react';
import {Dimensions} from 'react-native';
import Svg, {Circle, Rect, Mask} from 'react-native-svg';
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
        <Rect height={heightSinHeader / 2} width={'100%'} fill="white" />
        <Circle r={'25%'} cx={'50%'} cy={heightSinHeader / 4} fill="black" />
      </Mask>
      <Rect
        height={heightSinHeader / 2}
        width={'100%'}
        fill={color}
        mask="url(#mask)"
      />
    </Svg>
  );
}

export default MascaraSelfie;
