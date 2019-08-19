import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from '@react-native-community/async-storage'
import thunk from 'redux-thunk'
import { IS_DEV } from '../api'
import { composeWithDevTools } from 'redux-devtools-extension'
import combinerReducers from './combineReducers'

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, combinerReducers)

let store = createStore(persistedReducer, applyMiddleware(thunk))
if (IS_DEV) {
  store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
  )
}

export const persistor = persistStore(store)

export default store
