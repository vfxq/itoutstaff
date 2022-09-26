import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layout as AntLayout, Row,
  Col,
  Menu,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { locales } from '@consts';
import { Select } from '../ui-kit/Select';
import { menuItems } from './consts';
import { IMenuItem } from './types';
import './header.less';

const { Header: AntHeader } = AntLayout;

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

  const setLocale = (language: string) => {
    i18n.changeLanguage(language);
  };

  const getMenu = (items: IMenuItem[]): { key: string, label: React.ReactElement }[] => {
    return (
      items.map((item: IMenuItem) => ({
        key: item.id,
        label: (
          <Link to={item.path} rel="noopener noreferrer" className="link">
            {t(`menu.${item.id}`)}
          </Link>
        ),
        className: 'header-menu-item',
      }))
    );
  };

  return (
    <AntHeader className="header">
      <Row align="middle">
        <Col span="8">
          <Link to="/">
            <div className="logo" />
          </Link>
        </Col>
        <Col span="10" offset="1">
          <Menu
            className="align-right"
            mode="horizontal"
            items={getMenu(menuItems)}
          />
        </Col>
        <Col span="2">
          <Select
            className="locale_select"
            data={locales}
            defaultValue={i18n.language}
            onChange={setLocale}
          />
        </Col>
      </Row>

    </AntHeader>
  );
};

export default Header;
