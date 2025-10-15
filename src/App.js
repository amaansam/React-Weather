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

  const [error, setError] = useState('');
  const [dayForecast, setDayForecast] = useState(null);

  const onDateChange = async (e) => {
    const picked = e.target.value;
    setSelectedDate(picked);
    setError('');

    if (!data?.name) {           // no location fetched yet
      setError('Enter a location first');
      return;
    }

    try {
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&units=metric&appid=${apiKey}`;
      const res = await axios.get(forecastUrl);
      const allSlots = res.data.list || [];
      const slotsForDay = allSlots.filter(s => picked && s.dt_txt.startsWith(picked));

      if (slotsForDay.length === 0) {
        setDayForecast(null);
        setError('No forecast available for this date (up to 5 days only).');
        return;
      }

      // representative noon slot or first available
      const rep = slotsForDay.find(s => s.dt_txt.endsWith('12:00:00')) || slotsForDay[0];
      setDayForecast({ city: res.data.city.name, slot: rep });
    } catch (err) {
      setError('Could not load forecast. Please try again.')
    }
  }

  /* Variable used to search for location, works on the basis of keyboard event
  Fetches the data via Axios and sets the response data
  */
  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      if (!location.trim()) return;
      try {
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;
        const [currentRes, forecastRes] = await Promise.all([
          axios.get(url),
          axios.get(forecastUrl)
        ]);
        setData(currentRes.data);
        setForecastData(forecastRes.data); // has .list (40 slots) and .city
        setLocation('')
      } catch (error) {
        console.log(error)
      }
    }
  }

  const toLocalISODate = (d) =>
    new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);

  const today = toLocalISODate(new Date());
  const fiveDaysAhead = toLocalISODate(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000));


  const showForecast = !!selectedDate && !!dayForecast;

  const displayName = showForecast ? dayForecast.city : data?.name;
  const displayTemp = showForecast
    ? Math.round(dayForecast.slot.main.temp)
    : data.main && Math.round(data.main.temp);
  const displayDesc = showForecast
    ? dayForecast.slot.weather?.[0]?.main
    : data.weather && data.weather[0].main;

  const displayFeels = showForecast
    ? Math.round(dayForecast.slot.main.feels_like)
    : data.main && Math.round(data.main.feels_like);
  const displayHumidity = showForecast
    ? dayForecast.slot.main.humidity
    : data.main && data.main.humidity;
  const displayWind = showForecast
    ? dayForecast.slot.wind?.speed
    : data.wind && data.wind.speed;

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
          onChange={onDateChange}
          disabled={!data?.name}
          min={today}
          max={fiveDaysAhead}
        />
        {error && <p style={{ marginTop: 8 }}>{error}</p>}

      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{displayName}</p>
          </div>
          <div className="temp">
            {displayTemp !== undefined ? <h1>{displayTemp}°C</h1> : null}
          </div>
          <div className="description">
            {displayDesc ? <p>{displayDesc}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {displayFeels !==undefined ? <p className='bold'>{displayFeels}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {displayHumidity !==undefined ? <p className='bold'>{displayHumidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {displayWind !==undefined ? <p className='bold'>{displayWind} MPH</p> : null}
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
