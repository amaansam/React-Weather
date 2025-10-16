import React from 'react'

// Simple inline SVGs for common weather types. Covers clear, cloud, rain, snow, thunderstorm, and mist/fog/haze.
export default function WeatherIcon({ type }) {
  const t = (type || '').toLowerCase()

  if (t.includes('clear')) {
    // sun
    return (
      <svg className="weather-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="12" fill="#FFD166" />
        <g stroke="#FFD166" strokeWidth="3">
          <line x1="32" y1="4" x2="32" y2="14" />
          <line x1="32" y1="50" x2="32" y2="60" />
          <line x1="4" y1="32" x2="14" y2="32" />
          <line x1="50" y1="32" x2="60" y2="32" />
          <line x1="10" y1="10" x2="18" y2="18" />
          <line x1="46" y1="46" x2="54" y2="54" />
          <line x1="10" y1="54" x2="18" y2="46" />
          <line x1="46" y1="18" x2="54" y2="10" />
        </g>
      </svg>
    )
  }

  if (t.includes('cloud')) {
    // cloud
    return (
      <svg className="weather-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 40h28a8 8 0 0 0 0-16 12 12 0 0 0-23-4A9 9 0 0 0 8 35a6 6 0 0 0 1 5 7 7 0 0 0 11-0z" fill="#E6EEF4" stroke="#BFC9D6" strokeWidth="1.5" />
      </svg>
    )
  }

  if (t.includes('rain') || t.includes('drizzle')) {
    // rain
    return (
      <svg className="weather-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 30h28a8 8 0 0 0 0-16 12 12 0 0 0-23-4A9 9 0 0 0 8 25a6 6 0 0 0 1 5 7 7 0 0 0 11-0z" fill="#E6EEF4" stroke="#BFC9D6" strokeWidth="1.5" />
        <g stroke="#6DA9E4" strokeWidth="2" strokeLinecap="round">
          <line x1="22" y1="40" x2="22" y2="50" />
          <line x1="30" y1="40" x2="30" y2="52" />
          <line x1="38" y1="40" x2="38" y2="50" />
          <line x1="46" y1="40" x2="46" y2="52" />
        </g>
      </svg>
    )
  }

  if (t.includes('snow')) {
    // snow
    return (
      <svg className="weather-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 30h28a8 8 0 0 0 0-16 12 12 0 0 0-23-4A9 9 0 0 0 8 25a6 6 0 0 0 1 5 7 7 0 0 0 11-0z" fill="#E6EEF4" stroke="#BFC9D6" strokeWidth="1.5" />
        <g stroke="#9FCBFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="22" cy="44" r="2" fill="#9FCBFF" />
          <circle cx="30" cy="48" r="2" fill="#9FCBFF" />
          <circle cx="38" cy="44" r="2" fill="#9FCBFF" />
          <circle cx="46" cy="48" r="2" fill="#9FCBFF" />
        </g>
      </svg>
    )
  }

  if (t.includes('thunder')) {
    // thunderstorm
    return (
      <svg className="weather-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 30h28a8 8 0 0 0 0-16 12 12 0 0 0-23-4A9 9 0 0 0 8 25a6 6 0 0 0 1 5 7 7 0 0 0 11-0z" fill="#E6EEF4" stroke="#BFC9D6" strokeWidth="1.5" />
        <path d="M34 40l-6 10h8l-2 8 10-14h-8z" fill="#FFD166" stroke="#FFB84D" strokeWidth="1" />
      </svg>
    )
  }

  // mist/haze/fog/dust etc
  if (['mist', 'haze', 'fog', 'smoke', 'dust', 'sand', 'ash'].some(k => t.includes(k))) {
    return (
      <svg className="weather-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 30h32" stroke="#C9D3DA" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 36h36" stroke="#C9D3DA" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 42h32" stroke="#C9D3DA" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  // default icon (unknown)
  return (
    <svg className="weather-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="12" fill="#BFC9D6" />
    </svg>
  )
}
