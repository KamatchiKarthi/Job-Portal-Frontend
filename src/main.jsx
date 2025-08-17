import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import { App as AntdApp, ConfigProvider } from 'antd';
import 'antd/dist/reset.css'; // For Ant Design v5+

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider>
    <AntdApp>
      <App />
    </AntdApp>
  </ConfigProvider>
);
