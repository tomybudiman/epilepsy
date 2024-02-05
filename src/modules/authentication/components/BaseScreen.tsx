import React, {memo, useMemo, forwardRef, useImperativeHandle} from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Merge,
  useForm,
  Controller,
  FieldError,
  FieldValue,
  FieldValues,
  UseFormSetError,
  FieldErrorsImpl,
} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';

// Global components
import Box from '@components/core/Box';
import Text from '@components/core/Text';
import Button from '@components/core/Button';

// Global utils
import {useKeyboardAvoidingView} from '@utils/hooks/useKeyboardAvoidingView.ts';

const styles = StyleSheet.create({
  fullFlex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: moderateScale(24),
    paddingHorizontal: moderateScale(16),
  },
  headerText: {
    marginBottom: moderateScale(20),
  },
  footerContainer: {
    paddingHorizontal: moderateScale(16),
  },
});

export type AuthBaseScreenProps = {
  name: string;
  headerLabel: string;
  subHeaderLabel: string;
  mainButtonLabel: string;
  onSubmit: FieldValue<any>;
  validate: (value: string) => any;
  renderInput: (param1: {
    value: string;
    onBlur: () => void;
    onFocus: () => void;
    onChange: () => void;
    error:
      | string
      | FieldError
      | Merge<FieldError, FieldErrorsImpl<any>>
      | undefined;
  }) => React.ReactElement;
};
export type AuthBaseScreenRef = {
  setFieldError: UseFormSetError<FieldValues>;
};

const BaseScreen = forwardRef<AuthBaseScreenRef, AuthBaseScreenProps>(
  (props, ref) => {
    const [keyboardAvoidingValue, toggleFocus] = useKeyboardAvoidingView();
    const {
      control,
      setError,
      formState: {errors},
      handleSubmit,
    } = useForm();
    // Event handler methods
    const onSubmit = () => {
      Keyboard.dismiss();
      handleSubmit(props.onSubmit)();
    };
    // Getter Constants
    const getFooterContainerStyle = useMemo(() => {
      return [
        styles.footerContainer,
        {
          paddingBottom: keyboardAvoidingValue,
        },
      ];
    }, [keyboardAvoidingValue]);
    // Hooks
    useImperativeHandle(
      ref,
      () => {
        return {setFieldError: setError};
      },
      [],
    );
    // Render
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.fullFlex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Box backgroundColor="primary_100" style={styles.container}>
            <SafeAreaView
              style={styles.fullFlex}
              edges={['left', 'top', 'right']}>
              <Text
                color="textDarkPrimary"
                style={styles.headerText}
                typography="heading_h1_24">
                {props.headerLabel}
              </Text>
              <Text
                color="textDarkSecondary"
                style={styles.headerText}
                typography="body_text_regular">
                {props.subHeaderLabel}
              </Text>
              <Controller
                name={props.name}
                control={control}
                rules={{validate: props.validate}}
                render={({field: {onChange, onBlur, value}}) => {
                  const onBlurWrapper = () => {
                    toggleFocus('inactive');
                    onBlur();
                  };
                  return props.renderInput({
                    value,
                    onChange,
                    onBlur: onBlurWrapper,
                    error: errors[props.name],
                    onFocus: () => toggleFocus('active'),
                  });
                }}
              />
            </SafeAreaView>
          </Box>
          <Box
            isAnimated={true}
            backgroundColor="primary_100"
            style={getFooterContainerStyle}>
            <Button size="large" onPress={onSubmit}>
              {props.mainButtonLabel}
            </Button>
          </Box>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  },
);

export default memo(BaseScreen);
