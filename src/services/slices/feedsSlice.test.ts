import { expect, test, describe } from '@jest/globals';
import reducer, {
  initialState,
  getOrderByNumberThunk,
  getAllFeedsThunk
} from './feedSlice';
import { MOCK_INGREDIENTS } from '../../utils/constant';

describe('feedsSlice reducer', () => {
  test('should return the initial state when called with undefined state', () => {
    const state = reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  describe('getOrderByNumberThunk reducer cases', () => {
    test('should set isLoading=true when getOrderByNumberThunk is pending', () => {
      const action = { type: getOrderByNumberThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    test('should set order and isLoading=false when fulfilled', () => {
      const action = {
        type: getOrderByNumberThunk.fulfilled.type,
        payload: {
          orders: [MOCK_INGREDIENTS[0]]
        }
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        order: MOCK_INGREDIENTS[0]
      });
    });

    test('should set error message when rejected', () => {
      const action = {
        type: getOrderByNumberThunk.rejected.type,
        error: { message: 'Test error' }
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error: 'Test error'
      });
    });
  });

  describe('getAllFeedsThunk reducer cases', () => {
    test('should set isLoading=true when getAllFeedsThunk is pending', () => {
      const action = { type: getAllFeedsThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    test('should populate orders, total and totalToday when fulfilled', () => {
      const action = {
        type: getAllFeedsThunk.fulfilled.type,
        payload: {
          orders: MOCK_INGREDIENTS,
          total: MOCK_INGREDIENTS.length,
          totalToday: 5
        }
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        orders: MOCK_INGREDIENTS,
        total: MOCK_INGREDIENTS.length,
        totalToday: 5,
        error: null
      });
    });

    test('should set error message when rejected', () => {
      const action = {
        type: getAllFeedsThunk.rejected.type,
        error: { message: 'Test error' }
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error: 'Test error'
      });
    });
  });
});
