import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, Route } from "react-router-dom";

import configStore from "store";
import { App } from 'modules';
import { BASE_PATH } from "config";

import 'webrtc-adapter';

import 'antd/dist/antd.css';
import './styles/main.scss';

const { store, persistor } = configStore();

export const _store = store;

ReactDOM.render(
    <Provider store={_store}>
        <PersistGate loading={(<h1>Loading...</h1>)} persistor={persistor}>
            <BrowserRouter basename={BASE_PATH}>
                <Route path="*" component={App} />
            </BrowserRouter>
        </PersistGate>
    </Provider>
    , document.getElementById('root')
);
