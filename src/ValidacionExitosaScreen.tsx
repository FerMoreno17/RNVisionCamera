import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, Pressable, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ValidacionExitosaScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.contenedor}>
      <Text style={styles.titulo}>Validación biométrica exitosa</Text>
      <Image
        style={{width: '100%', flex: 1, marginTop: '-60%'}}
        resizeMode="contain"
        source={require('./assets/validacionExitosa.png')}
      />
      <Pressable
        style={styles.button}
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
    backgroundColor: '#11B435',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: '100%',
  },
  buttonLabel: {
    fontSize: 24,
    color: 'white',
    fontWeight: '700',
  },
});
