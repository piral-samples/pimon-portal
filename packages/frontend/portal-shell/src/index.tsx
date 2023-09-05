import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from './AppProvider';
import App from './App';

const root = createRoot(document.querySelector('#app')!);
root.render(
  <AppProvider>
    <App />
  </AppProvider>,
);
