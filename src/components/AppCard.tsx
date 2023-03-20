import React from 'react';
import {StyleSheet, View, Platform, Text, Image} from 'react-native';

export const AppCard = () => {
  const DATA = [
    {
      id: '1',
      imageUrl: require('../assets/Vector.png'),
      title: 'Buscá un lugar con buena luz.',
    },
    {
      id: '2',
      imageUrl: require('../assets/SinVentana.png'),
      title: 'Con un fondo claro y sin ventanas',
    },
    {
      id: '3',
      imageUrl: require('../assets/SinAnteojos.png'),
      title: 'No uses anteojos, barbijo, ni nada que tape tu rostro',
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 10,
      ...Platform.select({
        ios: {
          margin: 12,
        },
        android: {
          marginBottom: 12,
        },
      }),
    },
    label: {
      flex: 3,
      textAlign: 'left',
      fontSize: 20,
      color: 'black',
    },
    icon: {
      flex: 1,
      alignItems: 'center',
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    fullBorderRadius: {
      borderRadius: 10,
    },
  });

  return (
    <>
      {DATA.map((item, key) => (
        <View
          key={key}
          style={[styles.container, styles.shadow, styles.fullBorderRadius]}>
          <Image
            style={{width: 45, height: 45, marginRight: 25}}
            resizeMode="contain"
            source={item.imageUrl}
          />
          <Text style={styles.label}>{item.title}</Text>
        </View>
      ))}
    </>
  );
};

export default AppCard;
