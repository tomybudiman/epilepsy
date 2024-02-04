import type {
  Animated,
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import {isArray, isEmpty} from 'lodash';

export type MergedStyle = ViewStyle | TextStyle | ImageStyle;
export type AnimatedStyle = Animated.AnimatedProps<MergedStyle>;
export type MergedAnimatedStyle = MergedStyle | AnimatedStyle;
export type CustomPropStyle =
  | StyleProp<MergedAnimatedStyle>
  | StyleProp<MergedAnimatedStyle>[];

const convertStyleToArray = <T extends MergedStyle>(
  style: CustomPropStyle,
): Array<any | T> => {
  return isEmpty(style) ? [] : isArray(style) ? style : [style];
};

export const mergeStyleProps = <T extends MergedStyle>(
  baseStyle: CustomPropStyle,
  propStyle?: CustomPropStyle,
): StyleProp<T> => {
  const baseStyleArray = convertStyleToArray(baseStyle);
  const propStyleArray = convertStyleToArray(propStyle);
  return [...baseStyleArray, ...propStyleArray];
};
