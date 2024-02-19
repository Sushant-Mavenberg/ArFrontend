import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Define the initial state
const initialState = {
  orderId: null,
  loading: false,
  error: null,
};

// Define the async thunk for generating an order
const generateOrder = createAsyncThunk('order/generateOrder', async ({ orderPayload }, { rejectWithValue }) => {

  try {
    // Retrieve the token from AsyncStorage
    const token = await AsyncStorage.getItem('token');

    // Check if the token is available
    if (!token) {
      // Handle the case where the token is not available
      return rejectWithValue('Token not available. Please log in.');
    }

    const response = await axios.post('http://192.168.10.110:8000/api/orders/place-order', orderPayload, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the JWT token to the headers
      },
    });
 console.log(response.data)
    return response.data;
  } catch (error) {
    // Handle errors and provide a useful error message
    return rejectWithValue('Failed to generate order. Please try again.');
  }
});

// Create a slice of the Redux store
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the pending state while the API request is in progress
    builder.addCase(generateOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // Handle the fulfilled state when the API request is successful
    builder.addCase(generateOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orderId = action.payload;
    });

    // Handle the rejected state when the API request fails
    builder.addCase(generateOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Export the async thunk and the reducer
export { generateOrder };
export default orderSlice.reducer;
