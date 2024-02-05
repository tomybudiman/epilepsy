import React, {memo, useMemo} from 'react';
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  Text as TextNative,
} from 'react-native';

// Global utils
import {mergeStyleProps} from '@utils/styles/mergeStyleProps.ts';

// Styles
import typographies from '@styles/typographies.ts';
import colors from '@styles/colors.ts';

const styles = StyleSheet.create({
  text: {},
});

export type TextProps = {
  children?: React.ReactNode;
  color?: keyof typeof colors;
  style?: StyleProp<ViewStyle>;
  typography?: keyof typeof typographies;
};

const Text: React.FC<TextProps> = ({
  style,
  children,
  color = 'textDarkPrimary',
  typography = 'body_text_regular',
  ...restProps
}) => {
  const getTextStyle = useMemo(() => {
    const baseStyle = [typographies[typography], {color: colors[color]}, style];
    return mergeStyleProps(styles.text, baseStyle);
  }, [typography, color, style]);
  // Render
  return (
    <TextNative style={getTextStyle} {...restProps}>
      {children}
    </TextNative>
  );
};

Text.defaultProps = {
  color: 'textDarkPrimary',
};

export default memo(Text);
