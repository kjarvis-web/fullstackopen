import axios from 'axios';
import { DiaryEntry } from '../types';

const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(
    'http://localhost:3000/api/diaries'
  );

  return data;
};

export default { getAll };
