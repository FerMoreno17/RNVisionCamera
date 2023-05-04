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
  Platform,
  Image,
  Pressable,
  Vibration,
} from 'react-native';
import {Camera, CameraType, FaceDetectionResult} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import {useNavigation} from '@react-navigation/native';
import {checkCameraPermission} from './cameraPermission';
import MascaraSelfie from './components/MascaraSelfie';
import {manipulateAsync} from 'expo-image-manipulator';
import {
  DesafiosAction,
  DesafiosActionError,
  ModalS,
  SwitchCamaraAction,
} from './redux/action/DesafiosAction';
import {IDesafiosReducer} from './redux/reducer/DesafiosReducer';
import AppSpinner from './components/AppSpinner';
import {activateKeepAwake, deactivateKeepAwake} from 'expo-keep-awake';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
// interface IProp {
//   originBounds: any;
// }

// const FrameColor = ({originBounds}: IProp) => {
//   if (originBounds !== undefined) {
//     return (
//       <View
//         style={{
//           position: 'absolute',
//           top: originBounds.origin.y,
//           left: originBounds.origin.x,
//           height: originBounds.size.height,
//           width: originBounds.size.width,
//           zIndex: 999,
//         }}
//       />
//     );
//   }
// };

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
  const [initDesa, setInitDesa] = useState(false);
  const dispatch = useDispatch();
  const [spinner, setSpinner] = useState(false);

  const widthBar = width * 0.9;
  const barPoint = widthBar / 2;
  const pointOffset = 30;
  const [desafiosDefault, setDesafiosDefault] = useState<any>();

  useEffect(() => {
    setDesafiosDefault(desafios.value);
    checkCameraPermission().then(resp => {
      setPermited(resp);
    });
  }, []);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      dispatch(ModalS(true));
      return true;
    });
  }, []);

  useEffect(() => {
    desafios.frontSelected
      ? setType(CameraType.front)
      : setType(CameraType.back);
  }, [desafios.frontSelected]);

  const handleFacesDetected = ({faces}: FaceDetectionResult) => {
    activateKeepAwake();
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
              height * 0.75 &&
            faces[0].bounds.origin.y >= height * 0.15
          ) {
            if (desafios.value[0] === desafiosList.MI) {
              setCondicionX(X);
              if (
                X > desafios.mirarIzquierda.min &&
                X < desafios.mirarIzquierda.max
              ) {
                setIndicator(true);
                setTextHelp(desafios.textoDentroDelRango);
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
                setTextHelp(desafios.textoRealizarDesafio);
              }
            }

            if (desafios.value[0] === desafiosList.MD) {
              setCondicionX(X);
              if (
                X > desafios.mirarDerecha.min &&
                X < desafios.mirarDerecha.max
              ) {
                setIndicator(true);
                setTextHelp(desafios.textoDentroDelRango);
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
                setTextHelp(desafios.textoRealizarDesafio);
              }
            }
            if (desafios.value[0] === desafiosList.MF) {
              setCondicionX(X);
              if (
                X > desafios.mirarFrente.min ||
                X < desafios.mirarFrente.max
              ) {
                setIndicator(true);
                setTextHelp(desafios.textoDentroDelRango);
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
                setTextHelp(desafios.textoRealizarDesafio);
              }
            }
          } else {
            faces[0].bounds.size.width < width * 0.3 &&
              setTextHelp(desafios.textoAcercarse);

            faces[0].bounds.size.width > width &&
              setTextHelp(desafios.textoAlejarse);

            (faces[0].bounds.origin.y + faces[0].bounds.size.height >
              height * 0.75 ||
              faces[0].bounds.origin.y < height * 0.15) &&
              setTextHelp(desafios.textoCentrarse);

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
    Vibration.vibrate(1000);
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
            desafios.value.length <= 1 &&
              (setSpinner(true),
              setIndicator(false),
              setTextHelp(''),
              setDetectFace(false));
            enviarDesa(crop.base64, desafios.value[0], Xs, Ss, GOLs, GODs)
              .then((resp: any) => {
                desafios.value.length === 1 &&
                  (deactivateKeepAwake(),
                  navigation.navigate('PreviewScreen', {
                    X: Xs,
                    base64: crop.base64,
                    imagePath: crop.uri,
                    resp: resp,
                  }),
                  setSpinner(false),
                  dispatch(DesafiosAction(desafiosDefault)));
              })
              .catch(() => {
                setSpinner(false),
                  desafios.value.length === 1 &&
                    dispatch(DesafiosAction(desafiosDefault));
                dispatch(
                  DesafiosActionError([
                    ...desafios.valueError,
                    desafios.value[0],
                  ]),
                );
              });
          })
          .catch(error => console.log('error ==>', error));
      });
    });
  };
  if (cameraRef == null) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size={50} color={'#26C0DB'} />
      </View>
    );
  }

  const prepareRatio = async () => {
    if (cameraRef && Platform.OS === 'android') {
      await cameraRef.current?.getSupportedRatiosAsync().then(ratios => {
        const ratio =
          ratios.find(ratiox => ratiox === '16:9') || ratios[ratios.length - 1];
        setAspRatio(
          parseInt(ratio.substring(ratio.indexOf(':') + 1, ratio.length)) /
            parseInt(ratio.substring(0, ratio.indexOf(':'))),
        );
        setRatio(ratio);
      });
    }
  };

  const iniciarDesafio = () => {
    setInitDesa(true);
    let aux1 = desafios.tiempoArranque;
    let aux2 = setInterval(() => {
      contaDetectFace >= 0 ? setContaDetectFace(aux1) : clearInterval(aux2);
      aux1--;
    }, 1000);
    setTimeout(() => {
      setDetectFace(true);
    }, (desafios.tiempoArranque + 1) * 1000);
  };

  const desafioBack = (value: string) => {
    switch (value) {
      case desafiosList2[0]:
        return 'MirarHaciaIzquierda';
      case desafiosList2[1]:
        return 'MirarHaciaDerecha';
      case desafiosList2[2]:
        return 'MirarAlFrente';
    }
  };

  const enviarDesa = async (
    base64s: string,
    desa: string,
    Xss: number,
    Sss: number,
    GOLss: number,
    GODss: number,
  ) => {
    return await fetch(
      'https://superapp.dev.gyfcloud.com.ar/mejorasUx/api/v0.13/enrolamiento/enviardesafio',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          foto: base64s,
          desafio: desafioBack(desa),
          probabilidadGuinioIzq: GOLss,
          probabilidadGuinioDer: GODss,
          probabilidadSonreir: Sss,
          gradoEjeX: Xss,
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
          tiempoInicioDesafio: desafios.tiempoArranque.toString(),
          tiempoRetrasoCaptura: desafios.tiempoCaptura.toString(),
          intervaloFrame: desafios.intervaloFrame.toString(),
        }),
      },
    ).then(resp => {
      return resp.json().then(respJson => {
        return respJson;
      });
    });
  };

  const desafioTitle = (value: string) => {
    switch (value) {
      case desafiosList2[0]:
        return desafios.textoDesafioIzq;
      case desafiosList2[1]:
        return desafios.textoDesafioDer;
      case desafiosList2[2]:
        return desafios.textoDesafioFrente;
      default:
        return '';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {permited && (
        <View style={styles.cameraContainer}>
          <View style={styles.mask}>
            <MascaraSelfie color={indicator ? '#2BC11E9C' : '#ffffffc5'} />
          </View>
          <View
            style={{
              position: 'absolute',
              backgroundColor: '#00000033',
              zIndex: 99,
              width: '100%',
              height: height,
            }}></View>
          {initDesa && (
            <View style={styles.contenedorDatos}>
              <Text style={[styles.reto, indicator && {color: '#fff'}]}>
                {desafioTitle(desafios.value[0])}
              </Text>
              <Text style={[styles.angulo, indicator && {color: '#fff'}]}>
                {condicionX && Math.round(condicionX)}
              </Text>
            </View>
          )}
          <View style={styles.conte}>
            <Text style={styles.textDe}>{textHelp}</Text>
          </View>
          <Camera
            key={aux}
            style={
              Platform.OS === 'ios'
                ? {height: height, width: '100%'}
                : {
                    flex: 1,
                    aspectRatio: AspRatioo,
                    alignSelf: 'center',
                  }
            }
            onCameraReady={prepareRatio}
            ratio={ratioo}
            type={type}
            ref={cameraRef}
            onFacesDetected={
              initDesa && detectFace ? handleFacesDetected : undefined
            }
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              runClassifications: FaceDetector.FaceDetectorClassifications.all,
              minDetectionInterval: desafios.intervaloFrame,
              tracking: true,
            }}
          />

          {!initDesa ? (
            <>
              <View style={[styles.cameraButtonContainer, styles.shadow]}>
                <Pressable
                  onPress={() => {
                    dispatch(SwitchCamaraAction(!desafios.frontSelected));
                  }}
                  style={[
                    styles.cameraButton,
                    styles.shadow,
                    !desafios.frontSelected ? styles.active : styles.inactive,
                  ]}>
                  <FontAwesomeIcon icon={faCamera} color={'white'} size={30} />
                </Pressable>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    marginTop: 5,
                    color: '#002855',
                  }}>
                  GIRAR CAMARA
                </Text>
              </View>
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? '#17A641' : '#17D641',
                  },
                  styles.button,
                ]}
                onPress={iniciarDesafio}>
                <Text style={styles.buttonLabel}>INICIAR</Text>
              </Pressable>
            </>
          ) : (
            desafios.flagIndicador && (
              <View
                style={{
                  backgroundColor: 'transparent',
                  width: widthBar,
                  height: 25,
                  zIndex: 1000,
                  alignSelf: 'center',
                  position: 'absolute',
                  bottom: 80,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#747474',
                    width: '100%',
                    height: 25,
                    justifyContent: 'center',
                    borderRadius: 20,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,

                    elevation: 7,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#17D641',
                      width:
                        desafios.value[0] === desafiosList.MF
                          ? (width * 0.45 * 16) / 50 + 20
                          : (width * 0.45 * 15) / 50 + 20,
                      height: 25,
                      position: 'absolute',
                      left:
                        desafios.value[0] === desafiosList.MI
                          ? (width * 0.45 * 10) / 50 - 20
                          : desafios.value[0] === desafiosList.MD
                          ? width * 0.9 -
                            (width * 0.45 * 10) / 50 -
                            (width * 0.45 * 15) / 50
                          : width * 0.45 - (width * 0.45 * 16) / 50 + 20,
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      left:
                        condicionX !== undefined
                          ? condicionX >= 0 && condicionX < 90
                            ? (width * 0.45 * condicionX) / 50 +
                              width * 0.45 -
                              (desafios.value[0] !== desafiosList.MF ? 0 : 10)
                            : width * 0.45 -
                              (width * 0.45 * (360 - condicionX)) / 50 -
                              (desafios.value[0] !== desafiosList.MF ? 20 : 10)
                          : width * 0.45 - 10,
                    }}
                  />
                </View>
              </View>
            )
          )}
        </View>
      )}
      <AppSpinner open={spinner} />
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

export const desafiosList2 = [
  'Mirar Izquierda',
  'Mirar Derecha',
  'Mirar Frente',
  'Guiño Izquierdo',
  'Guiño Derecho',
  'Sonreir',
];
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
    zIndex: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonLabel: {
    fontSize: 24,
    color: 'white',
    fontWeight: '700',
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
  cameraButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1001,
    bottom: 100,
    right: 20,
  },
  cameraButton: {
    maxWidth: 55,
    justifyContent: 'center',
    padding: 13,
    borderRadius: 100,
  },
  active: {
    backgroundColor: '#17D641',
  },
  inactive: {
    backgroundColor: '#002855',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
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
    color: '#000',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '700',
  },
  angulo: {
    color: 'red',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 10,
  },
  contenedorDatos: {
    marginTop: '3%',
    position: 'absolute',
    zIndex: 100,
    width: '95%',
    alignSelf: 'center',
  },
});
