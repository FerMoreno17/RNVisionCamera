import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';

interface IProps {
  open: boolean;
}

export default function AppSpinner({open = false}: IProps) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
  });
  return (
    <Modal animationType="fade" transparent={true} visible={open}>
      <View style={styles.container}>
        <ActivityIndicator size={75} color={'#fff'} />
      </View>
    </Modal>
  );
}
