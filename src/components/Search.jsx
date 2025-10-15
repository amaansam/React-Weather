import React from 'react'

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
