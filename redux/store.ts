import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import preferencesReducer from './slices/preferencesSlice';
import favoritesReducer from './slices/favoritesSlice';
import feedReducer from './slices/feedSlice';
import { newsApi } from './api/newsApi';
import { tmdbApi } from './api/tmdbApi';
import { socialApi } from './api/socialApi';

const rootReducer = combineReducers({
  preferences: preferencesReducer,
  favorites: favoritesReducer,
  feed: feedReducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [tmdbApi.reducerPath]: tmdbApi.reducer,
  [socialApi.reducerPath]: socialApi.reducer,
});

const persistConfig = {
  key: 'contenthub-root',
  storage,
  whitelist: ['preferences', 'favorites'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(newsApi.middleware, tmdbApi.middleware, socialApi.middleware),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

// Create singleton for client use
let storeInstance: ReturnType<typeof makeStore> | null = null;

export const getStoreInstance = () => {
  if (!storeInstance) {
    storeInstance = makeStore();
  }
  return storeInstance;
};

export type AppStore = ReturnType<typeof makeStore>['store'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
