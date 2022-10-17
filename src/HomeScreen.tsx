import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Linking,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Camera, CameraDevice, useCameraDevices } from 'react-native-vision-camera';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { useNavigation } from '@react-navigation/native';
//import RNFS from 'react-native-fs';

const HomeScreen = () => {
    const navigation = useNavigation();
    const devices = useCameraDevices();
    const { width, height } = Dimensions.get('screen');
    const [deviceSelected, setDeviceSelected] = useState<CameraDevice | undefined>();
    const [permited, setPermited] = useState(false);
    const cameraRef = useRef<Camera>(null);
    const [photoPath, setPhotoPath] = useState<String | undefined>(undefined);

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
        button: {
            backgroundColor: '#26C0DB',
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
            width: 320,
            borderRadius: 25,
            position: 'absolute',
            bottom: 40,
        },
        buttonLabel: {
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
        activityIndicatorContainer: {
            flex: 1,
            backgroundColor:
                'white',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    useEffect(() => {
        checkCameraPermission();
    });

    useEffect(() => {
        setDeviceSelected(devices.front);
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
        }

        if (deviceSelected === devices.front) {
            setDeviceSelected(devices.back);
        }
    }

    async function cameraTakePhoto() {
        const photo = await cameraRef.current?.takePhoto({
            qualityPrioritization: 'speed',
            enableAutoStabilization: true,
        });
        if (photo) {
            await cropImage(photo.path).then(
                result => {
                    setPhotoPath(result);
                    navigation.navigate('PreviewScreen', { imagePath: result });
                }
            ).catch(
                error => console.log('error ==>', error)
            );
        }
    }

    async function cropImage(imageUri: string) {
        let croppedImage = '';
        const anchoRecomendado = 600;
        const altoRecomendado = 720;
        await ImageResizer.createResizedImage(
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
        ).then(result => {
            //const img64 = await RNFS.readFile(result.uri, 'base64');
            // console.log({ img64 });
            croppedImage = result.uri;
        }
        ).catch(
            error => console.log({ error })
        );

        return croppedImage;
    }



    return (
        <SafeAreaView style={styles.container}>
            {permited
                &&
                <View style={styles.cameraContainer}>
                    <Camera
                        ref={cameraRef}
                        style={styles.camera}
                        device={deviceSelected!}
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
                            style={styles.button}>
                            <Text style={styles.buttonLabel}>
                                TAKE
                            </Text>
                        </Pressable>
                    </View>
                </View>
            }
        </SafeAreaView>
    );
};

export default HomeScreen;
