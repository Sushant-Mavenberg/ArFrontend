import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
      const response = await axios.get('http://192.168.10.110:8000/api/products/fetchall');
    
      return response.data.products;
    } catch (error) {
      throw error;
    }
  });
  export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchProductsByCategory',
    async (category) => {
      try {
        const response = await axios.get(`http://192.168.10.110:8000/api/products/fetchall/${category}`);
        return response.data.products;
      } catch (error) {
        throw error;
      }
    }
  );

  const productSlice = createSlice({
    name: 'products',
    initialState: {
      items: [],
      tableTops: [],
      wallHangings: [],
      aromaCandles: [],
      metalPlanters: [],
      floorStanding: [],
      loadingAll: 'idle', // Loading state for fetchProducts
      loadingByCategory: 'idle', // Loading state for fetchProductsByCategory
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.loadingAll = 'pending';
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.loadingAll = 'succeeded';
          state.items = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.loadingAll = 'failed'; // Set loading state to failed
          state.error = action.error.message;
        })
        .addCase(fetchProductsByCategory.pending, (state) => {
          state.loadingByCategory = 'pending';
          state.error = null; // Reset error on pending
        })
        .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
          state.loadingByCategory = 'succeeded';
          action.payload.forEach((product) => {
            const { category } = product;
            switch (category) {
              case 'table-top':
                state.tableTops.push(product);
                break;
              case 'wall-hanging':
                state.wallHangings.push(product);
                break;
              case 'aroma-candle':
                state.aromaCandles.push(product);
                break;
              case 'metal-planter':
                state.metalPlanters.push(product);
                break;
              case 'floor-standing':
                state.floorStanding.push(product);
                break;
              default:
                break;
            }
          });
        })
        .addCase(fetchProductsByCategory.rejected, (state, action) => {
          state.loadingByCategory = 'failed';
          state.error = action.error.message;
        });
    },
  });
  

  
  
  export default productSlice.reducer;