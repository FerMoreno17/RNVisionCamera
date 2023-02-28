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
import {IDesafiosReducer} from './redux/reducer/DesafiosReducer';

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
          borderColor: 'yellow',
        }}
      />
    );
  }
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [permited, setPermited] = useState(false);
  const [condicionX, setCondicionX] = useState<number>();
  const desafios: IDesafiosReducer = useSelector(
    (state: any) => state.desafios,
  );
  let X;
  let S;
  let GOL;
  let GOD;
  const [type, setType] = useState(
    !desafios.frontSelected ? CameraType.front : CameraType.back,
  );
  const [indicator, setIndicator] = useState(false);
  const [ratioo, setRatio] = useState<string | undefined>();
  const [AspRatioo, setAspRatio] = useState<number>(1);
  const cameraRef = useRef<Camera>(null);
  const [contaFrame, setContaFrame] = useState(0);
  const [aux, setAux] = useState(0);
  const [frameDate, setFrameDate] = useState<any>();
  const [detectFace, setDetectFace] = useState(false);
  const [contaDetectFace, setContaDetectFace] = useState(
    desafios.tiempoArranque,
  );
  const [originBounds, setBounds] = useState<any>();
  const [textHelp, setTextHelp] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    checkCameraPermission().then(resp => {
      setPermited(resp);
    });
  }, []);

  const LimitFaceDetect = (originBounds: any) => {
    return (
      <View
        style={{
          position: 'absolute',
          top: originBounds.originBounds.c,
          left: `${originBounds.originBounds.b}%`,
          height: originBounds.originBounds.d - originBounds.originBounds.c,
          width: originBounds.originBounds.a,
          zIndex: 1000,
          borderWidth: 3,
          borderColor: 'red',
          borderStyle: 'dashed',
          borderLeftWidth: 0,
          borderRightWidth: 0,
        }}
      />
    );
  };

  const handleFacesDetected = ({faces}: FaceDetectionResult) => {
    if (faces.length > 0) {
      try {
        X = faces[0].yawAngle;
        S = faces[0].smilingProbability;
        GOL = faces[0].rightEyeOpenProbability;
        GOD = faces[0].leftEyeOpenProbability;
        if (S !== undefined && GOL !== undefined && GOD !== undefined) {
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
            faces[0].bounds.size.width >= width * 0.3 &&
            faces[0].bounds.origin.y + faces[0].bounds.size.height <=
              height * 0.72 &&
            faces[0].bounds.origin.y >= height * 0.15
          ) {
            if (desafios.value[0] === desafiosList.MI) {
              setCondicionX(X);
              if (
                X > desafios.mirarIzquierda.min &&
                X < desafios.mirarIzquierda.max
              ) {
                setIndicator(true);
                setTextHelp('No te muevas hasta que se capture el desafío');
                contaFrame === 0 &&
                  (setFrameDate(new Date().valueOf()),
                  setContaFrame(contaFrame + 1));
                (new Date().valueOf() - frameDate) / 1000 >
                  desafios.tiempoCaptura &&
                  contaFrame === 1 &&
                  (setContaFrame(contaFrame + 1),
                  handleTakePicture(X, S, GOL, GOD));
              } else {
                setContaFrame(0);
                setIndicator(false);
                setTextHelp('Realice el desafio');
              }
            }

            if (desafios.value[0] === desafiosList.MD) {
              setCondicionX(X);
              if (
                X > desafios.mirarDerecha.min &&
                X < desafios.mirarDerecha.max
              ) {
                setIndicator(true);
                setTextHelp('No te muevas hasta que se capture el desafío');
                contaFrame === 0 &&
                  (setFrameDate(new Date().valueOf()),
                  setContaFrame(contaFrame + 1));
                (new Date().valueOf() - frameDate) / 1000 >
                  desafios.tiempoCaptura &&
                  contaFrame === 1 &&
                  (setContaFrame(contaFrame + 1),
                  handleTakePicture(X, S, GOL, GOD));
              } else {
                setContaFrame(0);
                setIndicator(false);
                setTextHelp('Realice el desafio');
              }
            }

            if (desafios.value[0] === desafiosList.MF) {
              setCondicionX(X);
              if (
                X > desafios.mirarFrente.min ||
                X < desafios.mirarFrente.max
              ) {
                setIndicator(true);
                setTextHelp('No te muevas hasta que se capture el desafío');
                contaFrame === 0 &&
                  (setFrameDate(new Date().valueOf()),
                  setContaFrame(contaFrame + 1));
                (new Date().valueOf() - frameDate) / 1000 >
                  desafios.tiempoCaptura &&
                  contaFrame === 1 &&
                  (setContaFrame(contaFrame + 1),
                  handleTakePicture(X, S, GOL, GOD));
              } else {
                setContaFrame(0);
                setIndicator(false);
                setTextHelp('Realice el desafio');
              }
            }
            if (desafios.value[0] === desafiosList.GI) {
              setCondicionX(GOL);
              if (
                GOL > desafios.guiñoIzquierdo.min &&
                GOL < desafios.guiñoIzquierdo.max
              ) {
                setIndicator(true);
                setTextHelp('No te muevas hasta que se capture el desafío');
                contaFrame === 0 &&
                  (setFrameDate(new Date().valueOf()),
                  setContaFrame(contaFrame + 1));
                (new Date().valueOf() - frameDate) / 1000 >
                  desafios.tiempoCaptura &&
                  contaFrame === 1 &&
                  (setContaFrame(contaFrame + 1),
                  handleTakePicture(X, S, GOL, GOD));
              } else {
                setContaFrame(0);
                setIndicator(false);
                setTextHelp('Realice el desafio');
              }
            }
            if (desafios.value[0] === desafiosList.GD) {
              setCondicionX(GOD);
              if (
                GOD > desafios.guiñoDerecho.min &&
                GOD < desafios.guiñoDerecho.max
              ) {
                setIndicator(true);
                setTextHelp('No te muevas hasta que se capture el desafío');
                contaFrame === 0 &&
                  (setFrameDate(new Date().valueOf()),
                  setContaFrame(contaFrame + 1));
                (new Date().valueOf() - frameDate) / 1000 >
                  desafios.tiempoCaptura &&
                  contaFrame === 1 &&
                  (setContaFrame(contaFrame + 1),
                  handleTakePicture(X, S, GOL, GOD));
              } else {
                setContaFrame(0);
                setIndicator(false);
                setTextHelp('Realice el desafio');
              }
            }
            if (desafios.value[0] === desafiosList.S) {
              setCondicionX(S);
              if (S > desafios.sonreir.min && S < desafios.sonreir.max) {
                setIndicator(true);
                setTextHelp('No te muevas hasta que se capture el desafío');
                contaFrame === 0 &&
                  (setFrameDate(new Date().valueOf()),
                  setContaFrame(contaFrame + 1));
                (new Date().valueOf() - frameDate) / 1000 >
                  desafios.tiempoCaptura &&
                  contaFrame === 1 &&
                  (setContaFrame(contaFrame + 1),
                  handleTakePicture(X, S, GOL, GOD));
              } else {
                setContaFrame(0);
                setIndicator(false);
                setTextHelp('Realice el desafio');
              }
            }
          } else {
            faces[0].bounds.size.width < width * 0.3 &&
              setTextHelp('Acérquese al celular');

            faces[0].bounds.size.width > width &&
              setTextHelp('Alejese del celular');

            (faces[0].bounds.origin.y + faces[0].bounds.size.height >
              height * 0.72 ||
              faces[0].bounds.origin.y < height * 0.15) &&
              setTextHelp('Ubíquese en la centro');

            setContaFrame(0);
            setIndicator(false);
          }
        } else {
          //Para refrescar la camara
          setAux(aux + 1);
        }
      } catch (e) {}
    } else {
      setContaFrame(0);
      setIndicator(false);
      setTextHelp('');
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
    if (cameraRef) {
      await cameraRef.current?.getSupportedRatiosAsync().then(ratios => {
        const ratio = ratios[ratios.length - 1];
        setAspRatio(
          parseInt(ratio.substring(ratio.indexOf(':') + 1, ratio.length)) /
            parseInt(ratio.substring(0, ratio.indexOf(':'))),
        );
        setRatio(ratio);
      });
    }
  };

  useEffect(() => {
    let aux = desafios.tiempoArranque;
    let aux2 = setInterval(() => {
      contaDetectFace >= 0 ? setContaDetectFace(aux) : clearInterval(aux2);
      aux--;
    }, 1000);
    setTimeout(() => {
      setDetectFace(true);
    }, (desafios.tiempoArranque + 1) * 1000);
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
            <Text style={styles.textDe}>{textHelp}</Text>
          </View>
          <FrameColor originBounds={originBounds} />
          <LimitFaceDetect
            originBounds={{
              a: width * 0.95,
              b: 2.5,
              c: height * 0.15,
              d: height * 0.72,
            }}
          />

          <Camera
            key={aux}
            style={{
              height: height,
              width: '100%',
              aspectRatio: AspRatioo,
              alignSelf: 'center',
            }}
            onCameraReady={prepareRatio}
            ratio={ratioo}
            type={type}
            ref={cameraRef}
            onFacesDetected={detectFace ? handleFacesDetected : undefined}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              //detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
              runClassifications: FaceDetector.FaceDetectorClassifications.all,
              minDetectionInterval: desafios.intervaloFrame,
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
    zIndex: 1001,
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
