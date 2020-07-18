import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FirebaseAppProvider } from 'reactfire';
const firebaseConfig = require('./firebaseConfig');

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig.firebaseConfig}>
    <App />
  </FirebaseAppProvider>,
  document.getElementById('root')
);

