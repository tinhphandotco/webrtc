import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import rootReducer, { patricipantsEnhancer } from 'reducers'
import { KEY_PERSIST_STORE } from "config";

const persistConfig = {
    key: KEY_PERSIST_STORE,
    storage,
    blacklist: [],
    // whitelist: [],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(
        persistedReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true }),
        applyMiddleware(patricipantsEnhancer(), thunk),
    )
    let persistor = persistStore(store)
    return { store, persistor }
}