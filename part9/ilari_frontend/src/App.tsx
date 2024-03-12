import { useState } from 'react';
import Add from './components/Add';
import DiaryEntries from './components/DiaryEntries';
import { DiaryEntry } from './types';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  return (
    <>
      <Add entries={entries} setEntries={setEntries} />
      <DiaryEntries entries={entries} setEntries={setEntries} />
    </>
  );
}

export default App;
