import enUS from 'antd/lib/locale/en_US';
import ruRU from 'antd/lib/locale/ru_RU';
import { ru } from '../consts';

export const getLocale = (locale: string) => {
  if (locale === ru) {
    return ruRU;
  }

  return enUS;
};
