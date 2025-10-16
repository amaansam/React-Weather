import React from 'react'

// Search component
// This component is sed to show the location text input and the date picker.
// - location / setLocation: controlled text input for the city name
// - onKeyDown: handler for Enter to trigger search
// - selectedDate / onDateChange: controlled date input for forecast selection
// - disabled: disables the date input when no location is set
// - today / fiveDaysAhead: min/max for the date picker
// - error: optional error message to show below inputs
export default function Search({
  location,
  setLocation,
  onKeyDown,
  selectedDate,
  onDateChange,
  disabled,
  today,
  fiveDaysAhead,
  error
}) {
  return (
    <div className="search-controls">
      <div className="inputs-row">
        <input
          className="location-input"
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder='Enter Location'
          aria-label="Location"
        />

        <div className="date-container">
          <div className="date-label">Date Picker</div>
          <div className="date-controls">
            <input
              className="date-input"
              type="date"
              value={selectedDate}
              onChange={onDateChange}
              disabled={disabled}
              min={today}
              max={fiveDaysAhead}
              aria-label="Forecast date"
            />
            <div className="date-help" aria-hidden={false}>
              <button className="info" aria-label="Date help" type="button">i</button>
              <span className="sr-only">Pick a date within the 5-day forecast. Enter a location first and press Enter to load current weather.</span>
              <span className="tooltip">Pick a date within the 5-day forecast. Enter a location first and press Enter to load current weather.</span>
            </div>
          </div>
        </div>
      </div>

      {error && <p style={{ marginTop: 8 }}>{error}</p>}

    </div>
  )
}
