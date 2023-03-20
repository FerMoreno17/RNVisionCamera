import React from 'react';
import {Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {ModalS} from '../redux/action/DesafiosAction';

interface IProps {
  consejos?: boolean;
}

export const Back = ({consejos = false}: IProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Pressable
      onPress={() => {
        consejos
          ? navigation.navigate('ConsejosFeVidaScreen')
          : dispatch(ModalS(true));
      }}
      style={{
        width: 45,
        marginLeft: 10,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{width: 25, height: 20}}
        resizeMode="stretch"
        source={require('../assets/Back.png')}
      />
    </Pressable>
  );
};
