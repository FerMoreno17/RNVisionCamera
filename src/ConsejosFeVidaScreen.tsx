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

export const ConsejosFeVidaRoute = 'ConsejosFeVida';

function ConsejosFeVidaScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.main}>
      <View style={[styles.body, styles.marginSinTitulo]}>
        <Text style={[styles.marginConsejo, styles.titulo]}>
          {'Para dar la Fe de Vida vamos \na tomar una foto de tu cara'}
        </Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}>
        <Text style={styles.buttonLabel}>INICIAR</Text>
      </Pressable>
      <View style={styles.actions}></View>
    </SafeAreaView>
  );
}

export default ConsejosFeVidaScreen;
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  marginConsejo: {
    marginBottom: 24,
  },
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
    width: '90%',
  },
  buttonLabel: {
    fontSize: 24,
    color: 'white',
    fontWeight: '700',
  },
  body: {
    flex: 8,
    alignItems: 'center',
  },
  actions: {
    paddingBottom: 40,
    width: width * 0.9,
    paddingTop: 16,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
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
  },
});
