import { adminItems, guestItems, readerItems } from '@components/Layout/consts';
import { IMenuItem } from '@components/Layout/types';
import { ROLES } from '@utils';

export const useMenuItems = (role: ROLES): Array<IMenuItem> => {
  switch (role) {
    case ROLES.ADMIN:
      return adminItems;
    case ROLES.READER:
      return readerItems;
    default:
      return guestItems;
  }
};
