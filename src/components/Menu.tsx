import React from 'react';
import {Image, Pressable} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';

export const Menu = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.dispatch(DrawerActions.toggleDrawer());
      }}
      style={{
        width: 45,
        marginRight: 10,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{width: 35, height: 30}}
        resizeMode="stretch"
        source={require('../assets/Menu.png')}
      />
    </Pressable>
  );
};
