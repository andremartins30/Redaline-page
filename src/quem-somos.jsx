import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import QuemSomosPage from './QuemSomosPage';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuemSomosPage />
  </React.StrictMode>
);
