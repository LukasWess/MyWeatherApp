const apiKey = window.OpenWeather_API;
// Functions
async function fetchData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  return data;
}

  
function displayData(data) {
    const { name, sys, main, weather } = data;
    const { country } = sys;
    const temperature = Math.round(main.temp - 273.15);
    const iconCode = weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
  
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const timezone = data.timezone;
  
    // Get current UTC time and offset in milliseconds
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const offset = timezone * 1000;
  
    // Calculate local time based on UTC time and offset
    const localTime = new Date(utcTime + offset);
  
    document.getElementById("time").innerHTML = localTime.toLocaleTimeString([], timeOptions);
    document.getElementById("temp").innerHTML = `${temperature}°C`;
    document.getElementById("location").innerHTML = `${name}, ${country}`;
    
    // Get current date based on the searched location's timezone
    const date = localTime.toLocaleDateString([], dateOptions);
    document.getElementById("date").innerHTML = date;
  
    // Create an img element for the weather icon
    const img = document.createElement('img');
    img.src = iconUrl;
    img.className = 'weather-icon'; // add weather-icon class
    document.getElementById('temp').appendChild(img);
}
  

function initAutocomplete() {
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);

  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();
    if (places.length === 0) return;

    const { lat, lng } = places[0].geometry.location;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat()}&lon=${lng()}&appid=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const timezone = data.timezone;
        displayData(data, timezone);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

// Get user's location and display weather data for that location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const timezone = data.timezone;
        displayData(data, timezone);
      })
      .catch((error) => {
        console.error(error);
      })
  });
}

window.initAutocomplete = initAutocomplete;
///