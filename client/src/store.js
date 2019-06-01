import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import createRootReducer, { roomMiddleware } from 'reducers';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router'
import { KEY_PERSIST_STORE } from "config";

const persistConfig = {
  key: KEY_PERSIST_STORE,
  storage,
  blacklist: ['room', 'participants'],
  whitelist: ['room.roomName'],
};

export const history = createBrowserHistory();

export default () => {
  let store = createStore(
    persistReducer(persistConfig, createRootReducer(history)),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true }),
    applyMiddleware(routerMiddleware(history), roomMiddleware, thunk),
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
