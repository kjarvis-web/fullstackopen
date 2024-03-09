import axios from 'axios';
import { DiaryEntry, DiaryFormValues } from '../types';

const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(
    'http://localhost:3000/api/diaries'
  );

  return data;
};

const create = async (object: DiaryFormValues) => {
  const { data } = await axios.post<DiaryEntry>(
    'http://localhost:3000/api/diaries',
    object
  );

  return data;
};

export default { getAll, create };
