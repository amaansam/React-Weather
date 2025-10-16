# React-Weather

A small React app that shows the current weather and a selectable 5-day forecast for a location using the OpenWeather API. The UI includes a search box, a date picker (limited to the next 5 days), local SVG icons for weather conditions, and a compact tooltip describing the workflow.

## Features
- Search for a location (type and press Enter) to load current weather
- Optional 5-day forecast via the date picker (select after loading a location)
- Local SVG icons mapped to common weather conditions (Clear, Clouds, Rain, Snow, Thunderstorm, Fog/Mist)
- Tooltip helper next to the date picker that explains the workflow
- Simple responsive styling (CSS)

## Getting started

Prerequisites
- Node.js (16+ recommended)
- npm or yarn

Install

```bash
npm install
```

Environment

This app requires an OpenWeather API key. Create a `.env` file in the project root and add:

```env
REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
```

How to get an API key
1. Sign in or register at: https://home.openweathermap.org/users/sign_in
2. Subscribe to the "5 day / 3 hour forecast" option (free tier available)
3. Copy your API key from your account and add it to the `.env` file above

Run (development)

```bash
npm start
```

Build (production)

```bash
npm run build
```

## Usage

1. Enter a location in the search box and press Enter — the app will load the current weather for that location.
2. Optionally, select a date using the date picker to view the forecast for a chosen day (limited to 5 days ahead).
3. The bottom card displays additional stats: "Feels Like", "Humidity", "Wind Speed" (and optionally local time if enabled).

## Project structure (important files)

- `src/App.jsx` — main app
- `src/components/Search.jsx` — search + date picker UI (includes tooltip)
- `src/components/WeatherDisplay.jsx` — main display (name, icon, temperature, description)
- `src/components/WeatherDetails.jsx` — feels like, humidity, wind (and optional local time)
- `src/components/WeatherIcon.jsx` — local inline SVG icon mapping for conditions
- `src/api/openWeather.js` — helper functions for OpenWeather API calls
- `src/utils/date.js` — date helpers used to compute today and fiveDaysAhead
- `src/index.css` — app styling

## Implementation notes

- Date picker limit: The free OpenWeather 5-day forecast returns data in 3-hour slots for the next 5 days — the date picker enforces that range using `src/utils/date.js`.
- Icons: The app maps `weather[0].main` to local inline SVG icons (`WeatherIcon.jsx`). It also falls back to OpenWeather PNG icons when available.
