function App() {
  const course = "Half Stack application development";
  const part1 = { name: "Fundamentals of React", exercises: 10 };
  const part2 = { name: "Using props to pass data", exercises: 7 };
  const part3 = { name: "State of a component", exercises: 14 };
  const parts = [part1, part2, part3];
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
}

function Header({ course }) {
  return <h1>{course}</h1>;
}

function Content({ parts }) {
  return (
    <>
      {parts.map((x, index) => (
        <p key={index}>
          {x.name} {x.exercises}
        </p>
      ))}
    </>
  );
}

function Total({ parts }) {
  return (
    <p>
      Number of exercises {parts.reduce((acc, curr) => acc + curr.exercises, 0)}
    </p>
  );
}

export default App;
