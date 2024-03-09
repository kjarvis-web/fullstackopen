import * as React from 'react';
import { useEffect, useState } from 'react';
import diaryService from '../services/diaryEntries';
import { DiaryEntry } from '../types';

const DiaryEntries = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        diaryService.getAll().then((data) => {
          setEntries(data);
          console.log(entries);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  return (
    <div>
      <h1>Diary Entries</h1>
      {entries.map((d: DiaryEntry) => (
        <div key={d.id}>
          <h3>{d.date}</h3>
          <div>visibility: {d.visibility}</div>
          <div>weather: {d.weather}</div>
        </div>
      ))}
    </div>
  );
};

export default DiaryEntries;
