import React, {memo, useMemo} from 'react';
import {View, Animated, ViewStyle, ViewProps, StyleProp} from 'react-native';

// Global utils
import {mergeStyleProps} from '@utils/styles/mergeStyleProps.ts';

// Styles
import colors from '@styles/colors.ts';

export type BoxProps = ViewProps & {
  isAnimated?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: keyof typeof colors;
};

const Box: React.FC<BoxProps> = ({
  style,
  children,
  isAnimated = false,
  backgroundColor = 'neutral_0',
  ...restProps
}) => {
  const BoxContainer = isAnimated ? Animated.View : View;
  const getContainerStyle = useMemo(() => {
    const baseStyle = {
      backgroundColor: colors[backgroundColor],
    };
    return mergeStyleProps(baseStyle, style);
  }, [backgroundColor, style]);
  // Render
  return (
    <BoxContainer style={getContainerStyle} {...restProps}>
      {children}
    </BoxContainer>
  );
};

export default memo(Box);
