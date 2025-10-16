import React from 'react'
import WeatherIcon from './WeatherIcon.jsx'

// WeatherDisplay
// Component used to show the main weather summary: location name, temperature, and a short
export default function WeatherDisplay({ displayName, displayTemp, displayDesc, displayIcon, displayMain }) {
  return (
    <div>
      <div className="top">
        <div className="location">
          <p>{displayName}</p>
        </div>
        <div className="temp">
          {displayMain ? (
            <WeatherIcon type={displayMain} />
          ) : displayIcon ? (
            <img src={displayIcon} alt={displayDesc || 'weather icon'} className="weather-icon" />
          ) : null}
          {displayTemp !== undefined ? <h1>{displayTemp}°C</h1> : null}
        </div>
        <div className="description">
          {displayDesc ? <p>{displayDesc}</p> : null}
        </div>
      </div>
    </div>
  )
}
