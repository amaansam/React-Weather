import React, { useState } from 'react'
import axios from 'axios'
import Search from './components/Search.jsx'
import WeatherDisplay from './components/WeatherDisplay.jsx'
import WeatherDetails from './components/WeatherDetails.jsx'
import './index.css'

function App() {
  console.log('API key present?', !!process.env.REACT_APP_OPENWEATHER_API_KEY);

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [forecastData, setForecastData] = useState(null)

  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`

  const [error, setError] = useState('')
  const [dayForecast, setDayForecast] = useState(null)

  const onDateChange = async (e) => {
    const picked = e.target.value
    setSelectedDate(picked)
    setError('')

    if (!data?.name) {
      setError('Enter a location first')
      return
    }

    try {
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&units=metric&appid=${apiKey}`
      const res = await axios.get(forecastUrl)
      const allSlots = res.data.list || []
      const slotsForDay = allSlots.filter(s => picked && s.dt_txt.startsWith(picked))

      if (slotsForDay.length === 0) {
        setDayForecast(null)
        setError('No forecast available for this date (up to 5 days only).')
        return
      }

      const rep = slotsForDay.find(s => s.dt_txt.endsWith('12:00:00')) || slotsForDay[0]
      setDayForecast({ city: res.data.city.name, slot: rep })
    } catch (err) {
      setError('Could not load forecast. Please try again.')
    }
  }

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      if (!location.trim()) return
      try {
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`
        const [currentRes, forecastRes] = await Promise.all([
          axios.get(url),
          axios.get(forecastUrl)
        ])
        setData(currentRes.data)
        setForecastData(forecastRes.data)
        setLocation('')
      } catch (error) {
        console.log(error)
      }
    }
  }

  const toLocalISODate = (d) =>
    new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10)

  const today = toLocalISODate(new Date())
  const fiveDaysAhead = toLocalISODate(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000))

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
