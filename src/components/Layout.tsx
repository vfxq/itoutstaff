import React from 'react';
import { Layout as AntLayout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from './Header';
// import { Footer } from './Footer';

const { Content } = AntLayout;

const Layout: React.FC = () => (
  <AntLayout className="Layout">
    <Header />
    <Content>
      <Outlet />
    </Content>
    {/* <Footer /> */}
  </AntLayout>
);

export default Layout;
