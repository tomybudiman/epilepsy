import React, {memo} from 'react';
import {
  TextInput as TextInputNative,
  TextInputProps as TextInputPropsNative,
} from 'react-native-paper';

// Styles
import colors from '@styles/colors.ts';

export type TextInputProps = TextInputPropsNative & {};

const TextInput: React.FC<TextInputProps> = props => {
  const theme = {
    colors: {primary: colors.primary_700, error: colors.error_700},
  };
  // Render
  return <TextInputNative theme={theme} mode="outlined" {...props} />;
};

export default memo(TextInput);
