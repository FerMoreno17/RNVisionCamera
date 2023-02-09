/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  BackHandler,
  Switch,
} from 'react-native';
import {Camera} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import {IRootState} from './redux/reducer/rootReducer';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {useNavigation} from '@react-navigation/native';
import {checkCameraPermission} from './cameraPermission';
//import RNFS from 'react-native-fs';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [permited, setPermited] = useState(false);
  const [desafioAceptadoX, setDesafioAceptadoX] = useState<number>();
  const [desafioAceptadoY, setDesafioAceptadoY] = useState<number>();
  const [condicionX, setCondicionX] = useState<number>();
  const [condicionY, setCondicionY] = useState<number>();
  const desafios = useSelector((state: IRootState) => state.desafios);
  const [cameraFront, setCameraFront] = useState(false);
  let X;
  let S;
  let GOL;
  let GOD;
  const dispatch = useDispatch();

  const [image, setImage] = useState<string | undefined>();
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [indicator, setIndicator] = useState(false);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    checkCameraPermission().then(resp => {
      setPermited(resp);
    });
  }, []);

  useEffect(() => {
    checkCameraPermission();
  });

  useEffect(() => {
    indicator &&
      setTimeout(() => {
        handleTakePicture();
      }, 2000);
  }, [indicator]);

  const handleFacesDetected = ({faces}: any) => {
    if (faces) {
      try {
        X = faces[0].yawAngle;
        S = faces[0].smilingProbability;
        GOL = faces[0].leftEyeOpenProbability;
        GOD = faces[0].rightEyeOpenProbability;
        //console.log(X);
        if (X > 330 && X < 340) {
          setIndicator(true);
          setCondicionX(X);
        } else {
          setIndicator(false);
        }
      } catch (e) {}
    }
    return;
  };

  const handleTakePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current?.takePictureAsync();
        console.log(data?.uri);
        setImage(data?.uri);
        cropImage(data?.uri!);
      } catch (error) {
        console.log({error});
      }
    }
    return;
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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.toggleDrawer();
      return true;
    });
  }, []);

  if (cameraRef == null) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size={50} color={'#26C0DB'} />
      </View>
    );
  }

  function cameraFlip() {
    if (type === Camera.Constants.Type.back) {
      setType(Camera.Constants.Type.front);
      setCameraFront(false);
    }
    if (type === Camera.Constants.Type.front) {
      setCameraFront(true);
      setType(Camera.Constants.Type.back);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {permited && (
        <View style={styles.cameraContainer}>
          <View
            style={{
              backgroundColor: indicator ? 'green' : 'red',
              width: 120,
              height: 50,
              borderRadius: 100,
              position: 'absolute',
              top: 100,
              right: 20,
              zIndex: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              {indicator ? 'No te muevas :)' : 'continua...'}
            </Text>
          </View>
          <Camera
            style={styles.camera}
            type={type}
            ref={cameraRef}
            onFacesDetected={handleFacesDetected}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
              runClassifications: FaceDetector.FaceDetectorClassifications.all,
              minDetectionInterval: 100,
              tracking: true,
            }}
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
