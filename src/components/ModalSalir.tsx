import React from 'react';
import {Modal, StyleSheet, View, Text, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {ModalS} from '../redux/action/DesafiosAction';
import {IDesafiosReducer} from '../redux/reducer/DesafiosReducer';

export const ModalSalir = () => {
  const dispatch = useDispatch();
  const desafios: IDesafiosReducer = useSelector(
    (state: any) => state.desafios.modal,
  );
  const navigation = useNavigation();

  return (
    <Modal animationType="fade" transparent={true} visible={desafios}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{marginBottom: 16}}>
            <Image
              style={{width: 60, height: 60}}
              resizeMode="stretch"
              source={require('../assets/Atencion.png')}
            />
          </View>
          <Text style={[styles.textoMedium, styles.pregunta]}>
            ¿Desea salir?
          </Text>
          <Text style={[styles.textoLight, styles.pregunta]}>
            Si apretás confirmar se perderá el progreso actual.
          </Text>

          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#F2F4F4' : '#fff',
              },
              styles.buttonConfirm,
            ]}
            onPress={() => {
              dispatch(ModalS(false)),
                navigation.reset({routes: [{name: 'ConsejosFeVidaScreen'}]});
            }}>
            <Text style={[styles.buttonLabel, {color: '#17D641'}]}>
              CONFIRMAR
            </Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#17A641' : '#17D641',
                marginTop: 20,
              },
              styles.button,
            ]}
            onPress={() => {
              dispatch(ModalS(false));
            }}>
            <Text style={styles.buttonLabel}>CANCELAR</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#F2F4F4',
    paddingHorizontal: '5%',
    paddingVertical: 40,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
    borderRadius: 4,
  },

  pregunta: {
    marginBottom: 20,
    fontSize: 24,
  },
  body: {
    textAlign: 'center',
    color: 'black',
  },
  textoMedium: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  textoLight: {
    fontWeight: 'normal',
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonConfirm: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    alignSelf: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderColor: '#17D641',
    borderWidth: 3,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  buttonLabel: {
    fontSize: 24,
    color: 'white',
    fontWeight: '700',
  },
});
