import patientData from '../../data/patients';
import { NewPatient, NoSsn, Patient } from '../types';
import { v1 as uuid } from 'uuid';

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

const addPatient = (entry: NewPatient): NewPatient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient };
