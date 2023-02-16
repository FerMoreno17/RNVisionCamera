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
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {desafiosList} from './components/DrawerContet';

const PreviewScreen = () => {
  const navigation = useNavigation();
  const props = useRoute();
  const desafios = useSelector((state: any) => state.desafios);

  function handleButtonBack() {
    navigation.reset({routes: [{name: 'HomeScreen'}] as any});
  }

  const desafioBack = (value: string) => {
    switch (value) {
      case desafiosList[0]:
        return 'MirarHaciaIzquierda';
      case desafiosList[1]:
        return 'MirarHaciaDerecha';
      case desafiosList[2]:
        return 'MirarAlFrente';
      case desafiosList[3]:
        return 'OjoIzquierdoCerrado';
      case desafiosList[4]:
        return 'OjoDerechoCerrado';
      case desafiosList[5]:
        return 'Sonreir';
    }
  };

  const enviarDesa = async () => {
    await fetch(
      'http://mejorasuxsuperapp.gyfcloud.com.ar/api/v0.11/enrolamiento/enviardesafio',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          foto: props.params?.base64,
          desafio: desafioBack(desafios.value[0]),
          probabilidadGuinioIzq: props.params?.GOL,
          probabilidadGuinioDer: props.params?.GOD,
          probabilidadSonreir: props.params?.S,
          gradoEjeX: props.params?.X,
        }),
      },
    )
      .then(resp => {
        return resp.json();
      })
      .then(respJson => {
        console.log(respJson);
      });
  };

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
        <View style={styles.desaBox}>
          <Text style={styles.desaAcepttitle}>Angulo del eje X:</Text>
          <Text style={styles.desaAcept}>{props.params?.X?.toFixed(4)}°</Text>
        </View>
        <View style={styles.desaBox}>
          <Text style={styles.desaAcepttitle}>Prob. de Sonreir:</Text>
          <Text style={styles.desaAcept}>{props.params?.S?.toFixed(4)}%</Text>
        </View>
        <View style={styles.desaBox}>
          <Text style={styles.desaAcepttitle}>Prob. de abrir ojo Izq:</Text>
          <Text style={styles.desaAcept}>{props.params?.GOL?.toFixed(4)}%</Text>
        </View>
        <View style={styles.desaBox}>
          <Text style={styles.desaAcepttitle}>Prob. de abrir ojo Der:</Text>
          <Text style={styles.desaAcept}>{props.params?.GOD?.toFixed(4)}%</Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Pressable
          style={[styles.button, {backgroundColor: 'grey'}]}
          onPress={handleButtonBack}>
          <Text style={styles.buttonLabel}>{'VOLVER'}</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={enviarDesa}>
          <Text style={styles.buttonLabel}>ENVIAR</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default PreviewScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00aeef',
    padding: 20,
    margin: 10,
    alignItems: 'center',
    flex: 1,
    borderRadius: 25,
    bottom: 40,
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
});
