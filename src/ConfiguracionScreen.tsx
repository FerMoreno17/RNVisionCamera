import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
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
  TextoMirarIzq,
  TextoMirarDer,
  TextoMirarFrente,
  TextoAlejar,
  TextoMAcercar,
  TextoCentrar,
  TextoRealizarDesa,
  TextoMDentroDelRango,
  DesafiosAction,
  FlagIndicadorMov,
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

  const [textoMirarIzq, setTextoMirarIzq] = useState(desafios.textoDesafioIzq);
  const [textoMirarDer, setTextoMirarDer] = useState(desafios.textoDesafioDer);
  const [textoMirarFrente, setTextoMirarFrente] = useState(
    desafios.textoDesafioFrente,
  );
  const [textoAcercarse, setTextoAcercarse] = useState(desafios.textoAcercarse);
  const [textoAlejarse, setTextoAlejarse] = useState(desafios.textoAlejarse);
  const [textoCentrarse, setTextoCentrarse] = useState(desafios.textoCentrarse);
  const [textoRealizarDesafio, setTextoRealizarDesafio] = useState(
    desafios.textoRealizarDesafio,
  );
  const [textoDentroDelRango, setTextoDentroDelRango] = useState(
    desafios.textoDentroDelRango,
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
    dispatch(TextoMirarIzq(textoMirarIzq));
    dispatch(TextoMirarDer(textoMirarDer));
    dispatch(TextoMirarFrente(textoMirarFrente));
    dispatch(TextoAlejar(textoAlejarse));
    dispatch(TextoMAcercar(textoAcercarse));
    dispatch(TextoCentrar(textoCentrarse));
    dispatch(TextoRealizarDesa(textoRealizarDesafio));
    dispatch(TextoMDentroDelRango(textoDentroDelRango));

    navigation.navigate('HomeScreen', {} as any);
  };
  const gestionarDesafios = (value: string) => {
    dispatch(DesafiosAction([value]));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.titulo}>Orden de los desafíos</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: 15,
          }}>
          {desafiosListAngulos.map((index, key) => (
            <Pressable
              key={key}
              style={{borderWidth: 1, padding: 5}}
              onPress={() => {
                gestionarDesafios(index.enum);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <Text
                  style={{color: 'orange', fontSize: 20, fontWeight: '700'}}>
                  {desafios.value.map((resp, keyy) => {
                    if (resp === index.enum) {
                      let aux3 = keyy + 1;
                      return aux3;
                    }
                  })}
                </Text>
                <Text style={{color: 'black', fontSize: 20}}>
                  {' ' + index.title}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
        <Text style={styles.titulo}>Activar indicador movimiento</Text>
        <Pressable
          onPress={() => {
            dispatch(FlagIndicadorMov(!desafios.flagIndicador));
          }}
          style={{
            width: 28,
            alignItems: 'center',
            marginLeft: 10,
            padding: 4,
          }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 50,
              borderWidth: 1,

              padding: 2,
            }}>
            {desafios.flagIndicador && (
              <View
                style={{
                  width: 14,
                  height: 14,

                  borderRadius: 50,
                  backgroundColor: '#00aeef',
                }}
              />
            )}
          </View>
        </Pressable>
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
        <Text style={styles.titulo}>Desafio mirar izquierda</Text>
        <TextInput
          keyboardType="numbers-and-punctuation"
          value={textoMirarIzq}
          style={styles.textInputTextos}
          onChangeText={setTextoMirarIzq}
        />
        <Text style={styles.titulo}>Desafio mirar derecha</Text>
        <TextInput
          keyboardType="numbers-and-punctuation"
          value={textoMirarDer}
          style={styles.textInputTextos}
          onChangeText={setTextoMirarDer}
        />
        <Text style={styles.titulo}>Desafio mirar frente</Text>
        <TextInput
          keyboardType="numbers-and-punctuation"
          value={textoMirarFrente}
          style={styles.textInputTextos}
          onChangeText={setTextoMirarFrente}
        />
        <Text style={styles.titulo}>Alejar cara</Text>
        <TextInput
          keyboardType="numbers-and-punctuation"
          value={textoAlejarse}
          style={styles.textInputTextos}
          onChangeText={setTextoAlejarse}
        />
        <Text style={styles.titulo}>Acercar cara</Text>
        <TextInput
          keyboardType="numbers-and-punctuation"
          value={textoAcercarse}
          style={styles.textInputTextos}
          onChangeText={setTextoAcercarse}
        />
        <Text style={styles.titulo}>Centrar cara</Text>
        <TextInput
          keyboardType="numbers-and-punctuation"
          value={textoCentrarse}
          style={styles.textInputTextos}
          onChangeText={setTextoCentrarse}
        />
        <Text style={styles.titulo}>Realizar desafio</Text>
        <TextInput
          keyboardType="numbers-and-punctuation"
          value={textoRealizarDesafio}
          style={styles.textInputTextos}
          onChangeText={setTextoRealizarDesafio}
        />
        <Text style={styles.titulo}>Dentro del rango permitido</Text>
        <TextInput
          keyboardType="numbers-and-punctuation"
          value={textoDentroDelRango}
          style={styles.textInputTextos}
          onChangeText={setTextoDentroDelRango}
        />
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
  {enum: 'Mirar Frente', title: 'Frente'},
  {enum: 'Mirar Izquierda', title: 'Izquierda'},
  {enum: 'Mirar Derecha', title: 'Derecha'},
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
  textInputTextos: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    color: 'black',
    fontSize: 20,
    paddingLeft: 15,
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
    alignItems: 'center',
  },
});
