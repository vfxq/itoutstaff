import React from 'react';
import { ConfigProvider } from 'antd';
import {
  BrowserRouter,
  Routes as ReactRoutes,
} from 'react-router-dom';
import { ReactQueryProvider } from '@contexts/ReactQueryProvider';
import Layout from './components/Layout';
import { useLocalStorage } from './hooks';
import { getLocale } from './utils';
import { en } from './consts';
import './i18/i18n';
import './styles/all.less';

const App: React.FC = () => {
  const [i18nextLng] = useLocalStorage('i18nextLng', en);

  return (
    <ReactQueryProvider>
      <ConfigProvider locale={getLocale(i18nextLng)}>
        <BrowserRouter>
          <Layout>
            <div>AAAA</div>
          </Layout>
        </BrowserRouter>
      </ConfigProvider>
    </ReactQueryProvider>
  );
};

export default App;
