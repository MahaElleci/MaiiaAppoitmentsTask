import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import config from 'config';

const SERVER_API_ENDPOINT = config.get('SERVER_API_ENDPOING', '/api');
const AppointmentForm = ({ patientsData, practitionersData }) => {
  const { register, handleSubmit, watch } = useForm();
  const { practitionerId } = watch();
  const [availabilities, setAvailabilities] = useState([]);
  const dispatch = useDispatch();

  const getAvailabilities = async (id) => {
    const response = await fetch(
      `${SERVER_API_ENDPOINT}/availabilities?practitionerId=${id}`,
    );
    const parsedResponse = await response.json();
    setAvailabilities(parsedResponse);
  };
  const formatDate = (date) => {
    const splitFormDate = date.split('T');
    const formattedDate = `Day: ${splitFormDate[0]}, Time: ${splitFormDate[1]}`;
    return formattedDate;
  };
  const onSubmit = async (data) => {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(data),
    };
    fetch(`${SERVER_API_ENDPOINT}/appointments`, requestOptions)
      .then((response) => response.json())
      .then(async (data) => {
        const res = await fetch(
          `${SERVER_API_ENDPOINT}/appointments/?patientId=${data.patientId}`,
        );
        const parsedResponse = await res.json();
        dispatch({
          type: 'set_appointments',
          payload: { list: parsedResponse, patientId: data.patientId },
        });
      });
  };
  useEffect(() => {
    if (availabilities.length === 0 && practitionerId) {
      getAvailabilities(practitionerId);
    }
  }, [practitionerId, availabilities]);

  return (
    <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <InputLabel>Patients: </InputLabel>
        <Select
          inputProps={{
            inputRef: (ref) => {
              if (!ref) return;
            },
          }}
          {...register('patientId')}
        >
          {patientsData &&
            patientsData.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {`${item.firstName} ${item.lastName}`}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Practitioners: </InputLabel>
        <Select
          inputProps={{
            inputRef: (ref) => {
              if (!ref) return;
            },
          }}
          {...register('practitionerId')}
        >
          {practitionersData &&
            practitionersData.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {`${item.firstName} ${item.lastName}`}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {availabilities.length > 0 && (
        <>
          <InputLabel disableAnimation={false} htmlFor="startDate">
            Select an appointment:
          </InputLabel>
          <FormControl>
            <InputLabel disableAnimation={false} htmlFor="startDate">
              Start Date:{' '}
            </InputLabel>
            <Select
              inputProps={{
                inputRef: (ref) => {
                  if (!ref) return;
                },
              }}
              {...register('startDate')}
            >
              {availabilities &&
                availabilities.map((item) => (
                  <MenuItem key={item.id} value={item.startDate}>
                    {formatDate(item.startDate)}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel disableAnimation={false} htmlFor="startDate">
              End Date:{' '}
            </InputLabel>
            <Select
              inputProps={{
                inputRef: (ref) => {
                  if (!ref) return;
                },
              }}
              {...register('endDate')}
            >
              {availabilities &&
                availabilities.map((item) => (
                  <MenuItem key={item.id} value={item.endDate}>
                    {formatDate(item.endDate)}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </>
      )}
      <input type="submit" />
    </form>
  );
};

export default AppointmentForm;
