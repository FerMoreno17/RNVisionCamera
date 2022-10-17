import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import PreviewScreen from './PreviewScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PreviewScreen" component={PreviewScreen} initialParams={{ imagePath: undefined }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;
