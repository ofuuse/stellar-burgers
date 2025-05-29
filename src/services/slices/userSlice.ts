import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi,
  TLoginData,
  TRegisterData,
  refreshToken,
  TAuthResponse
} from '../../utils/burger-api';
import { TOrder, TUser } from '../../utils/types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  isAuth: boolean;
  isLoading: boolean;
  user: TUser | null;
  orders: TOrder[];
  error: string | null | undefined;
};

export const initialState: TUserState = {
  isAuth: false,
  isLoading: false,
  user: null,
  orders: [],
  error: null
};

// Login user
export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    const { refreshToken, accessToken, user }: TAuthResponse = response;
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return user;
  }
);

// Register user
export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    const { refreshToken, accessToken, user }: TAuthResponse = response;
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return user;
  }
);

// Logout user
export const logoutUserThunk = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

// Get current user
export const getUserThunk = createAsyncThunk('user/getUser', getUserApi);

// Update user info
export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (userData: TRegisterData) => await updateUserApi(userData)
);

// Get user's orders
export const getOrdersThunk = createAsyncThunk('user/getOrders', getOrdersApi);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(registerUserThunk.pending, (state) => {
        state.isAuth = false;
        state.isLoading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isAuth = false;
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(logoutUserThunk.pending, (state) => {
        state.user = null;
        state.isAuth = false;
        state.isLoading = false;
        state.error = null;
      })

      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(getOrdersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  }
});

export const { clearErrors } = userSlice.actions;

// Selectors
export const isAuthCheckedSelector = (state: RootState) => state.user.isAuth;
export const isLoadingSelector = (state: RootState) => state.user.isLoading;
export const userDataSelector = (state: RootState) => state.user.user;
export const userNameSelector = (state: RootState) => state.user.user?.name;
export const userEmailSelector = (state: RootState) => state.user.user?.email;
export const userOrdersSelector = (state: RootState) => state.user.orders;
export const errorSelector = (state: RootState) => state.user.error;

export default userSlice.reducer;
