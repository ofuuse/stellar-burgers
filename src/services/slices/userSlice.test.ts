import { expect, test, describe } from '@jest/globals';
import reducer, {
  initialState,
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  getUserThunk,
  updateUserThunk,
  getOrdersThunk,
  clearErrors
} from './userSlice';
import { MOCK_USER, MOCK_ORDER } from '../../utils/constant';

describe('userSlice reducer', () => {
  test('should return the initial state by default', () => {
    const state = reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  test('should clear error when clearErrors action is dispatched', () => {
    const errorState = {
      ...initialState,
      error: 'Some error'
    };

    const state = reducer(errorState, clearErrors());

    expect(state).toEqual({
      ...initialState,
      error: null
    });
  });

  describe('loginUserThunk', () => {
    test('should set isLoading=true on pending', () => {
      const action = { type: loginUserThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    test('should populate user and set isAuth=true on fulfilled', () => {
      const action = {
        type: loginUserThunk.fulfilled.type,
        payload: MOCK_USER
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        user: MOCK_USER,
        isLoading: false,
        isAuth: true
      });
    });

    test('should set error on rejected', () => {
      const action = {
        type: loginUserThunk.rejected.type,
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

  describe('registerUserThunk', () => {
    test('should set isLoading=true and isAuth=false on pending', () => {
      const action = { type: registerUserThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: true,
        isAuth: false
      });
    });

    test('should populate user and set isAuth=true on fulfilled', () => {
      const action = {
        type: registerUserThunk.fulfilled.type,
        payload: MOCK_USER
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        user: MOCK_USER,
        isAuth: true,
        isLoading: false
      });
    });

    test('should set error and isAuth=false on rejected', () => {
      const action = {
        type: registerUserThunk.rejected.type,
        error: { message: 'Test error' }
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isAuth: false,
        isLoading: false,
        error: 'Test error'
      });
    });
  });

  describe('logoutUserThunk', () => {
    test('should reset user and auth state on pending', () => {
      const action = { type: logoutUserThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        user: null,
        isAuth: false,
        isLoading: false,
        error: null
      });
    });
  });

  describe('getUserThunk', () => {
    test('should set isLoading=true on pending', () => {
      const action = { type: getUserThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    test('should populate user and set isAuth=true on fulfilled', () => {
      const action = {
        type: getUserThunk.fulfilled.type,
        payload: { user: MOCK_USER }
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        user: MOCK_USER,
        isAuth: true,
        isLoading: false
      });
    });

    test('should reset user and set error on rejected', () => {
      const action = {
        type: getUserThunk.rejected.type,
        error: { message: 'Test error' }
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        user: null,
        isLoading: false,
        error: 'Test error'
      });
    });
  });

  describe('updateUserThunk', () => {
    test('should set isLoading=true on pending', () => {
      const action = { type: updateUserThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    test('should update user and set isAuth=true on fulfilled', () => {
      const action = {
        type: updateUserThunk.fulfilled.type,
        payload: { user: MOCK_USER }
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        user: MOCK_USER,
        isAuth: true,
        isLoading: false
      });
    });

    test('should set error on rejected', () => {
      const action = {
        type: updateUserThunk.rejected.type,
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

  describe('getOrdersThunk', () => {
    test('should set isLoading=true on pending', () => {
      const action = { type: getOrdersThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    test('should populate orders on fulfilled', () => {
      const action = {
        type: getOrdersThunk.fulfilled.type,
        payload: [MOCK_ORDER]
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        orders: [MOCK_ORDER],
        isLoading: false,
        error: null
      });
    });

    test('should set error on rejected', () => {
      const action = {
        type: getOrdersThunk.rejected.type,
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
