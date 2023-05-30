import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import RootReducer from './store/reducers/RootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';



const Store = configureStore({
  reducer: RootReducer,
  middleware: [thunk]
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />

    </Provider>
  </React.StrictMode>
);


reportWebVitals();
