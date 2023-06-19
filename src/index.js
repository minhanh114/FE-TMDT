import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Provider } from 'react-redux'
import store from './store'

import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'
import Cookies from 'js-cookie';

const options = {
  timeout: 3000,
  position: positions.BOTTOM_RIGHT,
  transition: transitions.SCALE
}

// Kiểm tra xem đã có token trong cookie hay chưa
const token = Cookies.get('token');
if (token) {
  // Lưu token vào Redux store (hoặc nơi lưu trữ khác) để có thể sử dụng trong ứng dụng
  store.dispatch({ type: 'SET_TOKEN', payload: token });
}

ReactDOM.render(
  <Provider store={store} >
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);
