/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ActivityIndicator,
  Dimensions,
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  BackHandler,
  TextInput,
} from 'react-native';
import {
  Camera,
  CameraDevice,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {IRootState} from './redux/reducer/rootReducer';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {useNavigation} from '@react-navigation/native';
import {Face, scanFaces} from 'vision-camera-face-detector';
import {runOnJS} from 'react-native-reanimated';
//import RNFS from 'react-native-fs';

const HomeScreen = () => {
  const navigation = useNavigation();
  const devices = useCameraDevices();
  const [deviceSelected, setDeviceSelected] = useState<
    CameraDevice | undefined
  >();
  const [permited, setPermited] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const [photoPath, setPhotoPath] = useState<String | undefined>(undefined);
  const [desafioAceptado, setDesafioAceptado] = useState<number>();
  const [condicion, setCondicion] = useState<number>();
  const [valorDesafio, setValorDesafio] = useState<string>();
  const desafios = useSelector((state: IRootState) => state.desafios.value);

  async function checkCameraPermission() {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') {
      await Linking.openSettings();
    }

    if (permission === 'authorized') {
      setPermited(true);
    }
  }

  useEffect(() => {
    checkCameraPermission();
  });

  useEffect(() => {
    setDeviceSelected(devices.front);
  }, [devices]);

  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';
      try {
        const scannedFaces = scanFaces(frame);
        let X = scannedFaces[0].pitchAngle;
        let Y = scannedFaces[0].yawAngle;
        let S = scannedFaces[0].smilingProbability;
        let GOL = scannedFaces[0].leftEyeOpenProbability;
        let GOD = scannedFaces[0].rightEyeOpenProbability;
        if (desafios[0] === desafiosList.MI) {
          runOnJS(setCondicion)(Y);
          if (Y >= parseFloat(valorDesafio!)) {
            runOnJS(setDesafioAceptado)(Y);
            runOnJS(handleTakePhoto);
          }
        } else if (desafios[0] === desafiosList.MD) {
          runOnJS(setCondicion)(Y);
          if (Y <= parseFloat(valorDesafio!)) {
            runOnJS(setDesafioAceptado)(Y);
            runOnJS(handleTakePhoto);
          }
        } else if (desafios[0] === desafiosList.MAB) {
          runOnJS(setCondicion)(X);
          if (X <= parseFloat(valorDesafio!)) {
            runOnJS(setDesafioAceptado)(X);
            runOnJS(handleTakePhoto);
          }
        } else if (desafios[0] === desafiosList.MAR) {
          runOnJS(setCondicion)(X);
          if (X >= parseFloat(valorDesafio!)) {
            runOnJS(setDesafioAceptado)(X);
            runOnJS(handleTakePhoto);
          }
        } else if (desafios[0] === desafiosList.S) {
          runOnJS(setCondicion)(S);
          if (S >= parseFloat(valorDesafio!)) {
            runOnJS(setDesafioAceptado)(S);
            runOnJS(handleTakePhoto);
          }
        } else if (desafios[0] === desafiosList.GD) {
          runOnJS(setCondicion)(GOD);
          if (GOD <= parseFloat(valorDesafio!)) {
            runOnJS(setDesafioAceptado)(GOD);
            runOnJS(handleTakePhoto);
          }
        } else if (desafios[0] === desafiosList.GI) {
          runOnJS(setCondicion)(GOL);
          if (GOL <= parseFloat(valorDesafio!)) {
            runOnJS(setDesafioAceptado)(GOL);
            runOnJS(handleTakePhoto);
          }
        }
      } catch (e) {}
    },
    [desafios, valorDesafio],
  );

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.toggleDrawer();
      return true;
    });
  }, []);

  if (deviceSelected == null) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size={50} color={'#26C0DB'} />
      </View>
    );
  }

  function cameraFlip() {
    if (deviceSelected === devices.back) {
      setDeviceSelected(devices.front);
    }

    if (deviceSelected === devices.front) {
      setDeviceSelected(devices.back);
    }
  }

  async function handleTakePhoto() {
    // console.log('Captura: ', tomarFoto);
    let photo;
    try {
      photo = await cameraRef.current?.takePhoto({
        qualityPrioritization: 'speed',
        enableAutoStabilization: true,
      });

      if (photo) {
        await cropImage(photo.path)
          .then(result => {
            setPhotoPath(result);
            navigation.navigate('PreviewScreen', {imagePath: result});
          })
          .catch(error => console.log('error ==>', error));
      }
    } catch (e) {
      console.log({e});
    }
  }

  async function cropImage(imageUri: string) {
    let croppedImage = '';
    const anchoRecomendado = 600;
    const altoRecomendado = 720;
    await ImageResizer.createResizedImage(
      imageUri,
      anchoRecomendado,
      altoRecomendado,
      'JPEG',
      50,
      0,
      undefined,
      false,
      {
        mode: 'cover',
        onlyScaleDown: false,
      },
    )
      .then(result => {
        //const img64 = await RNFS.readFile(result.uri, 'base64');
        // console.log({ img64 });
        croppedImage = result.uri;
      })
      .catch(error => console.log({error}));

    return croppedImage;
  }

  return (
    <SafeAreaView style={styles.container}>
      {permited && (
        <View style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            device={deviceSelected!}
            isActive={true}
            photo={true}
            enableZoomGesture
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
            orientation={'portrait'}
          />

          <View style={styles.bottomContainer}>
            <Text
              style={{
                color: 'red',
                fontSize: 30,
                textAlign: 'center',
                marginTop: 20,
              }}>
              {condicion}
            </Text>
            <Text style={{color: 'black', fontSize: 30, textAlign: 'center'}}>
              {desafios[0]}
            </Text>
            <TextInput
              keyboardType="numeric"
              style={styles.desa}
              onChangeText={setValorDesafio}
              value={valorDesafio}
            />
            <Text
              style={{
                color: 'green',
                fontWeight: '700',
                fontSize: 20,
                textAlign: 'center',
                marginTop: 20,
              }}>
              {desafioAceptado}
            </Text>
            <Pressable style={styles.button} onPress={cameraFlip}>
              <Text style={{textAlign: 'center', fontSize: 20}}>
                Cambiar camara
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

export enum desafiosList {
  S = 'Sonreir',
  GI = 'Guiño Izquierdo',
  GD = 'Guiño Derecho',
  MI = 'Mirar Izquierda',
  MD = 'Mirar Derecha',
  MAR = 'Mirar Arriba',
  MAB = 'Mirar Abajo',
  MF = 'Mirar frente',
}

const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  bottomContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    height: height * 0.4,
    width: width,
    bottom: 0,
    zIndex: 100,
    paddingTop: 10,
  },
  button: {
    backgroundColor: '#26C0DB',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  buttonLabel: {
    fontSize: 18,
    color: 'white',
  },
  changeCameraButton: {
    backgroundColor: '#26c0db',
    padding: 20,
    borderRadius: 100,
    width: '50%',
    alignSelf: 'center',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 500,
    height: 500,
  },
  activityIndicatorContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  desa: {
    borderWidth: 1,
    borderColor: 'black',
    width: '35%',
    alignSelf: 'center',
    marginTop: 20,
    padding: 5,
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
});
