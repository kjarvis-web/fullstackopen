function App() {
  const course = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <Course course={course} />
    </div>
  );
}

function Course({ course }) {
  return (
    <div key={course.id}>
      {course.map((el) => (
        <>
          <Header key={el.id} name={el.name} />
          <Content key={el.parts.id} parts={el.parts} />
        </>
      ))}
      <Total key={3} course={course} />
    </div>
  );
}

function Header({ name }) {
  return <h1>{name}</h1>;
}

function Content({ parts }) {
  return (
    <div>
      <Part key={parts.id} parts={parts} />
    </div>
  );
}

function Part({ parts }) {
  return (
    <>
      {parts.map((x) => (
        <p key={x.id}>
          {x.name} {x.exercises}
        </p>
      ))}
    </>
  );
}

function Total({ course }) {
  const total = course.map((x) =>
    x.parts.reduce((acc, curr) => acc + curr.exercises, 0)
  );
  return (
    <p>
      <strong>
        Total of {total.reduce((acc, curr) => acc + curr)} exercises
      </strong>
    </p>
  );
}

export default App;
