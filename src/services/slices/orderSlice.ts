import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

type TOrderState = {
  order: TOrder | null;
  isOrderLoading: boolean;
  error: string | null | undefined;
};

export const initialState: TOrderState = {
  order: null,
  isOrderLoading: false,
  error: null
};

// Async thunk for placing a burger order
export const orderBurgerThunk = createAsyncThunk(
  'orders/placeBurgerOrder',
  async (ingredientIds: string[]) => await orderBurgerApi(ingredientIds)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.isOrderLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerThunk.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.order = action.payload.order;
        state.error = null;
      })
      .addCase(orderBurgerThunk.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.error.message;
      });
  }
});

// Actions
export const { clearOrder } = orderSlice.actions;

// Selectors
export const isOrderLoadingSelector = (state: RootState) =>
  state.order.isOrderLoading;
export const orderSelector = (state: RootState) => state.order.order;

export default orderSlice.reducer;
