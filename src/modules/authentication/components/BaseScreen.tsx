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
  FieldErrorsImpl,
} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';

// Global components
import Box from '@components/core/Box';
import Text from '@components/core/Text';
import Button from '@components/core/Button';

// Global utils
import {useKeyboardAvoidingView} from '@utils/hooks/useKeyboardAvoidingView';

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
  loading?: boolean;
  headerLabel: string;
  subHeaderLabel: string;
  mainButtonLabel: string;
  onSubmit: (param1: FieldValue<any>) => void;
  validate: (value: string) => boolean | string;
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
  setFieldError: (errorMessage: string) => void;
};

const BaseScreen = forwardRef<AuthBaseScreenRef, AuthBaseScreenProps>(
  (props, ref) => {
    const [keyboardAvoidingValue, toggleFocus] = useKeyboardAvoidingView();
    const {
      control,
      setError,
      clearErrors,
      formState: {errors},
      handleSubmit,
    } = useForm();
    // Event handler methods
    const onSubmit = () => {
      Keyboard.dismiss();
      handleSubmit(props.onSubmit)();
    };
    const setFieldError = (errorMessage: string) => {
      clearErrors(props.name);
      setError(props.name, {
        type: 'custom',
        message: errorMessage,
      });
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
    useImperativeHandle(ref, () => ({setFieldError}), []);
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
            <Button
              size="large"
              onPress={onSubmit}
              loading={props.loading}
              disabled={props.loading}>
              {props.mainButtonLabel}
            </Button>
          </Box>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  },
);

export default memo(BaseScreen);
