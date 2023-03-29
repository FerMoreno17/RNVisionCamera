import React from 'react';
import {Dimensions, View} from 'react-native';
import Svg, {Defs, Rect, Mask} from 'react-native-svg';

interface IProps {
  color?: string;
}
function MascaraDni({color}: IProps) {
  const {height, width} = Dimensions.get('window');
  const viewBox = `0 0 ${width} ${height}`;

  return (
    <View>
      <Svg height={height} width={width} viewBox={viewBox}>
        <Defs>
          <Mask id="mask">
            <Rect height={height} width={width} fill="white" />
            <Rect
              height={height * 0.3}
              width={width * 0.9}
              translateX={width * 0.05}
              translateY={120}
              fill="black"
              rx={14}
            />
          </Mask>
        </Defs>
        <Rect height={height} width={width} fill={color} mask="url(#mask)" />
      </Svg>
    </View>
  );
}

export default MascaraDni;
