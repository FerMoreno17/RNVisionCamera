import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Pressable,
  BackHandler,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppCard from '../../components/AppCard';
import {useDispatch} from 'react-redux';
import {DesafiosActionError} from '../../redux/action/DesafiosAction';

function ConsejosQRScreen() {
  const DATA = [
    {
      id: '1',
      imageUrl: require('../../assets/Vector.png'),
      title: 'Buscá un lugar con buena luz.',
    },
    {
      id: '2',
      imageUrl: require('../../assets/mesa.png'),
      title: 'Colocalo sobre una mesa',
    },
  ];
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(DesafiosActionError([]));
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.body}>
        <Text style={styles.titulo}>Escaneo de DNI</Text>
        <View style={styles.greyBox} />
        <AppCard DATA={DATA} />
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#17A641' : '#17D641',
            },
            styles.button,
          ]}
          onPress={() => {
            navigation.navigate('QrScreen');
          }}>
          <Text style={styles.buttonLabel}>INICIAR</Text>
        </Pressable>
        <View style={styles.actions} />
      </View>
    </SafeAreaView>
  );
}

export default ConsejosQRScreen;
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  button: {
    zIndex: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: '100%',
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
  body: {
    flex: 1,
    marginHorizontal: '5%',
  },
  actions: {
    paddingBottom: 40,
    width: width * 0.9,
    paddingTop: 16,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  marginSinTitulo: {
    marginTop: height * 0.085,
  },
  titulo: {
    fontWeight: '600',
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    marginBottom: 55,
    marginTop: 30,
  },
  greyBox: {
    backgroundColor: '#D9D9D9',
    height: height * 0.3,
    width: width * 0.9,
    borderRadius: 14,
    marginBottom: 30,
    alignSelf: 'center',
  },
});
