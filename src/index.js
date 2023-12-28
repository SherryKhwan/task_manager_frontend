import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './store/rootReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
  reducer: rootReducer,
});

root.render(
  <Provider store={store} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
