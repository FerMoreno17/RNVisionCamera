import React from 'react';
import {Dimensions, Platform} from 'react-native';
import Svg, {Rect, Mask, Ellipse} from 'react-native-svg';
import {useHeaderHeight} from '@react-navigation/elements';
import Constans from 'expo-constants';

interface IProps {
  color?: string;
}

function MascaraSelfie({color}: IProps) {
  const {height, width} = Dimensions.get('window');
  const headerHeight = useHeaderHeight();
  const heightSinHeader = height - headerHeight;
  const viewBox = `0 0 ${width} ${heightSinHeader}`;

  return (
    <Svg height={heightSinHeader} viewBox={viewBox}>
      <Mask id="mask">
        <Rect height={heightSinHeader} width={'100%'} fill="white" />
        <Ellipse
          cx="50%"
          cy={
            (heightSinHeader -
              (Platform.OS === 'ios' ? Constans.statusBarHeight : 0)) *
            0.5
          }
          rx={'45%'}
          ry={
            (heightSinHeader -
              (Platform.OS === 'ios' ? Constans.statusBarHeight : 0)) *
            0.325
          }
          fill="black"
        />
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
