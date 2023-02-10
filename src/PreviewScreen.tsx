import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  Pressable,
  BackHandler,
  View,
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
      <Image
        source={{uri: props.params?.imagePath}}
        style={styles.image}
        resizeMode={'contain'}
      />
      <View style={styles.desaBox}>
        <Text style={styles.desaAcept}>
          {props.params?.desaAceptado?.toFixed(4)}°
        </Text>
      </View>
      <Pressable style={styles.button} onPress={handleButtonBack}>
        <Text style={styles.buttonLabel}>VOLVER</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default PreviewScreen;

const styles = StyleSheet.create({
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
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
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
});
