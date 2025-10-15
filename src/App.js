import React, { useState } from 'react'
import axios from 'axios';

function App() {

  console.log('API key present?', !!process.env.REACT_APP_OPENWEATHER_API_KEY); // Console log to verify that API key is present.

  const [data, setData] = useState({}) /* State for setting data */
  const [location, setLocation] = useState('') /* State for location */
  const [selectedDate, setSelectedDate] = useState(''); /* State for storing the selected date from the date picker */
  const [forecastData, setForecastData] = useState(null); /* Stores the 5-day/3 hour response */

  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY /* Uses API key that should be stored inside of .env file */
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}` /*URL used in order to make the API call*/

  /* Variable used to search for location, works on the basis of keyboard event
  Fetches the data via Axios and sets the response data
  */
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
      })
        .catch((error) => {
          console.log(error)
        })
      setLocation('')
    }
  }

  const toLocalISODate = (d) =>
    new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);

  const today = toLocalISODate(new Date());
  const fiveDaysAhead = toLocalISODate(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000));

  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)} /*event.target.value is the current text that gets stored in the location state */
          onKeyDown={searchLocation}
          placeholder='Enter Location'
        />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={today}
          max={fiveDaysAhead}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
        <div className="location"></div>
      </div>
    </div>
  );
}

export default App;
