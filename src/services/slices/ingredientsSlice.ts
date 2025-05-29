import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '../../utils/burger-api';

type TIngredientsState = {
  ingredients: TIngredient[];
  ingredientsLoading: boolean;
  error: string | null | undefined;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  ingredientsLoading: false,
  error: null
};

// Async thunk to fetch ingredients from the API
export const getIngredientsThunk = createAsyncThunk(
  'ingredients/fetchAll',
  async () => await getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.ingredientsLoading = true;
        state.error = null;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.ingredientsLoading = false;
        state.error = null;
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.ingredientsLoading = false;
        state.error = action.error.message;
      });
  }
});

// Selectors
export const ingredientsSelector = (state: RootState) =>
  state.ingredients.ingredients;

export const ingredientsLoadingSelector = (state: RootState) =>
  state.ingredients.ingredientsLoading;

export default ingredientsSlice.reducer;
