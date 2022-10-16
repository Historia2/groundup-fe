import React from 'react';
import './App.css';
import { Routers } from './router';
import { SWRConfig } from 'swr';
import fetcher from './config/fetcher';

const App: React.FC = () => {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        revalidateOnMount: true,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      <Routers />
    </SWRConfig>
  );
}
export default App;
