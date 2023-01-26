import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import 'react-native-gesture-handler';
import {DrawerContent} from './components/DrawerContet';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './redux/reducer/rootReducer';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={createStore(rootReducer)}>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="HomeScreen" component={HomeScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
