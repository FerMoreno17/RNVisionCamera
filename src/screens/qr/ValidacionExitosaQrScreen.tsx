import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  Image,
  BackHandler,
  View,
  Vibration,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Platform} from 'react-native';
import {IDesafiosReducer} from './redux/reducer/DesafiosReducer';
import {useSelector} from 'react-redux';

const ValidacionExitosaQrScreen = () => {
  const navigation = useNavigation();
  const props: any = useRoute();

  const desafios: IDesafiosReducer = useSelector(
    (state: any) => state.desafios,
  );
  useEffect(() => {
    Vibration.vibrate(500);
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);
  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.body}>
        <Text style={styles.titulo}>Escaneo de DNI exitoso</Text>
        <Text style={styles.dni}>DNI: {props.params?.dni}</Text>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require('../../assets/validacionExitosa.png')}
        />

        {desafios.valueError.length > 0 && (
          <View
            style={{
              position: 'absolute',
              bottom: 100,
              backgroundColor: 'red',
              padding: 5,
              margin: '5%',
              width: '90%',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: 'white',
                width: '20%',
              }}>
              Error :
            </Text>
            <Text style={{fontSize: 18, color: 'white', width: '80%'}}>
              {desafios.valueError &&
                desafios.valueError?.map((item, key) => {
                  return (
                    item + (desafios.valueError.length !== key + 1 ? ', ' : '')
                  );
                })}
            </Text>
          </View>
        )}
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#17A641' : '#17D641',
            },
            styles.button,
          ]}
          onPress={() => {
            navigation.reset({routes: [{name: 'ConsejosQRScreen'}]});
          }}>
          <Text style={styles.buttonLabel}>SIGUIENTE</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ValidacionExitosaQrScreen;

const styles = StyleSheet.create({
  titulo: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    fontWeight: '500',
  },
  dni: {
    fontSize: 30,
    color: '#2BC11E',
    textAlign: 'center',
    fontWeight: '500',
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
  body: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? '10%' : 0,
  },
  image: {
    width: '100%',
    flex: 1,
    marginTop: '-40%',
  },
});
