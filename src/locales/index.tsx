import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import english from './_english.json';
import tagalog from './_tagalog.json';

// the translations
const resources = {
  en: {
    translation: english,
  },
  tg: {
    translation: tagalog,
  },
};

// localstorage check
const lngKey: string = process.env.REACT_APP_LOCALE || '';
let lng: string = process.env.REACT_APP_DEFAULT_LOCALE || 'en';
if (window.localStorage.getItem(lngKey)) {
  lng = window.localStorage.getItem(lngKey) || 'en';
} else {
  window.localStorage.setItem(lngKey, process.env.REACT_APP_DEFAULT_LOCALE || 'en');
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng,
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
