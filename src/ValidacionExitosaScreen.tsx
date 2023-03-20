import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, Pressable, Image, BackHandler} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {ModalS} from './redux/action/DesafiosAction';

const ValidacionExitosaScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);
  return (
    <SafeAreaView style={styles.contenedor}>
      <Text style={styles.titulo}>Validación biométrica exitosa</Text>
      <Image
        style={{width: '100%', flex: 1, marginTop: '-60%'}}
        resizeMode="contain"
        source={require('./assets/validacionExitosa.png')}
      />
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#17A641' : '#17D641',
          },
          styles.button,
        ]}
        onPress={() => {
          navigation.reset({routes: [{name: 'HomeScreen'}]});
        }}>
        <Text style={styles.buttonLabel}>FINALIZAR</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ValidacionExitosaScreen;

const styles = StyleSheet.create({
  titulo: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: '20%',
  },
  contenedor: {
    width: '90%',
    alignSelf: 'center',
    flex: 1,
  },
  button: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    position: 'absolute',
    bottom: 40,
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
  },
  buttonLabel: {
    fontSize: 24,
    color: 'white',
    fontWeight: '700',
  },
});
