import enUS from 'antd/lib/locale/en_US';
import ruRU from 'antd/lib/locale/ru_RU';
import { ru } from '../consts';

export const getLocale = (locale: string) => {
  console.log('getLocale', locale);
  if (locale === ru.id) {
    return ruRU;
  }

  return enUS;
};
