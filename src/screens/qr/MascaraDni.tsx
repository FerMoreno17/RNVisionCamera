import {useHeaderHeight} from '@react-navigation/elements';
import React from 'react';
import {Dimensions, View} from 'react-native';
import Svg, {Defs, Rect, Mask} from 'react-native-svg';

function MascaraDni() {
  const {height, width} = Dimensions.get('window');
  const viewBox = `0 0 ${width} ${height}`;
  const headerHeight = useHeaderHeight();
  const heightSinHeader = height - headerHeight;

  return (
    <View>
      <Svg height={height} viewBox={viewBox}>
        <Defs>
          <Mask id="mask">
            <Rect height={height} width={width} fill="white" />
            <Rect
              height={heightSinHeader * 0.3}
              width={width * 0.8}
              translateX={width * 0.1}
              translateY={heightSinHeader * 0.18}
              fill="black"
            />
          </Mask>
        </Defs>
        <Rect height={height} width={width} fill={'white'} mask="url(#mask)" />
      </Svg>
    </View>
  );
}

export default MascaraDni;
