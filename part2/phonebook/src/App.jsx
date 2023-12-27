import { useEffect, useState } from "react";
import personService from "./services/persons";

// const promise = axios.get("http://localhost:3001/persons");
// console.log(promise);

// const promise2 = axios.get("http://localhost:3001/foobar");
// console.log(promise2);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState("");
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const findNameDuplicate = persons.find((item) => item.name === newName);
    const personObj = { name: newName, number: newNumber };
    if (findNameDuplicate) {
      if (
        confirm(
          `${newName} has already been added to the phonebook. Replace the old number with a new one?`
        )
      ) {
        personService
          .update(findNameDuplicate.id, personObj)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== findNameDuplicate.id ? person : returnedPerson
              )
            );
          })
          .catch((error) => {
            alert(error, `something`);
            setError(true);
            setNotification(error.message);
            setTimeout(() => {
              setError(false);
            }, 5000);
          });
      }
    } else {
      // axios
      //   .post("http://localhost:3001/persons", personObj)
      //   .then((response) => {
      //     console.log("post", response);
      //     setPersons(persons.concat(response.data));
      //   });
      // setPersons((prev) => [...prev, { name: newName, number: newNumber }]);

      personService
        .create(personObj)
        .then((returnedPerson) => {
          console.log(returnedPerson);
          setPersons(persons.concat(personObj));
          setAdded(true);
          setNotification(`${personObj.name} has been added`);
          setTimeout(() => {
            setAdded(false);
          }, 5000);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setError(true);
          setNotification(`${error.response.data.error}`);
          setTimeout(() => {
            setError(false);
          }, 5000);
        });

      setNewName("");
      setNewNumber("");
    }
  }

  useEffect(() => {
    console.log("effect");
    // axios.get("http://localhost:3001/persons").then((response) => {
    //   console.log("promise fulfilled");
    //   setPersons(response.data);
    // });

    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => console.log(error, "fail"));
  }, []);

  //exercises 2.6-2.10
  return (
    <div>
      <h2>Phonebook</h2>
      {added && <Notification added={added} message={notification} />}
      {error && <Notification added={added} message={notification} />}
      <Filter search={search} setSearch={setSearch} />
      <h2>add a new</h2>
      <Form
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons search={search} persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;

function Form({ newName, setNewName, newNumber, setNewNumber, handleSubmit }) {
  return (
    <form>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSubmit} type="submit">
          add
        </button>
      </div>
    </form>
  );
}

function Persons({ search, persons, setPersons }) {
  function handleDelete(id) {
    const name = persons.find((x) => x.id === id).name;
    if (confirm(`Delete ${name}?`)) {
      setPersons((prev) => prev.filter((x) => x.id !== id));
      personService.remove(id);
    } else null;
  }
  return search.length < 1
    ? persons.map((x, i) => (
        <div key={i}>
          {i + 1}. {x.name} {x.number}{" "}
          <button onClick={() => handleDelete(x.id)}>delete</button>
        </div>
      ))
    : persons
        .filter((x) => x.name.toLowerCase().includes(search.toLowerCase()))
        .map((x, i) => (
          <div key={i}>
            {i + 1}. {x.name} {x.number} <button>delete</button>
          </div>
        ));
}

// countries.filter((x) =>
// x.name.common.toLowerCase().includes(search.toLowerCase())
// );

function Filter({ search, setSearch }) {
  return (
    <div>
      search:{" "}
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  );
}

function Notification({ added, message }) {
  const stylesAdded = {
    color: "green",
    fontSize: 32,
    border: "green solid 4px",
    marginBottom: 16,
    borderRadius: "5px",
    background: "silver",
    padding: 4,
  };

  const stylesError = {
    color: "red",
    fontSize: 32,
    border: "red solid 4px",
    marginBottom: 16,
    borderRadius: "5px",
    background: "silver",
    padding: 4,
  };

  if (message === null) return null;

  return (
    <div style={added ? stylesAdded : stylesError} className="notification">
      {message}
    </div>
  );
}
