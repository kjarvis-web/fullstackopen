import { useEffect } from 'react';
import diaryService from '../services/diaryEntries';
import { DiaryEntry } from '../types';

const DiaryEntries = ({
  entries,
  setEntries,
}: {
  entries: DiaryEntry[];
  setEntries: (entries: DiaryEntry[]) => void;
}) => {
  useEffect(() => {
    const fetch = async () => {
      try {
        diaryService.getAll().then((data) => {
          setEntries(data);
        });
      } catch (error) {
        console.log('diary entry', error);
      }
    };
    fetch();
  }, [setEntries]);

  return (
    <div>
      <h1>Diary Entries</h1>

      {entries.map((d: DiaryEntry) => (
        <div key={d.id}>
          <h3>{d.date}</h3>
          <div>visibility: {d.visibility}</div>
          <div>weather: {d.weather}</div>
          {/* <div>comment: {d.comment}</div> */}
        </div>
      ))}
    </div>
  );
};

export default DiaryEntries;
