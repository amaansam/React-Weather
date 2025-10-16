import React, { useState } from 'react'
import Search from './components/Search.jsx'
import WeatherDisplay from './components/WeatherDisplay.jsx'
import WeatherDetails from './components/WeatherDetails.jsx'
import './index.css'

// Helpers
// Uses helpers functions to call the OpenWeather endpoints and to compute
// the date range (today -> five days ahead) used by the date picker.
import { getCurrentWeather, getForecast } from './api/openWeather'
import { getTodayAndFiveDaysAhead } from './utils/date'


function App() {
  // Log to check if API key is present or not
  console.log('API key present?', !!process.env.REACT_APP_OPENWEATHER_API_KEY)

  // States
  // I keep the current weather in `data`, the typed search in `location`,
  // the date picker value in `selectedDate`, and forecast-related data below.
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [forecastData, setForecastData] = useState(null)
  const [error, setError] = useState('')
  const [dayForecast, setDayForecast] = useState(null)

  // Config to access the API key from environment variable
  //Reads the API key once and passes it to the helper functions.
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY

  // Restricts the date picker to the 5-day forecast window.
  const { today, fiveDaysAhead } = getTodayAndFiveDaysAhead()

  // Handler for when a date is picked from the date picker.
  // It loads the forecast for the chosen date (if a location is present).
  const onDateChange = async (e) => {
    const picked = e.target.value
    setSelectedDate(picked)
    setError('')

    if (!data?.name) {
      setError('Enter a location first')
      return
    }

    try {
      const res = await getForecast(data.name, apiKey)
      const allSlots = res.list || []
      const slotsForDay = allSlots.filter((s) => picked && s.dt_txt.startsWith(picked))

      if (slotsForDay.length === 0) {
        setDayForecast(null)
        setError('No forecast available for this date (up to 5 days only).')
        return
      }

      const rep = slotsForDay.find((s) => s.dt_txt.endsWith('12:00:00')) || slotsForDay[0]
      setDayForecast({ city: res.city.name, slot: rep })
    } catch (err) {
      setError('Could not load forecast. Please try again.')
    }
  }

  /*
   * searchLocation
   * - On Enter it loads the current weather
   * - Fetches both current weather and the 5-day forecast in parallel.
   */
  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      if (!location.trim()) return
      try {
        const [currentRes, forecastRes] = await Promise.all([
          getCurrentWeather(location, apiKey),
          getForecast(location, apiKey)
        ])
        setData(currentRes)
        setForecastData(forecastRes)
        setLocation('')
      } catch (error) {
        console.log(error)
      }
    }
  }

  // Display values for the UI
  const showForecast = !!selectedDate && !!dayForecast

  const displayName = showForecast ? dayForecast.city : data?.name
  const displayTemp = showForecast
    ? Math.round(dayForecast.slot.main.temp)
    : data.main && Math.round(data.main.temp)
  const displayDesc = showForecast
    ? dayForecast.slot.weather?.[0]?.main
    : data.weather && data.weather[0].main

  const displayFeels = showForecast
    ? Math.round(dayForecast.slot.main.feels_like)
    : data.main && Math.round(data.main.feels_like)
  const displayHumidity = showForecast
    ? dayForecast.slot.main.humidity
    : data.main && data.main.humidity
  const displayWind = showForecast
    ? dayForecast.slot.wind?.speed
    : data.wind && data.wind.speed

  // Choose icon code from forecast slot (when showing forecast) or current data
  const iconCode = showForecast
    ? dayForecast.slot.weather?.[0]?.icon
    : data.weather && data.weather[0]?.icon

  const displayIcon = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : null

  // Use the weather "main" (Clouds, Rain, Clear...) so we can map to local SVGs
  const displayMain = showForecast
    ? dayForecast.slot.weather?.[0]?.main
    : data.weather && data.weather[0]?.main

  // Displays the search + main container with display and details.
  return (
    <div className="App">
      <div className="search">
        <Search
          location={location}
          setLocation={setLocation}
          onKeyDown={searchLocation}
          selectedDate={selectedDate}
          onDateChange={onDateChange}
          disabled={!data?.name}
          today={today}
          fiveDaysAhead={fiveDaysAhead}
          error={error}
        />
      </div>

      <div className="container">
        <WeatherDisplay
          displayName={displayName}
          displayTemp={displayTemp}
          displayDesc={displayDesc}
          displayIcon={displayIcon}
          displayMain={displayMain}
        />

        {data.name !== undefined && (
          <WeatherDetails
            displayFeels={displayFeels}
            displayHumidity={displayHumidity}
            displayWind={displayWind}
          />
        )}

        <div className="location"></div>
      </div>
    </div>
  )
}

export default App
