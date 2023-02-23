import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  DesafioGuiñoDerecha,
  DesafioGuiñoIzquierda,
  DesafioMirarDerecha,
  DesafioMirarFrente,
  DesafioMirarIquierda,
  DesafioSonreir,
  IntervaloFrame,
  TiempoArranque,
  TiempoCaptura,
} from './redux/action/DesafiosAction';
import {useNavigation} from '@react-navigation/native';
import {IDesafiosReducer} from './redux/reducer/DesafiosReducer';

const ConfiguracionScreen = () => {
  const desafios: IDesafiosReducer = useSelector(
    (state: any) => state.desafios,
  );
  const dispatch = useDispatch();
  const [mirarIzMAX, setMirarIzMAX] = useState(
    desafios.mirarIzquierda.max.toString(),
  );
  const [mirarIzMIN, setMirarIzMIN] = useState(
    desafios.mirarIzquierda.min.toString(),
  );
  const [mirarDrMIN, setMirarDrMIN] = useState(
    desafios.mirarDerecha.min.toString(),
  );
  const [mirarDrMAX, setMirarDrMAX] = useState(
    desafios.mirarDerecha.max.toString(),
  );
  const [ojoIzqMAX, setOjoIzqMAX] = useState(
    desafios.guiñoIzquierdo.max.toString(),
  );
  const [ojoIzqMIN, setOjoIzqMIN] = useState(
    desafios.guiñoIzquierdo.min.toString(),
  );
  const [ojoDerMAX, setOjoDerMAX] = useState(
    desafios.guiñoDerecho.max.toString(),
  );
  const [ojoDerMIN, setOjoDerMIN] = useState(
    desafios.guiñoDerecho.min.toString(),
  );
  const [sonrisaMAX, setSonrisaMAX] = useState(desafios.sonreir.max.toString());
  const [sonrisaMIN, setSonrisaMIN] = useState(desafios.sonreir.min.toString());
  const [mirarFMAX, setMirarFMAX] = useState(
    desafios.mirarFrente.max.toString(),
  );
  const [mirarFMIN, setMirarFMIN] = useState(
    desafios.mirarFrente.min.toString(),
  );
  const [tiempoArranque, setTiempoArranque] = useState(
    desafios.tiempoArranque.toString(),
  );

  const [tiempoCaptura, setTiempoCaptura] = useState(
    desafios.tiempoCaptura.toString(),
  );

  const [intervaloFrame, setIntervaloFrame] = useState(
    desafios.intervaloFrame.toString(),
  );

  const navigation = useNavigation();

  const guardarConfiguracion = () => {
    dispatch(IntervaloFrame(parseFloat(intervaloFrame)));
    dispatch(TiempoArranque(parseFloat(tiempoArranque)));
    dispatch(TiempoCaptura(parseFloat(tiempoCaptura)));
    dispatch(
      DesafioMirarIquierda({
        min: parseFloat(mirarIzMIN === '' ? '0' : mirarIzMIN),
        max: parseFloat(mirarIzMAX === '' ? '0' : mirarIzMAX),
      }),
    );
    dispatch(
      DesafioMirarDerecha({
        min: parseFloat(mirarDrMIN === '' ? '0' : mirarDrMIN),
        max: parseFloat(mirarDrMAX === '' ? '0' : mirarDrMAX),
      }),
    );
    dispatch(
      DesafioMirarFrente({
        min: parseFloat(mirarFMIN === '' ? '0' : mirarFMIN),
        max: parseFloat(mirarFMAX === '' ? '0' : mirarFMAX),
      }),
    );
    dispatch(
      DesafioGuiñoIzquierda({
        min: parseFloat(ojoIzqMIN === '' ? '0' : ojoIzqMIN),
        max: parseFloat(ojoIzqMAX === '' ? '0' : ojoIzqMAX),
      }),
    );
    dispatch(
      DesafioGuiñoDerecha({
        min: parseFloat(ojoDerMIN === '' ? '0' : ojoDerMIN),
        max: parseFloat(ojoDerMAX === '' ? '0' : ojoDerMAX),
      }),
    );
    dispatch(
      DesafioSonreir({
        min: parseFloat(sonrisaMIN === '' ? '0' : sonrisaMIN),
        max: parseFloat(sonrisaMAX === '' ? '0' : sonrisaMAX),
      }),
    );

    navigation.navigate('HomeScreen', {} as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.titulo}>Mirar Izquierda</Text>
        <View style={styles.containerInputs}>
          <Text style={styles.placeHolder}>MIN</Text>
          <TextInput
            keyboardType="numeric"
            value={mirarIzMIN}
            style={styles.textInput}
            onChangeText={setMirarIzMIN}
          />
          <Text style={styles.placeHolder}>MAX</Text>
          <TextInput
            keyboardType="numeric"
            value={mirarIzMAX}
            style={styles.textInput}
            onChangeText={setMirarIzMAX}
          />
        </View>
        <Text style={styles.titulo}>Mirar Derecha</Text>
        <View style={styles.containerInputs}>
          <Text style={styles.placeHolder}>MIN</Text>
          <TextInput
            keyboardType="numeric"
            value={mirarDrMIN}
            style={styles.textInput}
            onChangeText={setMirarDrMIN}
          />
          <Text style={styles.placeHolder}>MAX</Text>
          <TextInput
            keyboardType="numeric"
            value={mirarDrMAX}
            style={styles.textInput}
            onChangeText={setMirarDrMAX}
          />
        </View>
        <Text style={styles.titulo}>Mirar Frente</Text>
        <View style={styles.containerInputs}>
          <Text style={styles.placeHolder}>MIN</Text>
          <TextInput
            keyboardType="numeric"
            value={mirarFMIN}
            style={styles.textInput}
            onChangeText={setMirarFMIN}
          />
          <Text style={styles.placeHolder}>MAX</Text>
          <TextInput
            keyboardType="numeric"
            value={mirarFMAX}
            style={styles.textInput}
            onChangeText={setMirarFMAX}
          />
        </View>
        <Text style={styles.titulo}>Guiño Izquierdo</Text>
        <View style={styles.containerInputsProb}>
          <Text style={styles.placeHolder}>MIN</Text>
          <TextInput
            keyboardType="numeric"
            value={ojoIzqMIN}
            style={styles.textInput}
            onChangeText={setOjoIzqMIN}
          />
          <Text style={styles.placeHolder}>MAX</Text>
          <TextInput
            keyboardType="numeric"
            value={ojoIzqMAX}
            style={styles.textInput}
            onChangeText={setOjoIzqMAX}
          />
        </View>
        <Text style={styles.titulo}>Guiño Derecho</Text>
        <View style={styles.containerInputsProb}>
          <Text style={styles.placeHolder}>MIN</Text>
          <TextInput
            keyboardType="numeric"
            value={ojoDerMIN}
            style={styles.textInput}
            onChangeText={setOjoDerMIN}
          />
          <Text style={styles.placeHolder}>MAX</Text>
          <TextInput
            keyboardType="numeric"
            value={ojoDerMAX}
            style={styles.textInput}
            onChangeText={setOjoDerMAX}
          />
        </View>
        <Text style={styles.titulo}>Sonreir</Text>
        <View style={styles.containerInputsProb}>
          <Text style={styles.placeHolder}>MIN</Text>
          <TextInput
            keyboardType="numbers-and-punctuation"
            value={sonrisaMIN}
            style={styles.textInput}
            onChangeText={setSonrisaMIN}
          />
          <Text style={styles.placeHolder}>MAX</Text>
          <TextInput
            keyboardType="numbers-and-punctuation"
            value={sonrisaMAX}
            style={styles.textInput}
            onChangeText={setSonrisaMAX}
          />
        </View>
        <Text style={styles.titulo}>Tiempo para iniciar el desafio(1=1s)</Text>
        <View style={styles.contTiempo}>
          <TextInput
            keyboardType="numbers-and-punctuation"
            value={tiempoArranque}
            style={styles.textInputTiempos}
            onChangeText={setTiempoArranque}
          />
        </View>
        <Text style={styles.titulo}>Tiempo para retrasar la captura(1=1s)</Text>
        <View style={styles.contTiempo}>
          <TextInput
            keyboardType="numbers-and-punctuation"
            value={tiempoCaptura}
            style={styles.textInputTiempos}
            onChangeText={setTiempoCaptura}
          />
        </View>
        <Text style={styles.titulo}>Intervalo de cada frame(1000=1s)</Text>
        <View style={styles.contTiempo}>
          <TextInput
            keyboardType="numbers-and-punctuation"
            value={intervaloFrame}
            style={styles.textInputTiempos}
            onChangeText={setIntervaloFrame}
          />
        </View>
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

let desafiosListAngulos = ['Mirar Izquierda', 'Mirar Derecha', 'Mirar Frente'];

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
    width: '20%',
    borderColor: 'black',
    borderWidth: 1,
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
  textInputTiempos: {
    width: '27%',
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
    justifyContent: 'space-evenly',
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
  contTiempo: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '26%',
    alignItems: 'center',
  },
});
