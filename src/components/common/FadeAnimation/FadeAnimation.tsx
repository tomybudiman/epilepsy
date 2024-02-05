import React, {memo, useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';

export type FadeAnimationProps = {
  duration?: number;
  isVisible?: boolean;
  children: React.ReactElement;
};

const FadeAnimation: React.FC<FadeAnimationProps> = ({
  children,
  isVisible = true,
  duration = 250,
}) => {
  const [localVisibleState, setLocalVisibleState] = useState(isVisible);
  const animatedFade = useRef(new Animated.Value(isVisible ? 1 : 0)).current;
  // Hooks
  useEffect(() => {
    if (isVisible) {
      setLocalVisibleState(true);
      Animated.timing(animatedFade, {
        duration,
        toValue: 1,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (!finished) {
          animatedFade.setValue(1);
        }
      });
    } else {
      Animated.timing(animatedFade, {
        duration,
        toValue: 0,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (!finished) {
          animatedFade.setValue(0);
        }
        setLocalVisibleState(false);
      });
    }
  }, [isVisible]);
  // Render
  return localVisibleState ? (
    <Animated.View style={{opacity: animatedFade}}>{children}</Animated.View>
  ) : null;
};

export default memo(FadeAnimation);
