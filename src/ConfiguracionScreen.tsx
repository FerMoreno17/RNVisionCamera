import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {DesafioMirarIquierda} from './redux/action/DesafiosAction';
import {IRootState} from './redux/reducer/rootReducer';
import {useNavigation} from '@react-navigation/native';

const ConfiguracionScreen = () => {
  const desafios = useSelector((state: IRootState) => state.desafios);
  const dispatch = useDispatch();
  const [mirarIzXP, setMirarIzXP] = useState(
    desafios.mirarIzquierda.xp.toString(),
  );
  const [mirarIzXN, setMirarIzXN] = useState(
    desafios.mirarIzquierda.xn.toString(),
  );
  const [mirarIzYP, setMirarIzYP] = useState(
    desafios.mirarIzquierda.yp.toString(),
  );
  const [mirarIzYN, setMirarIzYN] = useState(
    desafios.mirarIzquierda.yn.toString(),
  );

  const [mirarDr, setMirarDr] = useState(0);
  const [mirarAb, setMirarAb] = useState(0);
  const [mirarAr, setMirarAr] = useState(0);
  const [mirarF, setMirarF] = useState(0);
  const navigation = useNavigation();

  const guardarConfiguracion = () => {
    dispatch(
      DesafioMirarIquierda({
        xn: parseFloat(mirarIzXN),
        xp: parseFloat(mirarIzXP),
        yn: parseFloat(mirarIzYN),
        yp: parseFloat(mirarIzYP),
      }),
    );
    navigation.navigate('HomeScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <>
          <Text style={styles.titulo}>Mirar Izquierda</Text>
          <View style={styles.containerInputs}>
            <Text style={styles.placeHolder}>MIN X</Text>
            <TextInput
              keyboardType="numeric"
              value={mirarIzXN}
              style={styles.textInput}
              onChangeText={setMirarIzXN}
            />
            <Text style={styles.placeHolder}>MAX X</Text>
            <TextInput
              keyboardType="numeric"
              value={mirarIzXP}
              style={styles.textInput}
              onChangeText={setMirarIzXP}
            />
            <Text style={styles.placeHolder}>MIN Y</Text>
            <TextInput
              keyboardType="numeric"
              value={mirarIzYN}
              style={styles.textInput}
              onChangeText={setMirarIzYN}
            />
            <Text style={styles.placeHolder}>MAX Y</Text>
            <TextInput
              keyboardType="numeric"
              value={mirarIzYP}
              style={styles.textInput}
              onChangeText={setMirarIzYP}
            />
          </View>
        </>
        {desafiosListProbabilidades.map((resp, index) => (
          <View key={index}>
            <Text style={styles.titulo}>{resp}</Text>
            <View style={styles.containerInputsProb}>
              <Text style={styles.placeHolder}>MIN</Text>
              <TextInput value="" style={[styles.textInput]} />
              <Text style={styles.placeHolder}>MAX</Text>
              <TextInput value="" style={[styles.textInput]} />
            </View>
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          alignSelf: 'center',
          paddingVertical: 10,
        }}>
        <Button
          onPress={() => {
            guardarConfiguracion();
          }}
          title="GUARDAR"
        />
      </View>
    </SafeAreaView>
  );
};

export default ConfiguracionScreen;

let desafiosListAngulos = [
  'Mirar Izquierda',
  'Mirar Derecha',
  'Mirar Arriba',
  'Mirar Abajo',
  'Mirar Frente',
];

let desafiosListProbabilidades = [
  'Guiño Izquierdo',
  'Guiño Derecho',
  'Sonreir',
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 60,
  },
  textInput: {
    width: '10%',
    borderColor: 'black',
    borderWidth: 1,
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
  containerInputs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  containerInputsProb: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeHolder: {
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 5,
  },
  titulo: {
    color: '#00aeef',
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 5,
  },
});
