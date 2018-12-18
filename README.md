This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is my weather web application. It is still in process and has a lot of work to go.

Currently it locates the user using the navigator/geolocation feature built into browsers. It then sends the lat/long to a geocoding 
api that it translates into city/state that it can display in the app. It then sends the lat/long to the darksky api that sends back 
all the weather information. Right now it only displays the current weather.

It was built in React and I am in the process of converting the state over to react/redux for state management.

Planned features: 
- Daily weather information for the week
- Hourly weather information for today/tomorrow

Historic weather data when a user clicks on a date in the displayed calendar.
