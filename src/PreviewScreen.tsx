import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  Pressable,
  BackHandler,
  View,
  ImageBackground,
  Dimensions,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import AppSpinner from './components/AppSpinner';
import {desafiosList} from './components/DrawerContet';

const PreviewScreen = () => {
  const navigation = useNavigation();
  const props = useRoute();
  const desafios = useSelector((state: any) => state.desafios);
  const [modaleOpen, setModalOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [response, setResponse] = useState();

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
    setSpinner(true);
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
          configMirarIzquierdaMin: desafios.mirarIzquierda.min.toString(),
          configMirarIzquierdaMax: desafios.mirarIzquierda.max.toString(),
          configMirarDerechaMin: desafios.mirarDerecha.min.toString(),
          configMirarDerechaMax: desafios.mirarDerecha.max.toString(),
          configMirarFrenteMin: desafios.mirarFrente.min.toString(),
          configMirarFrenteMax: desafios.mirarFrente.max.toString(),
          configGuinioIzquierdoMin: desafios.guiñoIzquierdo.min.toString(),
          configGuinioIzquierdoMax: desafios.guiñoIzquierdo.max.toString(),
          configGuinioDerechoMin: desafios.guiñoDerecho.min.toString(),
          configGuinioDerechoMax: desafios.guiñoDerecho.max.toString(),
          configSonreirMin: desafios.sonreir.min.toString(),
          configSonreirMax: desafios.sonreir.max.toString(),
          camara: desafios.frontSelected ? 'Camara Frontal' : 'Camara Trasera',
        }),
      },
    )
      .then(resp => {
        return resp.json();
      })
      .then(respJson => {
        setResponse(respJson);
        setModalOpen(true);
        setSpinner(false);
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
      <View style={styles.botonera}>
        <Pressable
          style={[styles.button, {backgroundColor: 'grey'}]}
          onPress={handleButtonBack}>
          <Text style={styles.buttonLabel}>{'VOLVER'}</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={enviarDesa}>
          <Text style={styles.buttonLabel}>ENVIAR</Text>
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modaleOpen}
        onRequestClose={() => {
          setModalOpen(false);
        }}>
        <Pressable
          onTouchEnd={() => {
            setModalOpen(false);
          }}
          style={{
            flex: 1,
            backgroundColor: '#00000099',
          }}></Pressable>
        <View style={styles.cont}>
          <Text
            style={styles.closeModal}
            onPress={() => {
              setModalOpen(false);
            }}>
            X
          </Text>
          <View style={styles.json}>
            <Text style={{color: '#000', fontSize: 18, lineHeight: 30}}>
              {JSON.stringify(response, null, 1)}
            </Text>
          </View>
        </View>
      </Modal>
      <AppSpinner open={spinner} />
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
