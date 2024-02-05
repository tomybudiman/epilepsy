import {useCallback} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import {Animated} from 'react-native';
import {get} from 'lodash';

// Global utils
import {getBottomSafeAreaDistance} from '@utils/styles/getBottomSafeAreaDistance.ts';

type KeyboardAvoidingViewHook = {
  transitionDuration?: number;
  keyboardInactiveValue?: number;
  keyboardActiveValue?: number;
};
type ToggleFocusBlurParam = 'active' | 'inactive';
export const useKeyboardAvoidingView = (
  params: KeyboardAvoidingViewHook = {},
): [Animated.Value, (param1: ToggleFocusBlurParam) => void] => {
  const insets = useSafeAreaInsets();
  const transitionDuration = get(params, 'transitionDuration', 250);
  const keyboardActiveValue = get(
    params,
    'keyboardActiveValue',
    moderateScale(16),
  );
  const keyboardInactiveValue = get(
    params,
    'keyboardInactiveValue',
    getBottomSafeAreaDistance(insets, 40),
  );
  const keyboardAvoidingValue = new Animated.Value(keyboardInactiveValue);
  let forceAnimationTimeout: NodeJS.Timeout;
  const onFocusBlurToggle = useCallback(
    (state: ToggleFocusBlurParam = 'active') => {
      clearTimeout(forceAnimationTimeout);
      Animated.timing(keyboardAvoidingValue, {
        toValue:
          state === 'active' ? keyboardActiveValue : keyboardInactiveValue,
        duration: transitionDuration,
        useNativeDriver: false,
      }).start();
      forceAnimationTimeout = setTimeout(() => {
        keyboardAvoidingValue.setValue(
          state === 'active' ? keyboardActiveValue : keyboardInactiveValue,
        );
      }, transitionDuration + 8);
    },
    [
      keyboardAvoidingValue,
      keyboardInactiveValue,
      keyboardActiveValue,
      transitionDuration,
    ],
  );
  return [keyboardAvoidingValue, onFocusBlurToggle];
};
