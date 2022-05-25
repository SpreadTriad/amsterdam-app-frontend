import AsyncStorage from '@react-native-async-storage/async-storage'
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import {notificationsSlice} from '../components/features/notifications'
import {addressSlice} from '../modules/address/addressSlice'
import {modulesSlice} from '../modules/home/store/modulesSlice'
import {projectManagerSlice} from '../modules/projects/components/project-manager'
import {projectsByTextSlice} from '../modules/projects/components/projects'
import {notificationDraftSlice} from '../modules/projects/screens/create-notification'
import {baseApi} from '../services/init'
import {themeSlice} from '../themes/themeSlice'
import {authSlice} from './authSlice'
import {environmentSlice} from './environmentSlice'

const addressPersistConfig = {
  key: 'address',
  storage: AsyncStorage,
  blacklist: ['temp'],
}

const environmentPersistConfig = {
  key: 'environment',
  storage: AsyncStorage,
}

const modulesPersistConfig = {
  key: 'modules',
  storage: AsyncStorage,
}

const notificationsPersistConfig = {
  key: 'notifications',
  storage: AsyncStorage,
}

const projectManagerPersistConfig = {
  key: 'projectManager',
  storage: AsyncStorage,
}
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  address: persistReducer(addressPersistConfig, addressSlice.reducer),
  auth: authSlice.reducer,
  modules: persistReducer(modulesPersistConfig, modulesSlice.reducer),
  environment: persistReducer(
    environmentPersistConfig,
    environmentSlice.reducer,
  ),
  notifications: persistReducer(
    notificationsPersistConfig,
    notificationsSlice.reducer,
  ),
  notificationDraft: notificationDraftSlice.reducer,
  projectManager: persistReducer(
    projectManagerPersistConfig,
    projectManagerSlice.reducer,
  ),
  projectsSearch: projectsByTextSlice.reducer,
  theme: themeSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,

  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware)
    if (__DEV__) {
      const createDebugger = require('redux-flipper').default
      middleware.push(createDebugger())
    }
    return middleware
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
