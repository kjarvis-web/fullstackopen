import { useState } from "react";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState();

  const setToGood = (newValue) => setGood(newValue);
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood((x) => x + 1)}>Good</button>
      <button onClick={() => setNeutral((x) => x + 1)}>Neutral</button>
      <button onClick={() => setBad((x) => x + 1)}>Bad</button>

      <h1>statistics</h1>
      <div>
        {" "}
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>total {total}</p>
      </div>
    </div>
  );
}

export default App;
