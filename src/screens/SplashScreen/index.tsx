import {useEffect} from 'react';
import {Platform, StatusBar} from 'react-native';

// Global utils
import {useNavigation} from '@utils/navigation.ts';

if (Platform.OS === 'android') {
  StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');
  StatusBar.setBackgroundColor('transparent');
}

const SplashScreen = () => {
  const navigation = useNavigation();
  // Methods
  const resetToInitialScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'AuthEmail'}],
    });
  };
  // Hooks
  useEffect(() => resetToInitialScreen(), []);
  // Render
  return null;
};

export default SplashScreen;
