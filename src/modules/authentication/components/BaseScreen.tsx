import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, StyleSheet} from 'react-native';

// Common
import {useTranslation} from '@localization';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

const BaseScreen = () => {
  const {t} = useTranslation('modules.authentication.components.baseScreen');
  // Render
  return (
    <SafeAreaView style={styles.safeAreaView} edges={['left', 'top', 'right']}>
      <Text>{t('header')}</Text>
    </SafeAreaView>
  );
};

export default BaseScreen;
