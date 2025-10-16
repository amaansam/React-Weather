import React from 'react'

// WeatherDetails
// Component used to render three small stats: feels-like temp, humidity, and wind speed.
export default function WeatherDetails({ displayFeels, displayHumidity, displayWind }) {
  return (
    <div className="bottom">
      <div className="feels">
        {displayFeels !== undefined ? <p className='bold'>{displayFeels}°C</p> : null}
        <p>Feels Like</p>
      </div>
      <div className="humidity">
        {displayHumidity !== undefined ? <p className='bold'>{displayHumidity}%</p> : null}
        <p>Humidity</p>
      </div>
      <div className="wind">
        {displayWind !== undefined ? <p className='bold'>{displayWind} MPH</p> : null}
        <p>Wind Speed</p>
      </div>
    </div>
  )
}
