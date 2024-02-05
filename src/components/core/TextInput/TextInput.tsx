import React, {memo} from 'react';
import {
  TextInput as TextInputNative,
  MD3LightTheme as DefaultTheme,
  TextInputProps as TextInputPropsNative,
} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';
import {isEmpty, get} from 'lodash';

// Global components
import Text from '@components/core/Text';
import FadeAnimation from '@components/common/FadeAnimation';

// Global utils
import {ErrorFormField} from '@utils/types/form.ts';

// Styles
import typographies from '@styles/typographies.ts';
import colors from '@styles/colors.ts';

const styles = StyleSheet.create({
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
};

const TextInput: React.FC<TextInputProps> = ({error, ...restProps}) => {
  const isErrorExist = !isEmpty(error);
  // Render
  return (
    <>
      <TextInputNative
        mode="outlined"
        error={isErrorExist}
        theme={TextInputTheme}
        outlineColor={colors.primary_300}
        activeOutlineColor={colors.primary_700}
        outlineStyle={{borderRadius: moderateScale(8)}}
        style={{...typographies.body_text_medium, height: moderateScale(48)}}
        {...restProps}
      />
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
