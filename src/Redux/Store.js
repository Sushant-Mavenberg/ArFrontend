import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import CartReducer from './CartReducer';
import productSlice from './ProductReducer';
import networkSlice from './NetworkReducer';
import authReducer from './JWTReducer';
import tokenReducer from './tokenReducer';
import persistedFavoriteReducer from './FavouriteReducer';
import orderReducer from './orderReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, CartReducer);

const store = configureStore({
  reducer: {
    cart: persistedReducer,
    products: productSlice,
    network: networkSlice,
    favorite: persistedFavoriteReducer,
    auth: authReducer,
    tokenauth:tokenReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
