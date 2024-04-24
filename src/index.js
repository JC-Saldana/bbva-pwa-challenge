import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Header from './components/Header';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { MyHookProvider } from './context';
import { ScoreHookProvider } from './context/scoreContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyHookProvider>
      <ScoreHookProvider>
        <Header />
        <App />
      </ScoreHookProvider>
    </MyHookProvider>
  </React.StrictMode>
)
