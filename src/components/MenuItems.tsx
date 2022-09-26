import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IMenuItem } from './types';

const MenuItems: React.FC = ({ items }: {items: IMenuItem[]}) => {
  const { t } = useTranslation();

  return (
    <>
      {
        items.map((item: IMenuItem) => ({
          key: item.id,
          label: (
            <Link to={item.path} rel="noopener noreferrer" className="link">
              {t(`menu.${item.id}`)}
            </Link>
          ),
          className: 'header-menu-item',
        }))
      }
    </>
  );
};

export default MenuItems;
