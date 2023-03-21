/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  Vibration,
  Alert,
} from 'react-native';
import {BarCodeScanningResult, Camera, CameraType} from 'expo-camera';
import {useNavigation} from '@react-navigation/native';
import {manipulateAsync} from 'expo-image-manipulator';
import {BarCodeBounds, BarCodeScanner} from 'expo-barcode-scanner';

const QrScreen = () => {
  const navigation = useNavigation();
  const cameraRef = useRef<Camera>(null);
  const dispatch = useDispatch();
  const [ratioo, setRatio] = useState<string | undefined>();
  const [AspRatioo, setAspRatio] = useState<number>(1);
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);
  const [point, setPoint] = useState<BarCodeBounds>();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = (data: BarCodeScanningResult) => {
    if (data.data !== undefined) {
      setScanned(true);
      Alert.alert(
        `Bar code with type ${data.type} and data ${data.data} has been scanned!`,
      );
    }
  };

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

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleTakePicture = async () => {
    if (cameraRef) {
      await cameraRef.current?.takePictureAsync({
        quality: 0.5,
        skipProcessing: true,
        onPictureSaved: data => {
          cropImage(data?.uri!);
        },
      });
    }
    return;
  };

  const cropImage = async (imageUri: string) => {
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
            Vibration.vibrate(500);
            console.log(crop);
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

  return (
    <SafeAreaView style={styles.container}>
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
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.pdf147],
        }}
      />
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
