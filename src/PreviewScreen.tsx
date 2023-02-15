import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  Pressable,
  BackHandler,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const PreviewScreen = () => {
  const navigation = useNavigation();
  const props = useRoute();

  function handleButtonBack() {
    navigation.reset({routes: [{name: 'HomeScreen'}] as any});
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.reset({routes: [{name: 'HomeScreen'}] as any});
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.imageContainer}>
      <ImageBackground
        blurRadius={60}
        style={{
          flex: 1,
          width: '100%',
        }}
        source={{uri: props.params?.imagePath}}
        imageStyle={styles.resize}>
        <Image
          source={{uri: props.params?.imagePath}}
          style={styles.image}
          resizeMode={'contain'}
        />
      </ImageBackground>
      <View
        style={{
          height: Dimensions.get('screen').height * 0.3,
          width: '80%',
        }}>
        <View style={styles.desaBox}>
          <Text style={styles.desaAcepttitle}>Angulo del eje X:</Text>
          <Text style={styles.desaAcept}>{props.params?.X?.toFixed(4)}°</Text>
        </View>
        <View style={styles.desaBox}>
          <Text style={styles.desaAcepttitle}>Prob. de Sonreir:</Text>
          <Text style={styles.desaAcept}>{props.params?.S?.toFixed(4)}%</Text>
        </View>
        <View style={styles.desaBox}>
          <Text style={styles.desaAcepttitle}>Prob. de abrir ojo Izq:</Text>
          <Text style={styles.desaAcept}>{props.params?.GOL?.toFixed(4)}%</Text>
        </View>
        <View style={styles.desaBox}>
          <Text style={styles.desaAcepttitle}>Prob. de abrir ojo Der:</Text>
          <Text style={styles.desaAcept}>{props.params?.GOD?.toFixed(4)}%</Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Pressable
          style={[styles.button, {backgroundColor: 'grey'}]}
          onPress={handleButtonBack}>
          <Text style={styles.buttonLabel}>{'VOLVER'}</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonLabel}>ENVIAR</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default PreviewScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00aeef',
    padding: 20,
    margin: 10,
    alignItems: 'center',
    flex: 1,
    borderRadius: 25,
    bottom: 40,
  },
  buttonLabel: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
  },
  imageContainer: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    flex: 1,
  },
  desaAcepttitle: {
    color: '#00aeef',
    fontWeight: '700',
    fontSize: 20,
    marginTop: 20,
  },
  desaAcept: {
    color: '#000',
    fontWeight: '700',
    fontSize: 20,
    marginTop: 20,
  },
  desaBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imagenPrevia: {
    flex: 1,
    alignSelf: 'center',
  },
  resize: {
    resizeMode: 'cover',
  },
});
