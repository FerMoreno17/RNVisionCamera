import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {DesafiosAction} from '../redux/action/DesafiosAction';
export const DrawerContent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  let desafiosList = [
    'Mirar Izquierda',
    'Mirar Derecha',
    'Mirar Arriba',
    'Mirar Abajo',
    'Mirar Frente',
    'Guiño Izquierdo',
    'Guiño Derecho',
    'Sonreir',
  ];
  return (
    <View style={{flex: 1, padding: 20}}>
      <DrawerContentScrollView>
        <DrawerItem
          label={'CONFIGURACIÓN'}
          labelStyle={styles.texto}
          style={{backgroundColor: '#002855'}}
          onPress={() => {
            navigation.navigate('ConfiguracionScreen');
          }}
        />
        {desafiosList.map((resp, index) => (
          <DrawerItem
            label={resp}
            key={index}
            labelStyle={styles.texto}
            style={{backgroundColor: '#00aeef'}}
            onPress={() => {
              dispatch(DesafiosAction([resp])),
                navigation.navigate('HomeScreen');
            }}
          />
        ))}
      </DrawerContentScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  texto: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
  },
});
