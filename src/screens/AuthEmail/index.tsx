import React, {useRef, useCallback} from 'react';
import {FieldValue} from 'react-hook-form';
import {isEmpty} from 'lodash';

// Global components
import TextInput from '@components/core/TextInput';

// Global utils
import {validateEmailFormat} from '@utils/validation.ts';

import {checkEmailAddress} from '@requests/auth.ts';

// Modules
import BaseScreen, {
  type AuthBaseScreenRef,
} from '@modules/authentication/components/BaseScreen';

// Common
import {useTranslation} from '@localization';

const AuthEmail = () => {
  const {t} = useTranslation('modules.authentication.components.baseScreen');
  const {t: tValidation} = useTranslation('validation.email');
  const baseScreenRef = useRef<AuthBaseScreenRef>(null);
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
      await checkEmailAddress({email: data.email});
    } catch (e) {}
  };
  // Render
  return (
    <BaseScreen
      name="email"
      onSubmit={onSubmit}
      ref={baseScreenRef}
      validate={validateField}
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
