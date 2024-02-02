import {configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistStore,
  createMigrate,
  persistReducer,
} from 'redux-persist';

// Global utils
import storage from '@utils/storage';

import reducers from './reducers';
import migrations from './migrations';

const persistConfig = {
  storage,
  key: 'root',
  migrate: createMigrate(migrations, {debug: __DEV__}),
  version: Object.keys(migrations)[Object.keys(migrations).length - 1],
};

// @ts-ignore
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(__DEV__ ? [require('redux-flipper').default()] : []),
});

export const persistor = persistStore(store);

export default store;
