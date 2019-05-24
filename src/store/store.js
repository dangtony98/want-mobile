import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import admin from '../reducers/admin';
import feed from '../reducers/feed';

const config = {
    key: 'store',
    storage: AsyncStorage
}

const store = createStore(persistReducer(config, combineReducers({
    admin,
    feed
}), {}, compose(
    applyMiddleware(thunk)
)));

const persistor = persistStore(store);

export { store, persistor };