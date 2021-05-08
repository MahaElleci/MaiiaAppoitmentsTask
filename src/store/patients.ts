import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import config from 'config';
import { parseIds } from 'store/utils';
import { Patient } from '.prisma/client';

const SERVER_API_ENDPOINT = config.get('SERVER_API_ENDPOINT', '/api');

export const getPatients = createAsyncThunk(
  'getPatients',
  async (_, { dispatch }) => {
    const response = await fetch(`${SERVER_API_ENDPOINT}/patients`);
    const parsedResponse = await response.json();
    return parsedResponse;
  },
);

const patientsAdapter = createEntityAdapter<Patient>({
  selectId: (patient) => patient.id,
});
export const patientsSelectors = patientsAdapter.getSelectors();

const patientSlice = createSlice({
  name: 'patients',
  initialState: patientsAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPatients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPatients.fulfilled, (state, action) => {
      patientsAdapter.setAll(state, action.payload);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getPatients.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export default patientSlice;
