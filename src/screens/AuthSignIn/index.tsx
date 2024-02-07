import React, {useCallback, useRef, useState, useMemo} from 'react';
import reactStringReplace from 'react-string-replace';
import {useTranslation} from '@localization';
import {FieldValue} from 'react-hook-form';
import {get, isEmpty} from 'lodash';

// Global components
import TextInput from '@components/core/TextInput';
import Text from '@components/core/Text';

// Global utils
import {type RootStackParamList} from '@utils/types/navigation.ts';
import {useRoute} from '@utils/navigation.ts';

// Requests
import {signInUser} from '@requests/auth.ts';

// Modules
import BaseScreen, {
  type AuthBaseScreenRef,
} from '@modules/authentication/components/BaseScreen';

const AuthSignIn = () => {
  const route = useRoute() as {params: RootStackParamList['AuthSignIn']};
  const {t} = useTranslation('screens.authSignIn');
  const {t: tValidation} = useTranslation('validation.password');
  const baseScreenRef = useRef<AuthBaseScreenRef>(null);
  const [signInLoading, setSignInLoading] = useState<boolean>(false);
  const fieldName: string = 'password';
  // Methods
  const validateField = useCallback((value: string) => {
    if (isEmpty(value)) {
      return tValidation('errorPasswordEmpty');
    }
    return true;
  }, []);
  // Event handler methods
  const onSubmit = async (data: FieldValue<any>) => {
    try {
      setSignInLoading(true);
      const response = await signInUser({
        email: route.params.email,
        password: data.password,
      });
      console.log(response.data.token);
    } catch (e) {
      const errorCode = get(e, 'response.status');
      baseScreenRef.current &&
        baseScreenRef.current.setFieldError(`${errorCode} - Server Error`);
    } finally {
      setSignInLoading(false);
    }
  };
  // Render
  const SubHeaderLabel = useMemo(
    () =>
      reactStringReplace(
        t('subHeader').replace('{{email}}', route.params.email),
        route.params.email,
        (match, key) => (
          <Text key={key} typography="body_text_bold">
            {match}
          </Text>
        ),
      ),
    [],
  );
  return (
    <BaseScreen
      name={fieldName}
      ref={baseScreenRef}
      onSubmit={onSubmit}
      loading={signInLoading}
      validate={validateField}
      showHeaderBackButton={true}
      headerLabel={t('header')}
      subHeaderLabel={SubHeaderLabel}
      mainButtonLabel={t('continue')}
      renderInput={({value, onBlur, onFocus, onChange, error}) => (
        <TextInput
          error={error}
          value={value}
          onBlur={onBlur}
          onFocus={onFocus}
          secureTextEntry={true}
          onChangeText={onChange}
          autoComplete="new-password"
          textContentType="newPassword"
          label={t('passwordInputPlaceholder')}
        />
      )}
    />
  );
};

export default AuthSignIn;
