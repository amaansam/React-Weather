import React, {useState} from 'react' 
import axios from 'axios';

function App() {

  console.log('API key present?', !!process.env.REACT_APP_OPENWEATHER_API_KEY); // Console log to verify that API key is present.

  const [data, setData] = useState({}) /* State for setting data */
  const [location, setLocation] = useState('') /* State for location */
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY
  const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}` /*URL used in order to make the API call*/

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

  return (
    <div className="App">
        <div className="search">
          <input
            value={location}
            onChange = {event => setLocation(event.target.value)} /*event.target.value is the current text that gets stored in the location state */
            onKeyDown={searchLocation}
            placeholder='Enter Location'
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
