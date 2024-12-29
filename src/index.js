import React from 'react';
import { createRoot } from 'react-dom/client';
import TimeSheet from './Componets/TimeSheet/TimeSheet';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TimeSheet />

  </React.StrictMode>
);


