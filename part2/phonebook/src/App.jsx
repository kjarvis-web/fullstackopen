import { useEffect, useState } from "react";
import axios from "axios";
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

      personService.create(personObj).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setAdded(true);
        setNotification(`${returnedPerson.name} has been added`);
        setTimeout(() => {
          setAdded(false);
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
      .catch((error) => console.log("fail"));
  }, []);

  console.log("render", persons.length, "persons");

  //exercises 2.6-2.10
  return (
    <div>
      <h2>Phonebook</h2>
      {added && <Notification message={notification} />}
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
  return (
    <div>
      {search === ""
        ? persons.map((x, i) => (
            <div key={i}>
              {i + 1}. {x.name} {x.number}{" "}
              <button onClick={() => handleDelete(x.id)}>delete</button>
            </div>
          ))
        : persons
            .filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((x, i) => (
              <div key={i}>
                {i + 1}. {x.name} {x.number} <button>delete</button>
              </div>
            ))}
    </div>
  );
}

function Filter({ search, setSearch }) {
  return (
    <div>
      search:{" "}
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  );
}

function Notification({ message }) {
  const styles = {
    color: "green",
    fontSize: 55,
  };

  if (message === null) return null;

  return (
    <div style={styles} className="notification">
      {message}
    </div>
  );
}
