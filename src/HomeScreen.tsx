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
import {Camera, CameraType} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import {IRootState} from './redux/reducer/rootReducer';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {checkCameraPermission} from './cameraPermission';
import MascaraSelfie from './components/MascaraSelfie';
//import RNFS from 'react-native-fs';
//import {useHeaderHeight} from '@react-navigation/elements';
import {manipulateAsync} from 'expo-image-manipulator';
import '../global.js';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [permited, setPermited] = useState(false);
  const [condicionX, setCondicionX] = useState<number>();
  const desafios = useSelector((state: IRootState) => state.desafios);
  const [cameraFront, setCameraFront] = useState(false);
  let X;
  let S;
  let GOL;
  let GOD;

  const [type, setType] = useState(CameraType.front);
  const [indicator, setIndicator] = useState(false);
  const [ratioo, setRatio] = useState<string | undefined>();
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    checkCameraPermission().then(resp => {
      setPermited(resp);
    });
  }, []);

  const handleFacesDetected = ({faces}: any) => {
    if (faces) {
      try {
        X = faces[0].yawAngle;
        S = faces[0].smilingProbability;
        GOL = faces[0].leftEyeOpenProbability;
        GOD = faces[0].rightEyeOpenProbability;
        setCondicionX(X);
        if (X > 330 && X < 340) {
          setIndicator(true);
          !global.flag && handleTakePicture(X, S, GOL, GOD);
        } else {
          setIndicator(false);
          global.flag = false;
        }
      } catch (e) {}
    }
    return;
  };

  const handleTakePicture = async (
    Xs: number,
    Ss: number,
    GOLs: number,
    GODs: number,
  ) => {
    global.flag = true;
    if (cameraRef) {
      try {
        await cameraRef.current?.takePictureAsync().then(data => {
          global.flag && cropImage(data?.uri!, Xs, Ss, GOLs, GODs);
        });
      } catch (error) {
        console.log({error});
      }
    }
    return;
  };

  const cropImage = async (
    imageUri: string,
    Xs: number,
    Ss: number,
    GOLs: number,
    GODs: number,
  ) => {
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
                originY: height * 0.17,
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
            //console.log(crop);
            navigation.navigate('PreviewScreen', {
              imagePath: crop.uri,
              X: Xs,
              S: Ss,
              GOL: GOLs,
              GOD: GODs,
            });
          })
          .catch(error => console.log('error ==>', error));
      });
    });
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.dispatch(DrawerActions.toggleDrawer());
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
    if (type === CameraType.back) {
      setType(CameraType.front);
      setCameraFront(false);
    }
    if (type === CameraType.front) {
      setCameraFront(true);
      setType(CameraType.back);
    }
  }

  const prepareRatio = async () => {
    await cameraRef.current?.getSupportedRatiosAsync().then(ratios => {
      const ratio =
        ratios.find(ratiox => ratiox === '16:9') || ratios[ratios.length - 1];
      setRatio(ratio);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {permited && (
        <View style={styles.cameraContainer}>
          <View style={styles.mask}>
            <MascaraSelfie color={indicator ? '#00aeef99' : '#ffffffc5'} />
          </View>
          <View style={styles.contenedorDatos}>
            <Text style={styles.reto}>{desafios.value[0]}</Text>
            <View style={styles.desaBox}>
              <Text style={styles.desaGeneral}>{condicionX?.toFixed(4)}°</Text>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              top: height / 2.5,
              zIndex: 300,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',

                textAlign: 'center',
              }}>
              {!global.flag ? 'Realice el desafio' : 'Banca un toque'}
            </Text>
          </View>
          <Camera
            style={styles.camera}
            onCameraReady={prepareRatio}
            ratio={ratioo}
            type={type}
            ref={cameraRef}
            onFacesDetected={handleFacesDetected}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              //detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
              runClassifications: FaceDetector.FaceDetectorClassifications.all,
              minDetectionInterval: 20,
              tracking: true,
            }}
          />
          <View style={styles.switch}>
            <Switch
              value={cameraFront}
              onValueChange={cameraFlip}
              thumbColor={cameraFront ? '#ffffff' : '#00aeef'}
              trackColor={{
                false: '#ffffff99',
                true: '#00000099',
              }}
            />
            <Text style={{color: 'black', fontSize: 20, fontWeight: '700'}}>
              Cambiar cámara
            </Text>
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
    width: '100%',
  },
  bottomContainer: {
    backgroundColor: '#ffffff99',
    position: 'absolute',
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
    position: 'absolute',
    zIndex: 300,
    bottom: 0,
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
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
    fontWeight: '700',
  },
  reto: {
    color: '#00aeef',
    fontSize: 40,
    textAlign: 'center',
    fontWeight: '700',
    paddingVertical: 15,
  },
  contenedorDatos: {
    position: 'absolute',
    zIndex: 100,
    width: '100%',
  },
});
