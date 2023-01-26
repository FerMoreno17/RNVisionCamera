import {DrawerContentScrollView} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import DesafiosAction from '../redux/action/DesafiosAction';
export const DrawerContent = (props: any) => {
  const [dropDown, setDropDown] = useState(false);
  const dispatch = useDispatch();

  let desafiosList = [
    'Sonreir',
    'Guiño Izquierdo',
    'Guiño Derecho',
    'Mirar Izquierda',
    'Mirar Derecha',
    'Mirar Arriba',
    'Mirar Abajo',
    'Mirar Frente',
  ];
  return (
    <View style={{flex: 1, padding: 20}}>
      <DrawerContentScrollView>
        <View
          onTouchEnd={() => {
            setDropDown(!dropDown);
          }}
          style={{
            borderColor: 'grey',
            borderWidth: 2,
            padding: 5,
          }}>
          <Text style={styles.texto}>Desafios</Text>
        </View>
        {dropDown && (
          <View
            style={{
              borderColor: 'grey',
              borderWidth: 2,
              borderBottomWidth: 1,
              borderTopWidth: 0,
            }}>
            {desafiosList.map(resp => (
              <View
                onTouchEnd={() => {
                  dispatch(DesafiosAction([resp]));
                }}
                style={{flex: 1, borderBottomWidth: 1}}>
                <Text style={styles.texto}>{resp}</Text>
              </View>
            ))}
          </View>
        )}
      </DrawerContentScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  texto: {
    color: 'black',
    padding: 5,
    fontSize: 20,
  },
});
