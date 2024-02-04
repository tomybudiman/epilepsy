import {moderateScale} from 'react-native-size-matters';
import {EdgeInsets} from 'react-native-safe-area-context';

export const getBottomSafeAreaDistance = (
  insets: EdgeInsets,
  totalMarginBottom: number,
): number => {
  const safeAreaBottomDesign = moderateScale(24);
  return moderateScale(
    (insets.bottom > safeAreaBottomDesign
      ? totalMarginBottom - insets.bottom
      : totalMarginBottom - safeAreaBottomDesign) + insets.bottom,
  );
};
