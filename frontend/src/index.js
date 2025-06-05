import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// import './index.css';
import App from './App';

library.add(fas);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

