import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import axios from 'axios';

import Reducer from './store/Reducer';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import actionTypes from './store/Action';

const store = createStore(Reducer);
const app = <Provider store={store}><App /></Provider>

// configure the HTTP requests configs here
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common['Authorization'] = "AUTH TOKEN";
axios.defaults.headers.post['Content-Type'] = "application/json";

let apiCancel = {
	'users': {},
	'posts': {},
	'comments': {}
};

// let cancelTokens = {
// 	location1: token1,
// }

axios.interceptors.request.use(req => {
	/*
	1. if payload is cancel with url, make apiCancel object url key to have empty object
	2. if apiCancel object url key has endpoint value, throw error of repeat api call
	3a. if apiCancel object url key does not have endpoint value, 
	3b. create object with payload and cancel token and assign to endpoint value.
	*/

	let location = window.location.href.split('/')[3];
	// if(!cancelTokens.location){
	// 	const ct = axios.CancelToken;
	// } else {
	// 	ct = cancelTokens.location.token
	// }
	const ct = axios.CancelToken;
	const source = ct.source();
	console.log('reqeust: ', req);
	if (req.data && req.data.startsWith('cancel')) {
		console.log('REMOVE TOKEN FROM APICANCEL OBJECT!!!');
		let path = req.data.split(' ')[1];
		apiCancel[path] = {};
	} else if (Object.keys(apiCancel[location]).length !== 0) {
		console.log('REPEAT API CALL ERROR CALLED!!!');
		console.log('apiCancel Object: ', apiCancel);
		throw new Error('REPEATED API CALL CANCELLED!!!');
	} else {
		console.log('SET NEW OBJ TO APICANCEL!!!');
		let fullUrl = req.baseURL + req.url;
		let obj = {[fullUrl]: source};
		apiCancel[location] = obj;
	}
	req.cancelToken = source.token;
	console.log('apiCancel Object: ', apiCancel);
	return req;
}, err => {
	return Promise.reject(err);
});

axios.interceptors.response.use(res => {
	console.log('RESPONSE: ', res);
	return res;
}, err => {
	return Promise.reject(err);
});


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
