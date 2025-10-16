import axios from 'axios'

const BASE = 'https://api.openweathermap.org/data/2.5'

export async function getCurrentWeather(q, apiKey) {
  const url = `${BASE}/weather?q=${encodeURIComponent(q)}&units=metric&appid=${apiKey}`
  const res = await axios.get(url)
  return res.data
}

export async function getForecast(q, apiKey) {
  const url = `${BASE}/forecast?q=${encodeURIComponent(q)}&units=metric&appid=${apiKey}`
  const res = await axios.get(url)
  return res.data
}
