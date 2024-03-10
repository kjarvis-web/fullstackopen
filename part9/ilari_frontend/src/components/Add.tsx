import * as React from 'react';
import { SyntheticEvent, useState } from 'react';
import { DiaryFormValues, Visibility, Weather } from '../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: DiaryFormValues) => void;
}

const Add = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState(Weather.Cloudy);
  const [comment, setComment] = useState('');

  const addDiary = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit({ date, visibility, weather, comment });
  };

  const handleVisibility = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    if (typeof e.target.value === 'string') {
      const value = e.target.value;
      const visibility = Object.values(Visibility).find(
        (v) => v.toString() === value
      );
      if (visibility) {
        setVisibility(visibility);
      }
    }
  };

  return (
    <div>
      <h1>Add New Entry</h1>
      <form>
        <div>
          date
          <input value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          visibility
          <select value={visibility} onChange={handleVisibility}>
            {Object.values(Visibility).map((value) => (
              <option value={value}>{value}</option>
            ))}
          </select>
        </div>
        <div>
          weather
          <input value={weather} onChange={(e) => setWeather(e.target.value)} />
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
