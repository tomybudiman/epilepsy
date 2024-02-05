import React, {useMemo, memo} from 'react';
import {
  Button as ButtonNative,
  MD3LightTheme as DefaultTheme,
  ButtonProps as ButtonPropsNative,
} from 'react-native-paper';
import {Animated, StyleProp, ViewStyle} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import hexToRgba from 'hex-to-rgba';

// Global utils
import {mergeStyleProps} from '@utils/styles/mergeStyleProps';

// Styles
import typographies from '@styles/typographies.ts';
import colors from '@styles/colors.ts';

export type ButtonProps = ButtonPropsNative & {
  size?: 'small' | 'medium' | 'large';
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
};

const ButtonCustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    onSurfaceDisabled: colors.primary_700,
    surfaceDisabled: hexToRgba(colors.primary_700, 0.2),
  },
};

const Button: React.FC<ButtonProps> = ({
  style,
  children,
  size = 'medium',
  mode = 'contained',
  ...restProps
}) => {
  const getButtonSizingStyle = useMemo(() => {
    switch (size) {
      case 'large':
        return {
          height: moderateScale(48),
          borderRadius: moderateScale(24),
          typography: typographies.heading_h4_16,
        };
      case 'small':
        return {
          height: moderateScale(32),
          borderRadius: moderateScale(16),
          typography: typographies.body_subtext_bold,
        };
      case 'medium':
      default:
        return {
          height: moderateScale(40),
          borderRadius: moderateScale(20),
          typography: typographies.heading_h5_14,
        };
    }
  }, [size]);
  const getButtonColors: {buttonColor: string; textColor: string} =
    useMemo(() => {
      switch (mode) {
        case 'contained':
        default:
          return {
            buttonColor: colors.primary_800,
            textColor: colors.textLightPrimary,
          };
      }
    }, [mode]);
  const getButtonStyle = useMemo(() => {
    const {height, borderRadius} = getButtonSizingStyle;
    return mergeStyleProps({height, borderRadius}, style);
  }, [getButtonSizingStyle, style]);
  // Render
  return (
    <ButtonNative
      mode={mode}
      style={getButtonStyle}
      theme={ButtonCustomTheme}
      textColor={getButtonColors.textColor}
      buttonColor={getButtonColors.buttonColor}
      labelStyle={getButtonSizingStyle.typography}
      {...restProps}>
      {children}
    </ButtonNative>
  );
};

export default memo(Button);
