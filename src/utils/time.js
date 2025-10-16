// Helper to compute a location-local time string (12-hour by default)
// Inputs:
// - data: current weather response (may contain timezone)
// - forecastData: forecast response (may contain city.timezone)
// The function always uses the real current time (Date.now) for the displayed
// clock and applies the location timezone offset returned by the API.
export function getDisplayTime({ data, forecastData, use12Hour = true } = {}) {
  const tzOffsetSeconds = forecastData?.city?.timezone ?? data?.timezone ?? 0
  const epochSeconds = Math.floor(Date.now() / 1000)
  const localMs = (epochSeconds + tzOffsetSeconds) * 1000
  const d = new Date(localMs)

  const hrs = d.getUTCHours()
  const mins = d.getUTCMinutes()

  const pad = (n) => String(n).padStart(2, '0')

  if (!use12Hour) {
    return `${pad(hrs)}:${pad(mins)}`
  }

  const period = hrs >= 12 ? 'PM' : 'AM'
  const hrs12 = hrs % 12 === 0 ? 12 : hrs % 12
  return `${hrs12}:${pad(mins)} ${period}`
}
