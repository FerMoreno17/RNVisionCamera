/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  Vibration,
} from 'react-native';
import {BarCodeScanningResult, Camera, CameraType} from 'expo-camera';
import {useNavigation} from '@react-navigation/native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import MascaraDni from './MascaraDni';
import AppSpinner from '../../components/AppSpinner';

const QrScreen = () => {
  const navigation = useNavigation();
  const cameraRef = useRef<Camera>(null);
  const [spinner, setSpinner] = useState(false);
  const [ratioo, setRatio] = useState<string | undefined>();
  const [AspRatioo, setAspRatio] = useState<number>(1);
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [indicator, setIndicator] = useState(false);
  const [scanned, setScanned] = useState(false);
  let validAscii: boolean;

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
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

  const handleBarCodeScanned = (data: BarCodeScanningResult) => {
    let response;
    let str: string[] = [];

    try {
      //setBounds(data.boundingBox);
      if (data.data !== undefined) {
        for (var i = 0; i < data.data.length; i++) {
          if (data.data.charCodeAt(i) > 127) {
            validAscii = false;
            return false;
          }

          if (data.data.charAt(i) === '@') {
            str.push(data.data.charAt(i));
          }
        }
        validAscii = true;
      }
      //width x height por que estan invertidos los valores
      if (
        Platform.OS === 'ios' ||
        data.boundingBox.origin.x + data.boundingBox.size.width < height * 0.5
      ) {
        if (validAscii) {
          if (str.length >= 6 && str.length <= 16) {
            const datosQr = data.data.split('@');
            let aux;
            if (data.data.startsWith('@')) {
              aux = datosQr[1].trim();
              response = checkStructure(datosQr, 'OLD');
            } else {
              aux = datosQr[4].trim();
              response = checkStructure(datosQr, 'NEW');
            }
            if (response) {
              setScanned(true);
              setSpinner(true);
              setIndicator(true);
              setTimeout(() => {
                setIndicator(false);
              }, 1000);
              setTimeout(() => {
                Vibration.vibrate(500);
                navigation.navigate('ValidacionExitosaQrScreen', {
                  dni: aux,
                } as any);
                setSpinner(false);
              }, 2000);
            }
          } else {
            return false;
          }
        }
      }
    } catch (e) {
      console.log({e});
    }
  };

  const validDateExp = new RegExp('^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$');

  function checkStructure(datosQr: string[], tipo: string) {
    let nroTramite: string, genero: string, fechaNac: string;
    if (tipo === 'OLD') {
      nroTramite = datosQr[10];
      genero = datosQr[8];
      fechaNac = datosQr[7];
    } else {
      nroTramite = datosQr[0];
      genero = datosQr[3];
      fechaNac = datosQr[6];
    }

    if (nroTramite.length === 11) {
      if (genero === 'M' || genero === 'F') {
        if (validDateExp.test(fechaNac)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  if (cameraRef == null) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size={50} color={'#26C0DB'} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <Text style={styles.titulo}>
          Enfocá tu DNI del lado del código de barras dentro del marco
        </Text>
        <View style={styles.mask}>
          <MascaraDni color={indicator ? '#2BC11Eb2' : '#ffffffb2'} />
        </View>
        <Camera
          onCameraReady={prepareRatio}
          ratio={ratioo}
          style={{flex: 1, aspectRatio: AspRatioo}}
          type={CameraType.back}
          ref={cameraRef}
          onBarCodeScanned={
            scanned ? undefined : data => handleBarCodeScanned(data)
          }
          barCodeScannerSettings={{
            interval: 25,
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.pdf417],
          }}
        />
      </View>
      <AppSpinner open={spinner} />
    </SafeAreaView>
  );
};

export default QrScreen;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
  },
  mask: {
    zIndex: 1000,
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
  titulo: {
    fontWeight: '600',
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    marginTop: 30,
    zIndex: 1001,
    position: 'absolute',
    alignSelf: 'center',
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
  switch: {
    position: 'absolute',
    zIndex: 1001,
    bottom: 80,
    paddingVertical: 15,
    display: 'flex',
    left: '10%',
    flexDirection: 'row',
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
    color: '#000',
    fontSize: 35,
    textAlign: 'center',
    fontWeight: '700',
  },
  contenedorDatos: {
    marginTop: '10%',
    position: 'absolute',
    zIndex: 100,
    width: '90%',
    alignSelf: 'center',
  },
});
