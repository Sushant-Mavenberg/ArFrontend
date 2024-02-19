import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const item = state.favorites.find((item) => item._id === action.payload.id);
      if (item) {
        // If item is already in favorites, you may want to update its properties
        // For simplicity, I'll assume it's a new item for now
        state.favorites.push(action.payload);
      } else {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter((item) => item._id !== action.payload.id);
    },
  },
});

// Create a persist config for the favorite slice
const favoritePersistConfig = {
  key: 'favorite',
  storage: AsyncStorage,
};

// Wrap the favorite reducer with persistReducer
const persistedFavoriteReducer = persistReducer(favoritePersistConfig, favoriteSlice.reducer);

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;

export default persistedFavoriteReducer;
