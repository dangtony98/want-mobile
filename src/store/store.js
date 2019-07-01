import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import admin from '../reducers/admin';
import feed from '../reducers/feed';
import filters from '../reducers/filters';

const config = {
    key: 'store',
    storage: AsyncStorage
}

const store = createStore(persistReducer(config, combineReducers({
    admin,
    feed,
    filters
}), {}, compose(
    applyMiddleware(thunk)
)));

const persistor = persistStore(store);

export { store, persistor };