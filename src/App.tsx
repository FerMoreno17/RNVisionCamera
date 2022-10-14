import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Camera, CameraDevice, useCameraDevices } from 'react-native-vision-camera';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import RNFS from 'react-native-fs';

const App = () => {
  const devices = useCameraDevices();
  const { width, height } = Dimensions.get('screen');
  const [cameraType, setCameraType] = useState<CameraDevice | undefined>();
  const [permited, setPermited] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const [photoPath, setPhotoPath] = useState('');

  useEffect(() => {
    checkCameraPermission();
  });

  useEffect(() => {
    setCameraType(devices.front);
  }, [devices]);

  async function checkCameraPermission() {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') {
      await Linking.openSettings();
    }

    if (permission === 'authorized') {
      setPermited(true);
    }
  }

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
      alignItems: 'center',
    },
    buttonTake: {
      backgroundColor: '#26C0DB',
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      width: 320,
      borderRadius: 25,
      position: 'absolute',
      bottom: 40,
    },
    buttonTakeLabel: {
      fontSize: 18,
      color: 'white',
    },
    changeCameraButton: {
      backgroundColor: '#26c0db',
      padding: 20,
      borderRadius: 100,
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
  });

  if (cameraType == null) {
    return (
      <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={50} color={'#26C0DB'} />
      </View>
    );
  }

  if (photoPath !== '') {
    console.log({ photoPath });
    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: `file://${photoPath}` }} style={styles.image} resizeMode={'contain'} />
        <Pressable
          style={{ backgroundColor: 'red', padding: 20, marginVertical: 20 }}
          onPress={() => setPhotoPath('')}>
          <Text>Back</Text>
        </Pressable>
      </View>
    );
  }

  function cameraFlip() {
    if (cameraType === devices.back) {
      console.log('cambio front');
      setCameraType(devices.front);
    }

    if (cameraType === devices.front) {
      console.log('cambio back');
      setCameraType(devices.back);
    }
  }

  async function cameraTakePhoto() {
    const photo = await cameraRef.current?.takePhoto({
      qualityPrioritization: 'speed',
      enableAutoStabilization: true,
    });
    if (photo) {
      console.log({ photo });
      cropImage(photo.path);
    }
  }

  async function cropImage(imageUri: string) {
    const anchoRecomendado = 600;
    const altoRecomendado = 720;
    const result = await ImageResizer.createResizedImage(
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
      }
    );
    //console.log({ result });
    const img64 = await RNFS.readFile(result.uri, 'base64');
    console.log({ img64 });
    setPhotoPath(result.uri);
  }

  return (
    <SafeAreaView style={styles.container}>
      {permited
        &&
        <View style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            device={cameraType!}
            isActive={true}
            photo={true}
            enableZoomGesture
          />
          <View style={styles.bottomContainer}>
            <Pressable
              style={styles.changeCameraButton}
              onPress={cameraFlip}
            >
              <Text>Flip</Text>
            </Pressable>
            <Pressable
              onPress={cameraTakePhoto}
              style={styles.buttonTake}>
              <Text style={styles.buttonTakeLabel}>
                TAKE
              </Text>
            </Pressable>
          </View>
        </View>
      }
    </SafeAreaView>
  );
};

export default App;
