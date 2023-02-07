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
  Switch,
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
import {DesafioMirarArriba} from './redux/action/DesafiosAction';
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
  const [desafioAceptadoX, setDesafioAceptadoX] = useState<number>();
  const [desafioAceptadoY, setDesafioAceptadoY] = useState<number>();
  const [condicionX, setCondicionX] = useState<number>();
  const [condicionY, setCondicionY] = useState<number>();
  const [valorDesafio, setValorDesafio] = useState<string>();
  const desafios = useSelector((state: IRootState) => state.desafios);
  const [cameraFront, setCameraFront] = useState(false);
  const [stopCam, setStopCam] = useState(true);
  const [cont, setCont] = useState(4);
  let Y;
  let X;
  let S;
  let GOL;
  let GOD;
  const dispatch = useDispatch();

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

  /* useEffect(() => {
    cont > 0 &&
      setInterval(() => {
        setCont(cont - 1);
      }, 1000);
  }, [cont]);*/

  const handleTakePhoto = async () => {
    try {
      await cameraRef.current
        ?.takePhoto({
          qualityPrioritization: 'speed',
          enableAutoStabilization: true,
        })
        .then(photo => {
          console.log(photo);
        });
    } catch (e: any) {
      console.log(e.message);
    }

    /*   if (photo) {
      //  cropImage(photo.path);
    }*/
  };

  const cropImage = (imageUri: string) => {
    let croppedImage = '';
    const anchoRecomendado = 600;
    const altoRecomendado = 720;
    ImageResizer.createResizedImage(
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
        navigation.navigate('PreviewScreen', {imagePath: result});
      })
      .catch(error => console.log({error}));

    return croppedImage;
  };

  const setCondicionesFrame = (x: any, y: any) => {
    setCondicionX(x);
    setCondicionY(y);
  };

  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';
      try {
        const scannedFaces = scanFaces(frame);
        Y = scannedFaces[0].pitchAngle;
        X = scannedFaces[0].yawAngle;
        S = scannedFaces[0].smilingProbability;
        GOL = scannedFaces[0].leftEyeOpenProbability;
        GOD = scannedFaces[0].rightEyeOpenProbability;
        if (desafios.value[0] === desafiosList.MI) {
          runOnJS(setCondicionesFrame)(X, Y);
          runOnJS(handleTakePhoto)();
          /*if (
            true
             X <= desafios.mirarIzquierda.xp &&
              X >= desafios.mirarIzquierda.xn &&
              Y >= desafios.mirarIzquierda.yn &&
              Y <= desafios.mirarIzquierda.yp
          ) {

            // runOnJS(setDesafioAceptadoX)(X);
            // runOnJS(setDesafioAceptadoY)(Y);
          }*/
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
      setCameraFront(false);
    }

    if (deviceSelected === devices.front) {
      setCameraFront(true);
      setDeviceSelected(devices.back);
    }
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
            frameProcessor={frameProcessor}
            frameProcessorFps={60}
            orientation={'portrait'}
          />

          <View style={styles.bottomContainer}>
            <View style={styles.switch}>
              <Switch
                value={cameraFront}
                onValueChange={cameraFlip}
                thumbColor={cameraFront ? '#00aeef' : '#F4F4F4'}
                trackColor={{
                  false: '#E0E0E0',
                  true: '#E0E0E0',
                }}
              />
              <Text style={{color: 'black', fontSize: 18}}>Cambiar cámara</Text>
            </View>
            <Text style={styles.reto}>{desafios.value[0]}</Text>
            <View style={styles.desaBox}>
              <Text style={styles.desaGeneral}>X:{condicionX?.toFixed(4)}</Text>
              <Text style={styles.desaGeneral}>
                Y: {condicionY?.toFixed(4)}
              </Text>
            </View>
            <View style={styles.desaBox}>
              <Text style={styles.desaAcept}>
                X: {desafioAceptadoX?.toFixed(4)}
              </Text>

              <Text style={styles.desaAcept}>
                Y: {desafioAceptadoY?.toFixed(4)}
              </Text>
            </View>
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
  switch: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  desaAcept: {
    color: 'green',
    fontWeight: '700',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
  },
  desaBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  desaGeneral: {
    color: 'red',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '700',
  },
  reto: {
    color: '#00aeef',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
  },
});
