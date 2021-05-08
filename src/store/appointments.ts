import { createAction, createReducer } from '@reduxjs/toolkit';

const setAppointments = createAction('set_appointments');

const initialState = { appointments: [], patientId: null };

const appointmentsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setAppointments, (state, action) => {
    (state.appointments = action.payload.list),
      (state.patientId = action.payload.patientId);
  });
});

export default appointmentsReducer;
