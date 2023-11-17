import { useState } from "react";

function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(() =>
    Array.from({ length: anecdotes.length }, (_, index) => ({
      id: index,
      anecdote: anecdotes[index],
      votes: 0,
    }))
  );

  function handleVote() {
    setVote((prev) =>
      prev.map((item) =>
        item.id === selected ? { ...item, votes: item.votes + 1 } : item
      )
    );
  }

  function handleSelected() {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  return (
    <div>
      <Anecdote anecdotes={anecdotes} selected={selected} vote={vote} />
      <Button handleClick={handleSelected} text="next anecdote" />
      <Button handleClick={handleVote} text="vote" />
      <MostVotes vote={vote} anecdotes={anecdotes} />
    </div>
  );
}

function Anecdote({ anecdotes, selected, vote }) {
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>
        <span>votes </span>
        {vote.find((item) => item.id === selected && item).votes}
      </p>
    </>
  );
}

function Button({ handleClick, text }) {
  return <button onClick={handleClick}>{text}</button>;
}

function MostVotes({ vote, anecdotes }) {
  const mostVotes = vote.reduce((acc, curr) =>
    acc.votes > curr.votes ? acc : curr
  );

  return (
    <>
      <h1>Anecdote with the most votes</h1>
      <p>
        {anecdotes[mostVotes.id]} votes: {vote[mostVotes.id].votes}
      </p>
    </>
  );
}

export default App;
