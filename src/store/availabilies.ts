import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import config from 'config';
import { Availability } from '.prisma/client';

const SERVER_API_ENDPOINT = config.get('SERVER_API_ENDPOING', '/api');
export const getAvailabilities = createAsyncThunk(
  'getAvailabilities',
  async (id) => {
    const response = await fetch(
      `${SERVER_API_ENDPOINT}/availabilities?practitionerId=${id}`,
    );
    const parsedResponse = await response.json();
    return parsedResponse;
  },
);

const availabiliesAdapter = createEntityAdapter<Availability>({
  selectId: (patient) => patient.id,
});
export const availabiliesSelectors = availabiliesAdapter.getSelectors();

const availabilieslice = createSlice({
  name: 'availabilies',
  initialState: availabiliesAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAvailabilities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAvailabilities.fulfilled, (state, action) => {
      availabiliesAdapter.setAll(state, action.payload);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getAvailabilities.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export default availabilieslice;
