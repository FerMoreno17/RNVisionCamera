import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppCard from './components/AppCard';

export const ConsejosFeVidaRoute = 'ConsejosFeVida';

function ConsejosFeVidaScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.titulo}>Consejos para la prueba biométrica</Text>
      <AppCard />
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#17A641' : '#17D641',
          },
          styles.button,
        ]}
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}>
        <Text style={styles.buttonLabel}>SIGUIENTE</Text>
      </Pressable>
      <View style={styles.actions}></View>
    </SafeAreaView>
  );
}

export default ConsejosFeVidaScreen;
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  button: {
    zIndex: 100,
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
  body: {
    alignItems: 'center',
    marginBottom: 50,
  },
  actions: {
    paddingBottom: 40,
    width: width * 0.9,
    paddingTop: 16,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '5%',
    backgroundColor: 'white',
  },
  marginSinTitulo: {
    marginTop: height * 0.085,
  },
  titulo: {
    fontWeight: '600',
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    marginBottom: '25%',
    marginTop: '10%',
  },
});
