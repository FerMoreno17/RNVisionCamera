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
  Platform,
  Image,
} from 'react-native';
import {Camera} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import {IRootState} from './redux/reducer/rootReducer';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {useNavigation} from '@react-navigation/native';
import {checkCameraPermission} from './cameraPermission';
import MascaraSelfie from './components/MascaraSelfie';
//import RNFS from 'react-native-fs';
import {useHeaderHeight} from '@react-navigation/elements';
import {manipulateAsync, FlipType} from 'expo-image-manipulator';

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
  const [cameraActive, setCameraActive] = useState(true);
  const [ratioo, setRatio] = useState<string | undefined>();
  const cameraRef = useRef<Camera>(null);
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    checkCameraPermission().then(resp => {
      setPermited(resp);
    });
  }, []);

  useEffect(() => {
    checkCameraPermission();
  });

  const handleFacesDetected = ({faces}: any) => {
    if (faces) {
      try {
        X = faces[0].yawAngle;
        S = faces[0].smilingProbability;
        GOL = faces[0].leftEyeOpenProbability;
        GOD = faces[0].rightEyeOpenProbability;
        //console.log(X);
        setCondicionX(X);
        if (X > 330 && X < 340 && !indicator) {
          setIndicator(true);
          handleTakePicture(X);
        } else {
          setIndicator(false);
        }
      } catch (e) {}
    }
    return;
  };

  const handleTakePicture = async (X: number) => {
    if (cameraRef) {
      setCameraActive(false);
      try {
        await cameraRef.current?.takePictureAsync().then(data => {
          //  console.log(data?.uri);
          setImage(data?.uri);
          cropImage(data?.uri!, X);
        });
      } catch (error) {
        console.log({error});
      }
    }
    return;
  };

  const cropImage = async (imageUri: string, X: number) => {
    await manipulateAsync(
      Platform.OS === 'android' ? imageUri : `file://${imageUri}`,
      [{resize: {width: 600}}],
    ).then(async (resize: any) => {
      Image.getSize(resize.uri, async (widthX, height) => {
        await manipulateAsync(
          Platform.OS === 'android' ? resize.uri : `file://${resize.uri}`,
          [
            {
              crop: {
                height: 720,
                originX: 0,
                originY: 0,
                width: 600,
              },
            },
          ],
          {
            base64: true,
            compress: 0.6,
          },
        )
          .then((crop: any) => {
            setIndicator(false);
            navigation.navigate('PreviewScreen', {
              imagePath: crop.uri,
              desaAceptado: X,
            });
          })
          .catch(error => console.log('error ==>', error));
      });
    });
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

  const prepareRatio = async () => {
    await cameraRef.current?.getSupportedRatiosAsync().then(ratios => {
      const ratio =
        ratios.find(ratio => ratio === '16:9') || ratios[ratios.length - 1];
      setRatio(ratio);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {permited && (
        <View style={styles.cameraContainer}>
          <View style={styles.mask}>
            <MascaraSelfie color={indicator ? '#B2E64A99' : '#FF5C5C99'} />
          </View>
          <View
            style={{
              position: 'absolute',
              zIndex: 100,
              bottom: height * 0.5 - headerHeight,
              width: '100%',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
              }}>
              {!indicator ? 'Siga el desafio y no se mueva' : 'Continua...'}
            </Text>
          </View>
          <Camera
            style={styles.camera}
            onCameraReady={prepareRatio}
            ratio={ratioo}
            type={type}
            ref={cameraRef}
            onFacesDetected={cameraActive ? handleFacesDetected : undefined}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
              runClassifications: FaceDetector.FaceDetectorClassifications.all,
              minDetectionInterval: 100,
              tracking: true,
            }}
          />
          <View
            style={[
              styles.bottomContainer,
              {height: height * 0.5 - headerHeight},
            ]}>
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
              <Text style={styles.desaGeneral}>{condicionX?.toFixed(4)} °</Text>
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
  mask: {
    zIndex: 100,
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 2,
  },
  bottomContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    height: height * 0.5 - 50,
    width: width,
    bottom: 0,
    zIndex: 100,
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
