import patientData from '../../data/patients';
import { NoSsn, Patient } from '../types';

const patients: Patient[] = patientData as Patient[];

const getPatients = (): NoSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default getPatients;
