import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const findNameDuplicate = persons.find((item) => item.name === newName);
    if (findNameDuplicate) {
      alert(`${newName} has already been added to the phonebook.`);
    } else {
      setPersons((prev) => [...prev, { name: newName, number: newNumber }]);
      setNewName("");
      setNewNumber("");
    }
  }
  //exercises 2.6-2.10
  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons search={search} persons={persons} />
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

function Persons({ search, persons }) {
  return (
    <div>
      {search === ""
        ? persons.map((x, i) => (
            <div key={i}>
              {i + 1}. {x.name} {x.number}
            </div>
          ))
        : persons
            .filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((x, i) => (
              <div key={i}>
                {i + 1}. {x.name} {x.number}
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
