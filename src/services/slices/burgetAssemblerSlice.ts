import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../store';
import { TIngredient, TConstructorIngredient } from '../../utils/types';

export type TBurgerAssemblerState = {
  burgerAssembler: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  error: string | null;
};

export const initialState: TBurgerAssemblerState = {
  burgerAssembler: {
    bun: null,
    ingredients: []
  },
  error: null
};

const burgerAssemblerSlice = createSlice({
  name: 'burgerAssembler',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.burgerAssembler.bun = action.payload;
        } else {
          state.burgerAssembler.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },
    upIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const ingredients = state.burgerAssembler.ingredients;

      if (index > 0 && index < ingredients.length) {
        const [moved] = ingredients.splice(index, 1);
        ingredients.splice(index - 1, 0, moved);
      }
    },
    downIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const ingredients = state.burgerAssembler.ingredients;

      if (index >= 0 && index < ingredients.length - 1) {
        const [moved] = ingredients.splice(index, 1);
        ingredients.splice(index + 1, 0, moved);
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.burgerAssembler.ingredients =
        state.burgerAssembler.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload.id
        );
    },
    clearburgerAssembler: (state) => {
      state.burgerAssembler.bun = null;
      state.burgerAssembler.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  upIngredient,
  downIngredient,
  removeIngredient,
  clearburgerAssembler
} = burgerAssemblerSlice.actions;

export const burgerAssemblerSelector = (state: RootState) =>
  state.burgerAssembler.burgerAssembler;

export default burgerAssemblerSlice.reducer;
