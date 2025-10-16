The following application is a weather application built using React.js and CSS it displays live weather forecasts for the current day and allows for the selection of any date within the next five days also using the OpenWeather API.

When setting up for the first time, an API key will be required directly from OpenWeather in order to do this sign into the following website:
https://home.openweathermap.org/users/sign_in

Once signed you will press subscribe on the 5 day/3 Hour Forecast Option.

After this go to your account and the API key will be present there. For security reasons the key should be added to a .env file with the following config REACT_APP_OPENWEATHER_API_KEY=''

Once the key has been added the weather app should function as intended.


To begin with simply enter any location into the app and then it will show the current forecast for that location. Once done if you would like to view an advanced forecast for that location simply select a date from the date picker. At the moment this is limited to just five days ahead due to it being a free-to-use API!

