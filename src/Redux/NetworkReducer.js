// networkSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isConnected: true, // Default to true assuming the user has internet initially
};

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload.isConnected;
    },
  },
});

export const { setConnectionStatus } = networkSlice.actions;
export const selectIsConnected = (state) => state.network.isConnected;
export default networkSlice.reducer;
