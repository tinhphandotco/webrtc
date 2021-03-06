import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
  import { BrowserRouter, Route, Switch } from "react-router-dom";

import configStore, { history } from "store";
import { participantsListener } from 'reducers';
import { App } from 'modules';
import { BASE_PATH } from "config";

import 'webrtc-adapter';

import 'antd/dist/antd.css';
import './styles/main.scss';

const { store, persistor } = configStore();

export const _store = store;

participantsListener.subscribe(_store);

import { ConnectedRouter } from 'connected-react-router'

ReactDOM.render(
  <Provider store={_store}>
    <PersistGate loading={(<h1>Loading...</h1>)} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>
  , document.getElementById('root')
);
