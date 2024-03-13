import { SyntheticEvent, useState } from 'react';
import { DiaryEntry, Visibility, Weather } from '../types';
import diaryService from '../services/diaryEntries';
import axios from 'axios';

const Add = ({
  entries,
  setEntries,
}: {
  entries: DiaryEntry[];
  setEntries: (entries: DiaryEntry[]) => void;
}) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('' as Visibility);
  const [weather, setWeather] = useState('' as Weather);
  const [comment, setComment] = useState('');
  const [errorMessage, setError] = useState<unknown>(null);

  const addDiary = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      const vCheck = Object.values(Visibility).find((v) => v.toString() === visibility);
      if (vCheck && comment !== '') {
        diaryService.create({ date, visibility, weather, comment }).then((data) => {
          setEntries(entries.concat(data));
        });
        setDate('');
        setVisibility('' as Visibility);
        setWeather('' as Weather);
        setComment('');
      } else if (!vCheck) {
        setError(`Error: Incorrect visibility: ${visibility}`);
      } else {
        setError(`Error: Comment field empty`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  };

  // const handleVisibility = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (typeof e.target.value === 'string') {
  //     const value = e.target.value;
  //     const visibility = Object.values(Visibility).find((v) => v.toString() === value);
  //     if (visibility) {
  //       console.log(visibility);
  //       setVisibility(visibility);
  //     }
  //   }
  // };

  // const handleVisibility = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setVisibility(e.target.value as Visibility);
  // };

  // const handleWeather = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   e.preventDefault();
  //   if (typeof e.target.value === 'string') {
  //     const value = e.target.value;
  //     const weather = Object.values(Weather).find((w) => w.toString() === value);
  //     if (weather) {
  //       setWeather(weather);
  //     }
  //   }
  // };

  return (
    <div>
      <h1>Add New Entry</h1>
      {typeof errorMessage === 'string' ? <div style={{ color: 'red' }}>{errorMessage}</div> : null}
      <form onSubmit={addDiary}>
        <div>
          date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          visibility
          {Object.values(Visibility).map((value) => (
            <div key={value}>
              <input
                type="radio"
                value={value}
                name="visibility"
                onChange={() => setVisibility(value)}
              />
              <label>{value}</label>
            </div>
          ))}
          {/* <input value={visibility} onChange={(e) => handleVisibility(e)} /> */}
        </div>
        <div>
          weather
          {Object.values(Weather).map((value) => (
            <div key={value}>
              <input type="radio" value={value} name="weather" onChange={() => setWeather(value)} />
              <label>{value}</label>
            </div>
          ))}
        </div>
        <div>
          comment
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button>add</button>
      </form>
    </div>
  );
};

export default Add;
