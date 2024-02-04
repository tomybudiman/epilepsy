import {
  initReactI18next,
  useTranslation as useTranslationNative,
} from 'react-i18next';
import moment from 'moment/min/moment-with-locales';
import isEmpty from 'lodash/isEmpty';
import i18n from 'i18next';

// Global utils
import storage from '@utils/storage.ts';

// Translation JSON Data
import enJson from './en.json';
import idJson from './id.json';

export const useTranslation = (basePath?: string) => {
  const {t} = useTranslationNative(
    'translation',
    typeof basePath === 'string'
      ? {
          keyPrefix: basePath,
        }
      : {},
  );
  return {t};
};

if (isEmpty(storage.getString('langCode'))) {
  storage.setString('langCode', 'id');
}

i18n.on('languageChanged', lang => {
  moment.locale(lang);
});

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: enJson,
      },
      id: {
        translation: idJson,
      },
    },
    lng: storage.getString('langCode'),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => null);

export default i18n;
