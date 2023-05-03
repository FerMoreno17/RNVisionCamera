import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  Pressable,
  BackHandler,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const PreviewScreen = () => {
  const navigation = useNavigation();
  const props: any = useRoute();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.reset({routes: [{name: 'HomeScreen'}] as any});
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);
  const respuesta = props.params?.resp;
  const myJSON = JSON.stringify(respuesta);
  return (
    <SafeAreaView style={styles.imageContainer}>
      <ImageBackground
        blurRadius={60}
        style={{
          flex: 1,
          width: '100%',
        }}
        source={{uri: props.params?.imagePath}}
        imageStyle={styles.resize}>
        <Image
          source={{uri: props.params?.imagePath}}
          style={styles.image}
          resizeMode={'contain'}
        />
      </ImageBackground>
      <View
        style={{
          height: Dimensions.get('screen').height * 0.3,
          width: '80%',
        }}>
        <ScrollView>
          <View style={styles.desaBox}>
            <Text style={styles.desaAcepttitle}>Angulo:</Text>
            <Text style={styles.desaAcept}>{Math.round(props.params?.X)}°</Text>
          </View>
          <Text style={styles.desaAceptar}>{myJSON}</Text>
        </ScrollView>
      </View>
      <View style={styles.botonera}>
        <Pressable
          style={[styles.button, {backgroundColor: 'grey'}]}
          onPress={() =>
            navigation.reset({routes: [{name: 'ConsejosFeVidaScreen'}]})
          }>
          <Text style={styles.buttonLabel}>{'VOLVER A INTENTAR'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default PreviewScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00aeef',
    padding: 10,
    margin: 10,
    alignItems: 'center',
    flex: 1,
    bottom: 10,
  },
  buttonLabel: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
  },
  imageContainer: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    flex: 1,
  },
  desaAcepttitle: {
    color: '#00aeef',
    fontWeight: '700',
    fontSize: 20,
    marginTop: 20,
  },
  desaAcept: {
    color: '#000',
    fontWeight: '700',
    fontSize: 20,
    marginTop: 20,
  },
  desaAceptar: {
    color: '#000',
    fontWeight: '700',
    fontSize: 20,
    marginTop: 20,
  },
  desaBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imagenPrevia: {
    flex: 1,
    alignSelf: 'center',
  },
  resize: {
    resizeMode: 'cover',
  },
  cont: {
    minHeight: Dimensions.get('screen').height * 0.5,
    width: '95%',
    backgroundColor: '#fff',
    marginTop: Dimensions.get('window').height * 0.1,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#6e6e6e',
    borderRadius: 20,
    position: 'absolute',
    top: 0,
    zIndex: 200,
  },
  closeModal: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'right',
    marginRight: 15,
    marginTop: 10,
    color: '#6e6e6e',
  },
  json: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    marginTop: -40,
  },
  botonera: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
