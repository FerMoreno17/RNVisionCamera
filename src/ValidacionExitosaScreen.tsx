import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  Image,
  BackHandler,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Platform} from 'react-native';
import {IDesafiosReducer} from './redux/reducer/DesafiosReducer';
import {useSelector} from 'react-redux';

const ValidacionExitosaScreen = () => {
  const navigation = useNavigation();
  const desafios: IDesafiosReducer = useSelector(
    (state: any) => state.desafios,
  );
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);
  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.body}>
        <Text style={styles.titulo}>Validación biométrica exitosa</Text>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require('./assets/validacionExitosa.png')}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 100,
            backgroundColor: 'red',
            padding: 5,
            margin: '5%',
            width: '90%',
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>
            Error :
          </Text>
          <Text style={{fontSize: 18, color: 'white'}}>
            {desafios.valueError &&
              desafios.valueError?.map((item, key) => {
                return (
                  ' ' +
                  item +
                  (desafios.valueError.length !== key + 1 ? ', ' : '')
                );
              })}
          </Text>
        </View>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#17A641' : '#17D641',
            },
            styles.button,
          ]}
          onPress={() => {
            navigation.reset({routes: [{name: 'ConsejosFeVidaScreen'}]});
          }}>
          <Text style={styles.buttonLabel}>FINALIZAR</Text>
        </Pressable>
      </View>
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
