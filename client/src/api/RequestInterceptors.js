import axios from 'axios';
import * as R from 'ramda';
import { _store } from "index";
import { REQUEST_HEADER } from 'config';

import { Maybe, match } from 'utils';

import {
  Error401
} from './HandleRequestFail';

axios.interceptors.request.use(
  (config) => {
    const _config = {
      ...config,
      REQUEST_HEADER
    };

    // OPTIMIZE: Handle impure
    Maybe.toMaybe(_store.getState().session.userAuth.token)
      .fold(
        R.identity,
        token => _config.headers.Authorization = `Bearer ${token}`
      );

    return _config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => { return response.data; },
  (error) => {
    match(error.status)
      .on(R.equals(401), Error401)
      .on(R.equals(403), R.identity)
      .on(R.equals(404), R.identity)
      .on(R.equals(500), R.identity);

    return Promise.reject(error.response.data);
  }
);