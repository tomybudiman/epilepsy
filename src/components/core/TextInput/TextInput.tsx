import React, {memo, useMemo, useState, useEffect, useCallback} from 'react';
import {
  TextInput as TextInputNative,
  MD3LightTheme as DefaultTheme,
  TextInputProps as TextInputPropsNative,
} from 'react-native-paper';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isEmpty, get} from 'lodash';

// Fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEye,
  faCircleXmark,
  faEyeLowVision,
  IconDefinition,
} from '@fortawesome/pro-solid-svg-icons';

// Global components
import FadeAnimation from '@components/common/FadeAnimation';
import Text from '@components/core/Text';
import Box from '@components/core/Box';

// Global utils
import {ErrorFormField} from '@utils/types/form.ts';

// Styles
import typographies from '@styles/typographies.ts';
import colors from '@styles/colors.ts';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    position: 'relative',
  },
  textInput: {
    height: moderateScale(48),
    ...typographies.body_text_medium,
  },
  contextActionButton: {
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    right: moderateScale(16),
    width: moderateScale(20),
    height: moderateScale(20),
    bottom: moderateScale(14.5),
  },
  errorMessage: {
    marginTop: moderateScale(4),
    marginLeft: moderateScale(8),
  },
});

const TextInputTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    error: colors.error_700,
  },
};

export type TextInputProps = Omit<TextInputPropsNative, 'error'> & {
  error?: ErrorFormField;
  onChangeText?: (param1: string) => void;
};

const TextInput: React.FC<TextInputProps> = ({
  error,
  value,
  style,
  onChangeText,
  secureTextEntry = false,
  ...restProps
}) => {
  const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(
    !secureTextEntry,
  );
  const [textInputValue, setTextInputValue] = useState<string>('');
  // Event handler methods
  const onChangeTextInput = useCallback((textValue: string) => {
    setTextInputValue(textValue);
    onChangeText && onChangeText(textValue);
  }, []);
  const onPressContextActionButton = useCallback(() => {
    if (secureTextEntry) {
      setPasswordVisibility(!isPasswordVisible);
    } else {
      onChangeTextInput('');
    }
  }, [secureTextEntry, isPasswordVisible]);
  // Getter constants
  const getContextActionIcon = useMemo<IconDefinition>(() => {
    if (secureTextEntry) {
      return isPasswordVisible ? faEyeLowVision : faEye;
    }
    return faCircleXmark;
  }, [secureTextEntry, isPasswordVisible]);
  const getSecureTextEntryState: boolean = secureTextEntry
    ? !isPasswordVisible
    : false;
  const isErrorExist: boolean = !isEmpty(error);
  // Hooks
  useEffect(() => {
    if (value) {
      setTextInputValue(value);
    }
  }, [value]);
  // Render
  return (
    <>
      <Box style={styles.container}>
        <TextInputNative
          mode="outlined"
          error={isErrorExist}
          value={textInputValue}
          theme={TextInputTheme}
          style={styles.textInput}
          onChangeText={onChangeTextInput}
          outlineColor={colors.primary_300}
          activeOutlineColor={colors.primary_700}
          secureTextEntry={getSecureTextEntryState}
          outlineStyle={{borderRadius: moderateScale(8)}}
          {...restProps}
        />
        <FadeAnimation duration={100} isVisible={!isEmpty(textInputValue)}>
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.contextActionButton}
            onPress={onPressContextActionButton}>
            <FontAwesomeIcon
              icon={getContextActionIcon}
              color={colors.secondary_800}
              size={moderateScale(18)}
            />
          </TouchableOpacity>
        </FadeAnimation>
      </Box>
      <FadeAnimation isVisible={isErrorExist}>
        <Text
          color="error_700"
          style={styles.errorMessage}
          typography="body_subtext_regular">
          {get(error, 'message')}
        </Text>
      </FadeAnimation>
    </>
  );
};

export default memo(TextInput);
