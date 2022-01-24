import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userlistReducer from '../features/userlist/userlistSlice';
import userpageReducer from '../features/userPage/userPageSlice';

export const store = configureStore({
  reducer: {
    userlist: userlistReducer,
    userpage: userpageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
