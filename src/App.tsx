import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import {DrawerContent} from './components/DrawerContet';
import {Provider} from 'react-redux';
import {persistor, rootReducer} from './redux/reducer/rootReducer';
import ConfiguracionScreen from './ConfiguracionScreen';
import PreviewScreen from './PreviewScreen';
import HomeScreen from './HomeScreen';
import {PersistGate} from 'redux-persist/integration/react';
import ValidacionExitosaScreen from './ValidacionExitosaScreen';
import ConsejosFeVidaScreen from './ConsejosFeVidaScreen';
import {Menu} from './components/Menu';
import {Back} from './components/Back';
import {ModalSalir} from './components/ModalSalir';
import QrScreen from './screens/qr/QrScreen';
import ConsejosQRScreen from './screens/qr/ConsejosQRScreen';
import ValidacionExitosaQrScreen from './screens/qr/ValidacionExitosaQrScreen';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={rootReducer}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{
              drawerPosition: 'right',
              headerStyle: {
                backgroundColor: '#002855',
              },
              headerTintColor: '#fff',
              headerRight: () => <Menu />,
              headerLeft: () => <Back />,
            }}
            drawerContent={() => <DrawerContent />}>
            <Drawer.Screen
              options={{
                headerTitle: 'Cámara',
                headerTitleAlign: 'center',
                headerLeft: () => <></>,
              }}
              name="ConsejosFeVidaScreen"
              component={ConsejosFeVidaScreen}
            />
            <Drawer.Screen
              options={{
                headerTitle: 'Cámara',
                headerTitleAlign: 'center',
                headerLeft: () => <></>,
              }}
              name="ConsejosQRScreen"
              component={ConsejosQRScreen}
            />
            <Drawer.Screen
              options={{headerTitle: 'Cámara', headerTitleAlign: 'center'}}
              name="HomeScreen"
              component={HomeScreen}
            />
            <Drawer.Screen
              options={{
                headerTitle: 'Configuración',
                headerTitleAlign: 'center',
                headerLeft: () => <Back consejos={true} />,
              }}
              name="ConfiguracionScreen"
              component={ConfiguracionScreen}
            />
            <Drawer.Screen
              options={{headerTitle: 'Cámara', headerTitleAlign: 'center'}}
              name="PreviewScreen"
              component={PreviewScreen}
            />
            <Drawer.Screen
              options={{
                headerTitle: 'Cámara',
                headerTitleAlign: 'center',
                headerLeft: () => <></>,
              }}
              name="ValidacionExitosaScreen"
              component={ValidacionExitosaScreen}
            />
            <Drawer.Screen
              options={{
                headerTitle: 'Cámara',
                headerTitleAlign: 'center',
                headerLeft: () => <></>,
              }}
              name="ValidacionExitosaQrScreen"
              component={ValidacionExitosaQrScreen}
            />
            <Drawer.Screen
              options={{headerTitle: 'Qr', headerTitleAlign: 'center'}}
              name="QrScreen"
              component={QrScreen}
            />
          </Drawer.Navigator>
          <ModalSalir />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
