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

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={rootReducer}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#002855',
              },
              headerTintColor: '#fff',
            }}
            drawerContent={() => <DrawerContent />}>
            <Drawer.Screen
              options={{headerTitle: 'Camara'}}
              name="HomeScreen"
              component={HomeScreen}
            />
            <Drawer.Screen
              options={{headerTitle: 'Configuración'}}
              name="ConfiguracionScreen"
              component={ConfiguracionScreen}
            />
            <Drawer.Screen
              options={{headerTitle: 'Vista previa'}}
              name="PreviewScreen"
              component={PreviewScreen}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
