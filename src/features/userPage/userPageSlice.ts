import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
import { RootState } from '../../app/store';

export interface UserState {
  user: {
    avatar_url: string;
    events_url: string;
    name: string;
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
  } | null;
  repos: any[] | null | undefined;
  status: 'idle' | 'loading' | 'failed';
  url: string | undefined;
}

const initialState: UserState = {
  user: null,
  url: '',
  repos: null,
  status: 'idle',
};

export const getUser = createAsyncThunk(
  'userpage/getUser',
  async (username: string | undefined) => {
    return fetch(
      `https://api.github.com/users/${username}`
    ).then((res: any) => { return res.json() })
      .catch((err: {message: string}) => console.error(err));
  }
);

export const getUserRepos = createAsyncThunk(
  'repos/getRepos',
  async (url: string | undefined) => {
    return fetch(`${url}`)
      .then((res: any) => { return res.json() })
      .catch((err: {message: string}) => console.error(err));
  }
)

export const userPageSlice = createSlice({
  name: 'userpage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.user = payload;
        state.url = payload.repos_url;
      })
      .addCase(getUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getUserRepos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserRepos.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.repos = payload;
      })
      .addCase(getUserRepos.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const user = (state: RootState) => state.userpage.user;
export const url = (state: RootState) => state.userpage.url;
export const repos = (state: RootState) => state.userpage.repos;

export default userPageSlice.reducer;
