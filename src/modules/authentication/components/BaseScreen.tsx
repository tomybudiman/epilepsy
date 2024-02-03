import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

const BaseScreen = () => {
  // Render
  return (
    <SafeAreaView
      style={styles.safeAreaView}
      edges={['left', 'top', 'right']}
    />
  );
};

export default BaseScreen;
