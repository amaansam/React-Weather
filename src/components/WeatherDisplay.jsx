import React from 'react'

// WeatherDisplay
// Component used to show the main weather summary: location name, temperature, and a short
export default function WeatherDisplay({ displayName, displayTemp, displayDesc }) {
  return (
    <div>
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
    </div>
  )
}
