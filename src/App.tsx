import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import 'react-native-gesture-handler';
import {DrawerContent} from './components/DrawerContet';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './redux/reducer/rootReducer';
import ConfiguracionScreen from './ConfiguracionScreen';
import PreviewScreen from './PreviewScreen';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={createStore(rootReducer)}>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={() => <DrawerContent />}>
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
    </Provider>
  );
};

export default App;
