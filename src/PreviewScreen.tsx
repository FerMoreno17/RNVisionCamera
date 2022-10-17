import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const PreviewScreen = () => {
    const navigation = useNavigation();
    const props = useRoute();

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
            fontSize: 18,
            color: 'white',
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

    function handleButtonBack() {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.imageContainer}>
            <Image
                source={{ uri: `file://${props.params.imagePath}` }}
                style={styles.image}
                resizeMode={'contain'} />
            <Pressable
                style={styles.button}
                onPress={handleButtonBack}>
                <Text style={styles.buttonLabel}>Back</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default PreviewScreen;
