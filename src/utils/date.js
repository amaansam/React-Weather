export const toLocalISODate = (d) =>
  new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10)

export const getTodayAndFiveDaysAhead = () => {
  const today = toLocalISODate(new Date())
  const fiveDaysAhead = toLocalISODate(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000))
  return { today, fiveDaysAhead }
}
