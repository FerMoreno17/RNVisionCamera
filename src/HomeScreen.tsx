/* eslint-disable react-native/no-inline-styles */
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
import {Camera, CameraType, FaceDetectionResult} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {checkCameraPermission} from './cameraPermission';
import MascaraSelfie from './components/MascaraSelfie';
import {manipulateAsync} from 'expo-image-manipulator';
import {SwitchCamaraAction} from './redux/action/DesafiosAction';

interface IProp {
  originBounds: any;
}
const FrameColor = ({originBounds}: IProp) => {
  if (originBounds !== undefined) {
    return (
      <View
        style={{
          position: 'absolute',
          top: originBounds.origin.y,
          left: originBounds.origin.x,
          height: originBounds.size.height,
          width: originBounds.size.width,
          zIndex: 999,
          borderWidth: 3,
          borderColor: 'green',
        }}
      />
    );
  }
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [permited, setPermited] = useState(false);
  const [condicionX, setCondicionX] = useState<number>();
  const desafios = useSelector((state: any) => state.desafios);
  let X;
  let S;
  let GOL;
  let GOD;
  const [type, setType] = useState(
    !desafios.frontSelected ? CameraType.front : CameraType.back,
  );
  const [indicator, setIndicator] = useState(false);
  const [ratioo, setRatio] = useState<string | undefined>();
  const cameraRef = useRef<Camera>(null);
  const [contaFrame, setContaFrame] = useState(0);
  const [detectFace, setDetectFace] = useState(false);
  const [contaDetectFace, setContaDetectFace] = useState(3);
  const [originBounds, setBounds] = useState<any>();

  const dispatch = useDispatch();

  useEffect(() => {
    checkCameraPermission().then(resp => {
      setPermited(resp);
    });
  }, []);

  const handleFacesDetected = ({faces}: FaceDetectionResult) => {
    if (faces.length > 0) {
      try {
        X = faces[0].yawAngle;
        S = faces[0].smilingProbability;
        GOL = faces[0].rightEyeOpenProbability;
        GOD = faces[0].leftEyeOpenProbability;
        setBounds(faces[0].bounds);
        if (!desafios.frontSelected) {
          if (X < 0) {
            X = X * -1;
          } else {
            X = 360 - X;
          }
        }

        if (desafios.frontSelected && Platform.OS === 'ios' && X < 0) {
          X = 360 + X;
        }
        if (
          faces[0].bounds.size.width <= width &&
          faces[0].bounds.size.width >= width * 0.6 &&
          faces[0].bounds.origin.y + faces[0].bounds.size.height <=
            height * 0.73 &&
          faces[0].bounds.origin.y >= height * 0.15
        ) {
          if (desafios.value[0] === desafiosList.MI) {
            setCondicionX(X);
            if (
              X > desafios.mirarIzquierda.min &&
              X < desafios.mirarIzquierda.max
            ) {
              setIndicator(true);
              setContaFrame(contaFrame + 1);
              contaFrame === 8 && handleTakePicture(X, S, GOL, GOD);
            } else {
              setContaFrame(0);
              setIndicator(false);
            }
          }

          if (desafios.value[0] === desafiosList.MD) {
            setCondicionX(X);
            if (
              X > desafios.mirarDerecha.min &&
              X < desafios.mirarDerecha.max
            ) {
              setIndicator(true);
              setContaFrame(contaFrame + 1);
              contaFrame === 8 && handleTakePicture(X, S, GOL, GOD);
            } else {
              setContaFrame(0);
              setIndicator(false);
            }
          }

          if (desafios.value[0] === desafiosList.MF) {
            setCondicionX(X);
            if (X > desafios.mirarFrente.min || X < desafios.mirarFrente.max) {
              setIndicator(true);
              setContaFrame(contaFrame + 1);
              contaFrame === 8 && handleTakePicture(X, S, GOL, GOD);
            } else {
              setContaFrame(0);
              setIndicator(false);
            }
          }
          if (desafios.value[0] === desafiosList.GI) {
            setCondicionX(GOL);
            if (
              GOL > desafios.guiñoIzquierdo.min &&
              GOL < desafios.guiñoIzquierdo.max
            ) {
              setIndicator(true);
              setContaFrame(contaFrame + 1);
              contaFrame === 8 && handleTakePicture(X, S, GOL, GOD);
            } else {
              setContaFrame(0);
              setIndicator(false);
            }
          }
          if (desafios.value[0] === desafiosList.GD) {
            setCondicionX(GOD);
            if (
              GOD > desafios.guiñoDerecho.min &&
              GOD < desafios.guiñoDerecho.max
            ) {
              setIndicator(true);
              setContaFrame(contaFrame + 1);
              contaFrame === 8 && handleTakePicture(X, S, GOL, GOD);
            } else {
              setContaFrame(0);
              setIndicator(false);
            }
          }
          if (desafios.value[0] === desafiosList.S) {
            setCondicionX(S);
            if (S > desafios.sonreir.min && S < desafios.sonreir.max) {
              setIndicator(true);
              setContaFrame(contaFrame + 1);
              contaFrame === 8 && handleTakePicture(X, S, GOL, GOD);
            } else {
              setContaFrame(0);
              setIndicator(false);
            }
          }
        } else {
          setContaFrame(0);
          setIndicator(false);
        }
      } catch (e) {}
    } else {
      setContaFrame(0);
      setIndicator(false);
    }
    return;
  };

  const handleTakePicture = async (
    Xs: number,
    Ss: number,
    GOLs: number,
    GODs: number,
  ) => {
    if (cameraRef) {
      await cameraRef.current?.takePictureAsync({
        quality: type === CameraType.back ? 0 : 1,
        skipProcessing: true,
        onPictureSaved: data => {
          cropImage(data?.uri!, Xs, Ss, GOLs, GODs);
        },
      });
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
            navigation.navigate('PreviewScreen', {
              base64: crop.base64,
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

  useEffect(() => {
    desafios.frontSelected
      ? setType(CameraType.front)
      : setType(CameraType.back);
  }, [desafios.frontSelected]);

  const prepareRatio = async () => {
    await cameraRef.current?.getSupportedRatiosAsync().then(ratios => {
      const ratio =
        ratios.find(ratiox => ratiox === '16:9') || ratios[ratios.length - 1];
      setRatio(ratio);
    });
  };

  useEffect(() => {
    let aux = 3;
    let aux2 = setInterval(() => {
      contaDetectFace >= 0 ? setContaDetectFace(aux) : clearInterval(aux2);
      aux--;
    }, 1000);
    setTimeout(() => {
      setDetectFace(true);
    }, 4000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {permited && (
        <View style={styles.cameraContainer}>
          <View style={styles.mask}>
            <MascaraSelfie color={indicator ? '#00aeef99' : '#ffffffc5'} />
          </View>
          <View style={styles.contenedorDatos}>
            <Text style={[styles.reto, indicator && {color: '#fff'}]}>
              {desafios.value[0]}
            </Text>
            <View style={styles.desaBox}>
              {contaDetectFace > 0 ? (
                <Text style={styles.contador}>{contaDetectFace}</Text>
              ) : (
                <Text style={styles.desaGeneral}>
                  {condicionX?.toFixed(4)}
                  {condicionX &&
                    (desafios.value[0] === 'Sonreir' ||
                    desafios.value[0] === 'Guiño Izquierdo' ||
                    desafios.value[0] === 'Guiño Derecho'
                      ? ' %'
                      : ' °')}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.conte}>
            <Text style={styles.textDe}>
              {!indicator
                ? 'Realice el desafio'
                : 'No te muevas hasta que se capture el desafío'}
            </Text>
          </View>
          <FrameColor originBounds={originBounds} />
          <Camera
            style={styles.camera}
            onCameraReady={prepareRatio}
            ratio={ratioo}
            type={type}
            ref={cameraRef}
            onFacesDetected={detectFace ? handleFacesDetected : undefined}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              //detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
              runClassifications: FaceDetector.FaceDetectorClassifications.all,
              minDetectionInterval: 250,
              tracking: true,
            }}
          />
          <View style={styles.switch}>
            <Switch
              value={desafios.frontSelected}
              onValueChange={() => {
                dispatch(SwitchCamaraAction(!desafios.frontSelected));
              }}
              thumbColor={desafios.frontSelected ? '#00aeef' : '#fff'}
              trackColor={{
                false: '#00000099',
                true: '#ffffff99',
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
  MF = 'Mirar Frente',
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
  conte: {
    position: 'absolute',
    top: height / 2.5,
    zIndex: 300,
    alignSelf: 'center',
  },
  textDe: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
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
    marginTop: 10,
  },
  contador: {
    color: 'orange',
    fontSize: 50,
    textAlign: 'center',
    fontWeight: '700',
  },
  reto: {
    color: '#00aeef',
    fontSize: 40,
    textAlign: 'center',
    fontWeight: '700',
    paddingTop: 15,
  },
  contenedorDatos: {
    position: 'absolute',
    zIndex: 100,
    width: '100%',
  },
});
