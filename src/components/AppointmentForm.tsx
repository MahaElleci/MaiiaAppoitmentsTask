import EditorLink from './EditorLink';
import { useForm } from 'react-hook-form';
import config from 'config';

const AppointmentForm = ({ patientsData, practitionersData }) => {
  const { register, handleSubmit, watch } = useForm();
  const onSubmit = (data) => console.log(data);
  const { practitioners } = watch();
  const SERVER_API_ENDPOINT = config.get('SERVER_API_ENDPOINT', '/api');
  // const getPractitionerTimeslots  = async () => {
  //     const response = await fetch(`${SERVER_API_ENDPOINT}/availabilities`);
  //     const parsedResponse = await response.json();
  //     console.log(parsedResponse)

  // }
  return (
    <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
      <label>Patients: </label>
      <select {...register('patients')}>
        {patientsData &&
          patientsData.map((item) => {
            return (
              <option
                key={item.id}
              >{`${item.firstName} ${item.lastName}`}</option>
            );
          })}
      </select>
      <label>Practitioners: </label>
      <select {...register('practitioners')}>
        {practitionersData &&
          practitionersData.map((item) => {
            return (
              <option
                key={item.id}
                value={item.id}
              >{`${item.firstName} ${item.lastName}`}</option>
            );
          })}
      </select>
      <input type="submit" />
    </form>
  );
};

export default AppointmentForm;
