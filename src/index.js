import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducer from './store/Reducer';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

// configure the HTTP requests configs here
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common['Authorization'] = "AUTH TOKEN";
axios.defaults.headers.post['Content-Type'] = "application/json";

axios.interceptors.request.use(req => {

	// edit request configs here
	return req;
}, err => {
	return Promise.reject(err);
});

axios.interceptors.response.use(res => {

	// edit response configs here
	return res;
}, err => {
	return Promise.reject(err);
});

const store = createStore(Reducer);
const app = <Provider store={store}><App /></Provider>

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
