import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SnackbarProvider autoHideDuration={1500} anchorOrigin={{vertical: "top", horizontal: "right"}}>
      <BrowserRouter>
    <App />
  </BrowserRouter>
  </SnackbarProvider>
);
reportWebVitals();
