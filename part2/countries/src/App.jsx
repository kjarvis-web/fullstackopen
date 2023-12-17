import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  return (
    <>
      <Search
        search={search}
        setSearch={setSearch}
        setCountries={setCountries}
      />
      <RenderCountries
        search={search}
        countries={countries}
        setCountries={setCountries}
      />
    </>
  );
}

function Search({ search, setSearch }) {
  return (
    <div>
      <label>Find countries: </label>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

function RenderCountries({ search, countries, setCountries }) {
  const [showCountry, setShowCountry] = useState(null);
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        console.log(response.data, "promise fulfilled");
        setCountries(response.data);
      });
  }, [setCountries]);

  useEffect(() => {
    setShowCountry(null);
  }, [search]);

  const filter = countries.filter((x) =>
    x.name.common.toLowerCase().includes(search.toLowerCase())
  );
  return search === "" ? (
    <div>
      {/* {countries.map((x, i) => (
        <div key={i}>{x.name.common}</div>
      ))} */}
      type in a country to search...
    </div>
  ) : filter.length > 10 ? (
    <div>too many matches, specify another filter</div>
  ) : filter.length > 1 ? (
    filter.map((x, i) => (
      <div key={i}>
        {x.name.common}
        <button onClick={() => setShowCountry(i)}>show</button>
        {showCountry === i && (
          <div>
            <h1>{x.name.common}</h1>
            <div>capital: {x.capital}</div>
            <div>area: {x.area}</div>
            <div>
              <strong>languages:</strong>
              <ul>
                {Object.values(x.languages).map((y, i) => (
                  <li key={i}>{y}</li>
                ))}
              </ul>
            </div>
            <img src={x.flags.png} />
          </div>
        )}
      </div>
    ))
  ) : (
    <CountryWrapper filter={filter} />
  );
}

function CountryWrapper({ filter }) {
  return (
    <div>
      {filter.map((x, i) => (
        <div key={i}>
          <h1>{x.name.common}</h1>
          <div>capital: {x.capital}</div>
          <div>area: {x.area}</div>
          <div>
            <strong>languages:</strong>
            <ul>
              {Object.values(x.languages).map((y, i) => (
                <li key={i}>{y}</li>
              ))}
            </ul>
          </div>
          <img src={x.flags.png} />
          <Weather city={x.capital} />
        </div>
      ))}
    </div>
  );
}

function Weather({ city }) {
  const [weather, setWeather] = useState(null);
  const url =
    "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
  const key = import.meta.env.VITE_KEY;
  useEffect(() => {
    axios.get(`${url}${city}&appid=${key}`).then((response) => {
      setWeather(response.data);
    });
  }, [city, key]);

  if (!weather) return null;
  return (
    <div>
      <h2>Weather in {city}</h2>
      <div>temperature: {weather.main.temp} Fahrenheit</div>
      <div>wind: {weather.wind.speed} mph</div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather.map(
          (x) => x.icon
        )}@2x.png`}
      />
      <div>{weather.weather.map((x) => x.description)}</div>
    </div>
  );
}

export default App;
