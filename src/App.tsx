import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';

// Redux
import store from '@store/index';

// Global utils
import {navigationRef} from '@utils/navigation.ts';

// Screens
import * as Screens from './screens';

const Stack = createNativeStackNavigator();

const App = () => {
  // Render
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PaperProvider>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
              initialRouteName="SplashScreen"
              screenOptions={{headerShown: false}}>
              {Object.entries(Screens).map(([name, component]) => (
                <Stack.Screen key={name} name={name} component={component} />
              ))}
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
