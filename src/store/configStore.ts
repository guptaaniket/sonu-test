import { createStore, applyMiddleware,compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";


import rootReducer from './reducers';
import initialState from "./reducers/initialState"

const persistConfig = {
  key: 'root',
  storage,
  
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  let store = createStore(persistedReducer,initialState, composeEnhancers(applyMiddleware(thunk,reduxImmutableStateInvariant())))
  let persistor = persistStore(store)
  return { store, persistor }
}
