import { SyntheticEvent, useState } from 'react';
import { DiaryFormValues, Visibility, Weather } from '../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: DiaryFormValues) => void;
}

const Add = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState(Visibility.Good);
  const [weather, setWeather] = useState(Weather.Cloudy);
  const [comment, setComment] = useState('');

  const addDiary = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit({ date, visibility, weather, comment });
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
          <input
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
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
