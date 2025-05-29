import { expect, test, describe } from '@jest/globals';
import reducer, {
  initialState,
  orderBurgerThunk,
  clearOrder
} from '../slices/orderSlice';
import { MOCK_INGREDIENTS } from '../../utils/constant';

describe('orderSlice reducer', () => {
  test('should return initial state by default', () => {
    const state = reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  describe('orderBurgerThunk reducer cases', () => {
    test('should set isOrderLoading=true when pending', () => {
      const action = { type: orderBurgerThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isOrderLoading: true
      });
    });

    test('should populate order and reset loading when fulfilled', () => {
      const action = {
        type: orderBurgerThunk.fulfilled.type,
        payload: {
          order: MOCK_INGREDIENTS
        }
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isOrderLoading: false,
        order: MOCK_INGREDIENTS,
        error: null
      });
    });

    test('should set error and reset loading when rejected', () => {
      const action = {
        type: orderBurgerThunk.rejected.type,
        error: { message: 'Test error' }
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isOrderLoading: false,
        error: 'Test error'
      });
    });
  });
});
