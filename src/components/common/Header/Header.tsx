import React, {memo, useCallback} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import hexToRgba from 'hex-to-rgba';

// Fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/pro-solid-svg-icons';

// Global utils
import {useNavigation} from '@utils/navigation.ts';

// Global components
import Text from '@components/core/Text';
import Box from '@components/core/Box';
import colors from '@styles/colors.ts';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScale(64),
    paddingHorizontal: moderateScale(16),
  },
  label: {
    flex: 1,
    textAlign: 'center',
  },
  sidedContainer: {
    width: moderateScale(32),
  },
  circleButton: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(16),
    backgroundColor: hexToRgba(colors.textDarkPrimary, 0.08),
  },
});

export type HeaderProps = {
  label?: string;
  showBackButton?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  showBackButton = true,
  ...restProps
}) => {
  const navigation = useNavigation();
  // Event handler methods
  const onPressBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, []);
  // Render
  return (
    <Box style={styles.container} backgroundColor="transparent">
      <Box style={styles.sidedContainer}>
        {showBackButton && (
          <TouchableWithoutFeedback onPress={onPressBack}>
            <Box style={styles.circleButton}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                size={moderateScale(16)}
                color={colors.textDarkPrimary}
              />
            </Box>
          </TouchableWithoutFeedback>
        )}
      </Box>
      <Text typography="heading_h4_16" style={styles.label}>
        {restProps.label}
      </Text>
      <Box style={styles.sidedContainer} />
    </Box>
  );
};

export default memo(Header);
