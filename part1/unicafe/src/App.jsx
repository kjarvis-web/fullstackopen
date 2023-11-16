import { useState } from "react";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const allArr = [good, neutral, bad];
  const total = allArr.reduce((acc, curr) => acc + curr, 0);

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={() => setGood((x) => x + 1)} text="Good" />
      <Button handleClick={() => setNeutral((x) => x + 1)} text="Neutral" />
      <Button handleClick={() => setBad((x) => x + 1)} text="Bad" />

      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} total={total} />
      )}
    </div>
  );
}

function Statistics({ good, neutral, bad, total }) {
  return (
    <>
      <h1>statistics</h1>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="total" value={total} />
        <StatisticLine
          text="positive"
          value={good === 0 ? 0 : `${(good / total) * 100}%`}
        />
      </table>
    </>
  );
}

function StatisticLine({ text, value }) {
  return (
    <tr>
      <td>
        {text} {value}
      </td>
    </tr>
  );
}

function Button({ handleClick, text }) {
  return <button onClick={handleClick}>{text}</button>;
}

export default App;
