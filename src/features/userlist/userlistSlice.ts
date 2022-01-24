import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
import { RootState } from '../../app/store';


export interface UserlistState {
  data: {
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    id: number;
    login: string;
    node_id: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
  }[] | null;
  page: number;
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserlistState = {
  data: null,
  value: 0,
  page: 0,
  status: 'idle',
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (page: number) => {
    return fetch(
      `https://api.github.com/users?since=${page}&per_page=10`
    ).then((res: any) => { return res.json() })
      .catch((err: {message: string}) => console.error(err));
  }
);

export const userlistSlice = createSlice({
  name: 'userlist',
  initialState,
  reducers: {
    prevPage: (state) => {
      if (state.page === +0) return;
      state.page -= 9;
    },
    nextPage: (state) => {
      if (state.page === 81) return;
      state.page += 9;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.data = payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { prevPage, nextPage } = userlistSlice.actions;

export const selectCount = (state: RootState) => state.userlist.value;
export const users = (state: RootState) => state.userlist.data;
export const getPage = (state: RootState) => state.userlist.page;

export default userlistSlice.reducer;
