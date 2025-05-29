import { expect, test, describe } from '@jest/globals';
import reducer, { initialState, getIngredientsThunk } from './ingredientsSlice';
import { MOCK_INGREDIENTS } from '../../utils/constant';

describe('ingredientsSlice reducer', () => {
  test('should return the initial state when passed an unknown action', () => {
    const state = reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  describe('getIngredientsThunk reducer cases', () => {
    test('should set ingredientsLoading=true when pending', () => {
      const action = { type: getIngredientsThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        ingredientsLoading: true,
        error: null
      });
    });

    test('should populate ingredients and reset loading/error when fulfilled', () => {
      const action = {
        type: getIngredientsThunk.fulfilled.type,
        payload: MOCK_INGREDIENTS
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        ingredients: MOCK_INGREDIENTS,
        ingredientsLoading: false,
        error: null
      });
    });

    test('should set error and stop loading when rejected', () => {
      const action = {
        type: getIngredientsThunk.rejected.type,
        error: { message: 'Test error' }
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        ingredientsLoading: false,
        error: 'Test error'
      });
    });
  });
});
