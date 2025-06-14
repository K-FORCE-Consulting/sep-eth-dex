import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import {
  FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import burn from './burn/reducer'
import farmsReducer from './farms'
import farmsReducerV1 from './farmsV1'
import { updateVersion } from './global/actions'
import infoReducer from './info'
import lotteryReducer from './lottery'
import mint from './mint/reducer'
import multicall from './multicall/reducer'
import poolsReducer from './pools'
import swap from './swap/reducer'
import transactions from './transactions/reducer'
import user from './user/reducer'
import limitOrders from './limitOrders/reducer'
import potteryReducer from './pottery'

const PERSISTED_KEYS: string[] = ['user', 'transactions']

const persistConfig = {
  key: 'primary',
  whitelist: PERSISTED_KEYS,
  blacklist: ['profile'],
  storage,
  version: 1,
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    farms: farmsReducer,
    farmsV1: farmsReducerV1,
    pools: poolsReducer,
    lottery: lotteryReducer,
    info: infoReducer,
    pottery: potteryReducer,
    limitOrders,
    user,
    transactions,
    swap,
    mint,
    burn,
    multicall,
  }),
)

// eslint-disable-next-line import/no-mutable-exports
let store: ReturnType<typeof makeStore>

export function makeStore(preloadedState = undefined) {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: process.env.NODE_ENV === 'development',
    preloadedState,
  })
}

export const initializeStore = (preloadedState = undefined) => {
  let _store = store ?? makeStore(preloadedState)

  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    })
    store = undefined
  }

  if (typeof window === 'undefined') return _store

  if (!store) {
    store = _store
  }

  return _store
}

store = initializeStore()

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const persistor = persistStore(store, undefined, () => {
  store.dispatch(updateVersion())
})

export function useStore(initialState) {
  return useMemo(() => initializeStore(initialState), [initialState])
}
