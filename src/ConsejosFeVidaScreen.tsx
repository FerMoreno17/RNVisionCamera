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
      <Text style={styles.titulo}>
        {'Consejos para la prueba \n biométrica'}
      </Text>
      <AppCard />
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}>
        <Text style={styles.buttonLabel}>EMPEZAR</Text>
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
    backgroundColor: '#00AEEF',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: '95%',
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
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  marginSinTitulo: {
    marginTop: height * 0.085,
  },
  titulo: {
    fontWeight: '700',
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    marginBottom: 50,
    marginTop: '20%',
    width: '95%',
  },
});
