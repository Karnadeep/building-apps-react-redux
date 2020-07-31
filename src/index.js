import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import './index.css'
import configureStore from './redux/configureStore';

const store = configureStore();

render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('app'));
