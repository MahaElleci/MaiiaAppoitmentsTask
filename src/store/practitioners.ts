import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import config from 'config';
import { Practitioner } from '.prisma/client';

const SERVER_API_ENDPOINT = config.get('SERVER_API_ENDPOINT', '/api');

export const getPractitioners = createAsyncThunk(
  'getPractitioners',
  async () => {
    const response = await fetch(`${SERVER_API_ENDPOINT}/practitioners`);
    const parsedResponse = await response.json();
    return parsedResponse;
  },
);

const practionersAdapter = createEntityAdapter<Practitioner>({
  selectId: (practitioner) => practitioner.id,
});
export const practionersSelector = practionersAdapter.getSelectors();

const practionerSlice = createSlice({
  name: 'practitioners',
  initialState: practionersAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPractitioners.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPractitioners.fulfilled, (state, action) => {
      practionersAdapter.setAll(state, action.payload);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getPractitioners.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});
export default practionerSlice;
