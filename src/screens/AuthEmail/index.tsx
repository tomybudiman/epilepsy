import React, {useRef, useCallback, useState} from 'react';
import {FieldValue} from 'react-hook-form';
import {isEmpty, get} from 'lodash';

// Global components
import TextInput from '@components/core/TextInput';

// Global utils
import {validateEmailFormat} from '@utils/validation.ts';
import {useNavigation} from '@utils/navigation.ts';

// Requests
import {checkEmailAddress} from '@requests/auth.ts';

// Modules
import BaseScreen, {
  type AuthBaseScreenRef,
} from '@modules/authentication/components/BaseScreen';

// Common
import {useTranslation} from '@localization';

const AuthEmail = () => {
  const navigation = useNavigation();
  const {t} = useTranslation('modules.authentication.components.baseScreen');
  const {t: tValidation} = useTranslation('validation.email');
  const baseScreenRef = useRef<AuthBaseScreenRef>(null);
  const [checkEmailLoading, setCheckEmailLoading] = useState<boolean>(false);
  const fieldName: string = 'email';
  // Methods
  const validateField = useCallback((value: string) => {
    if (isEmpty(value)) {
      return tValidation('errorEmailEmpty');
    } else if (!validateEmailFormat(value)) {
      return tValidation('errorEmailFormat');
    }
    return true;
  }, []);
  // Event handler methods
  const onSubmit = async (data: FieldValue<any>) => {
    try {
      setCheckEmailLoading(true);
      const response = await checkEmailAddress({email: data[fieldName]});
      const isEmailFound = get(response, 'data.isEmailFound');
      navigation.navigate(isEmailFound ? 'AuthSignIn' : 'AuthSignUp');
    } catch (e) {
      const errorCode = get(e, 'response.status');
      baseScreenRef.current &&
        baseScreenRef.current.setFieldError(`${errorCode} - Server Error`);
    } finally {
      setCheckEmailLoading(false);
    }
  };
  // Render
  return (
    <BaseScreen
      name={fieldName}
      onSubmit={onSubmit}
      ref={baseScreenRef}
      validate={validateField}
      loading={checkEmailLoading}
      headerLabel={t('header')}
      subHeaderLabel={t('subHeader')}
      mainButtonLabel={t('continue')}
      renderInput={({value, onBlur, onFocus, onChange, error}) => (
        <TextInput
          error={error}
          label="Email"
          value={value}
          onBlur={onBlur}
          inputMode="email"
          onFocus={onFocus}
          autoComplete="email"
          autoCapitalize="none"
          onChangeText={onChange}
          keyboardType="email-address"
          textContentType="emailAddress"
        />
      )}
    />
  );
};

export default AuthEmail;
