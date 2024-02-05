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
import Header from '@components/common/Header';

// Global utils
import {useKeyboardAvoidingView} from '@utils/hooks/useKeyboardAvoidingView';

const styles = StyleSheet.create({
  fullFlex: {
    flex: 1,
  },
  headerText: {
    marginBottom: moderateScale(20),
  },
  horizontalSafePadding: {
    paddingHorizontal: moderateScale(16),
  },
});

export type AuthBaseScreenrestProps = {
  name: string;
  loading?: boolean;
  headerLabel: string;
  subHeaderLabel: string;
  mainButtonLabel: string;
  headerTitleLabel?: string;
  showHeaderBackButton?: boolean;
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

const BaseScreen = forwardRef<AuthBaseScreenRef, AuthBaseScreenrestProps>(
  ({showHeaderBackButton = false, ...restProps}, ref) => {
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
      handleSubmit(restProps.onSubmit)();
    };
    const setFieldError = (errorMessage: string) => {
      clearErrors(restProps.name);
      setError(restProps.name, {
        type: 'custom',
        message: errorMessage,
      });
    };
    // Getter Constants
    const getFooterContainerStyle = useMemo(() => {
      return [
        styles.horizontalSafePadding,
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
          <Box backgroundColor="primary_100" style={styles.fullFlex}>
            <SafeAreaView
              style={styles.fullFlex}
              edges={['left', 'top', 'right']}>
              <Header
                label={restProps.headerTitleLabel}
                showBackButton={showHeaderBackButton}
              />
              <Box
                backgroundColor="primary_100"
                style={[styles.fullFlex, styles.horizontalSafePadding]}>
                <Text
                  color="textDarkPrimary"
                  style={styles.headerText}
                  typography="heading_h1_24">
                  {restProps.headerLabel}
                </Text>
                <Text
                  color="textDarkSecondary"
                  style={styles.headerText}
                  typography="body_text_regular">
                  {restProps.subHeaderLabel}
                </Text>
                <Controller
                  name={restProps.name}
                  control={control}
                  rules={{validate: restProps.validate}}
                  render={({field: {onChange, onBlur, value}}) => {
                    const onBlurWrapper = () => {
                      toggleFocus('inactive');
                      onBlur();
                    };
                    return restProps.renderInput({
                      value,
                      onChange,
                      onBlur: onBlurWrapper,
                      error: errors[restProps.name],
                      onFocus: () => toggleFocus('active'),
                    });
                  }}
                />
              </Box>
            </SafeAreaView>
          </Box>
          <Box
            isAnimated={true}
            backgroundColor="primary_100"
            style={getFooterContainerStyle}>
            <Button
              size="large"
              onPress={onSubmit}
              loading={restProps.loading}
              disabled={restProps.loading}>
              {restProps.mainButtonLabel}
            </Button>
          </Box>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  },
);

export default memo(BaseScreen);
