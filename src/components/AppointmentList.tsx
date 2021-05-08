import EditorLink from './EditorLink';
import { useSelector } from 'react-redux';
import { practionersSelector } from 'store/practitioners';
import { patientsSelectors } from 'store/patients';
import { prettifyDate } from 'utils/date';
const AppointmentList = () => {
  const appointmentsData = useSelector((state) => state.appointments);
  const selectedPatient = useSelector((state) => state.appointments.patientId);
  const patientsEntities = useSelector((state) =>
    patientsSelectors.selectAll(state.patients),
  );
  const practionersEntities = useSelector((state) =>
    practionersSelector.selectAll(state.practitioners),
  );

  const getName = (entities, id) => {
    const filteredEntities = entities.filter((item) => item.id === id);
    return `${filteredEntities[0].firstName} ${filteredEntities[0].lastName}`;
  };
  return (
    <>
      <h3>{`Appointments for Patient:  ${getName(
        patientsEntities,
        selectedPatient,
      )}`}</h3>
      <table>
        <tr>
          <th>Practitioner</th>
          <th>Patient</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>

        {appointmentsData &&
          appointmentsData.appointments.map((item) => {
            return (
              <tr key={item.id}>
                <td>{getName(practionersEntities, item.practitionerId)}</td>
                <td>{getName(patientsEntities, item.patientId)}</td>
                <td>{prettifyDate(item.startDate)}</td>
                <td>{prettifyDate(item.endDate)}</td>
              </tr>
            );
          })}
      </table>
    </>
  );
};

export default AppointmentList;
