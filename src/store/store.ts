import {configureStore} from '@reduxjs/toolkit'
import {notificationDraftSlice} from '../screens/create-notification/notificationDraftSlice'
import {articlesApi} from '../services/articles'
import {baseApi} from '../services/init'
import {authSlice} from './authSlice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authSlice.reducer,
    notificationDraft: notificationDraftSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(articlesApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
