import React from 'react';
import { ConfigProvider } from 'antd';
import { ReactQueryProvider } from '@contexts/auth/ReactQueryProvider';
import { useLocalStorage } from './hooks';
// import { getLocale } from './utils';
import { en } from './consts';
import './i18/i18n';
import './styles/all.less';

const App: React.FC = () => {
  const [i18nextLng] = useLocalStorage('i18nextLng', en);

  return (
    <ReactQueryProvider>
      {/* <ConfigProvider locale={getLocale(i18nextLng)}> */}
      <div>AAAA</div>
      {/* </ConfigProvider> */}
    </ReactQueryProvider>
  );
};

export default App;
