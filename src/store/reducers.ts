import timeslots from './timeslots';
import patients from './patients';
import practioners from './practitioners';

export default {
  timeslots: timeslots.reducer,
  patients: patients.reducer,
  practitioners: practioners.reducer,
};
