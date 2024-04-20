import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Header from './components/Header';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { MyHookProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyHookProvider>
      <Header />
      <App />
    </MyHookProvider>
  </React.StrictMode>
)