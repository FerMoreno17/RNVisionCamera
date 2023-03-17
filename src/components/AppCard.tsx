import React from 'react';
import {StyleSheet, View, Platform, Text} from 'react-native';

function AppCard({item}) {
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
    <View style={[styles.container, styles.shadow, styles.fullBorderRadius]}>
      <View style={styles.icon}>{item.imageUrl}</View>
      <Text style={styles.label}>{item.title}</Text>
    </View>
  );
}

export default AppCard;
