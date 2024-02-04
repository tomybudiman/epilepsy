import React, {memo, useMemo} from 'react';
import {View, ViewStyle, ViewProps, StyleProp} from 'react-native';

// Global utils
import {mergeStyleProps} from '@utils/styles/mergeStyleProps.ts';

// Styles
import colors from '@styles/colors.ts';

export type BoxProps = ViewProps & {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: keyof typeof colors;
};

const Box: React.FC<BoxProps> = ({
  style,
  children,
  backgroundColor = 'neutral_0',
  ...restProps
}) => {
  const getContainerStyle = useMemo(() => {
    const baseStyle = {
      backgroundColor: colors[backgroundColor],
    };
    return mergeStyleProps(baseStyle, style);
  }, [backgroundColor, style]);
  // Render
  return (
    <View style={getContainerStyle} {...restProps}>
      {children}
    </View>
  );
};

export default memo(Box);
