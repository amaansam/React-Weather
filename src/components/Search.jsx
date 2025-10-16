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
    <>
      <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder='Enter Location'
      />
      <input
        type="date"
        value={selectedDate}
        onChange={onDateChange}
        disabled={disabled}
        min={today}
        max={fiveDaysAhead}
      />
      {error && <p style={{ marginTop: 8 }}>{error}</p>}
    </>
  )
}
