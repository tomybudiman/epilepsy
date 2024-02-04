import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';

// Global components
import Text from '@components/Text';

// Common
import {useTranslation} from '@localization';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingTop: moderateScale(24),
    paddingHorizontal: moderateScale(16),
  },
  headerText: {
    marginBottom: moderateScale(20),
  },
});

const BaseScreen = () => {
  const {t} = useTranslation('modules.authentication.components.baseScreen');
  // Render
  return (
    <SafeAreaView style={styles.safeAreaView} edges={['left', 'top', 'right']}>
      <Text
        color="textDarkPrimary"
        style={styles.headerText}
        typography="heading_h1_24">
        {t('header')}
      </Text>
      <Text color="textDarkSecondary" typography="body_text_regular">
        {t('subHeader')}
      </Text>
    </SafeAreaView>
  );
};

export default BaseScreen;
