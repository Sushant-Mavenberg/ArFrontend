import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  products: [],
  savedItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);

      if (item) {
        // Check if adding the quantity would exceed 3
        if (item.quantity + action.payload.quantity > 3) {
          // If it would, set the quantity to 3
          item.quantity = 3;

        } else {
          // If not, update the quantity accordingly
          item.quantity = item.quantity + action.payload.quantity;
        }
      } else {
        // If the item is not in the cart, add it with quantity checking
        const newItem = { ...action.payload, quantity: Math.min(action.payload.quantity, 3) };
        state.products.push(newItem);
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter((item) => item.id !== action.payload.id);
    },
    updateQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    saveForLater: (state, action) => {
      const itemToSave = state.products.find((item) => item.id === action.payload.id);
      if (itemToSave) {
        state.products = state.products.filter((item) => item.id !== action.payload.id);
        state.savedItems.push(itemToSave);
      }
    },
    deleteSavedItem: (state, action) => {

      const updatedSavedItems = state.savedItems.filter((item) => {

        return item.id !== action.payload;
      });

      return { ...state, savedItems: updatedSavedItems };
    },
    
    clearSavedItems: (state) => {
      state.savedItems = [];
    },
  },
});

export const { addToCart, deleteItem, updateQuantity, saveForLater, deleteSavedItem,clearSavedItems,  } = cartSlice.actions;

export default cartSlice.reducer;
