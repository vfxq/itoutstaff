import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { languageDetectorOptions } from './languageDetectorOptions';

import translationEN from './traslations/translationEN.json';
import translationRU from './traslations/translationRU.json';

const resources = {
  en_US: {
    translation: translationEN,
  },
  ru_RU: {
    translation: translationRU,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en_US',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
    detection: languageDetectorOptions,
  });

export default i18n;
