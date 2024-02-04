import React from 'react';
import {StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';

// Global components
import Box from '@components/Box';
import Text from '@components/Text';
import TextInput from '@components/TextInput';

// Common
import {useTranslation} from '@localization';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: moderateScale(24),
    paddingHorizontal: moderateScale(16),
  },
  safeAreaView: {
    flex: 1,
  },
  headerText: {
    marginBottom: moderateScale(20),
  },
});

const BaseScreen = () => {
  const {t} = useTranslation('modules.authentication.components.baseScreen');
  // Render
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box backgroundColor="primary_100" style={styles.container}>
        <SafeAreaView
          style={styles.safeAreaView}
          edges={['left', 'top', 'right']}>
          <Text
            color="textDarkPrimary"
            style={styles.headerText}
            typography="heading_h1_24">
            {t('header')}
          </Text>
          <Text
            color="textDarkSecondary"
            style={styles.headerText}
            typography="body_text_regular">
            {t('subHeader')}
          </Text>
          <TextInput label="Email" />
        </SafeAreaView>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default BaseScreen;
