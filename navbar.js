const navbar = document.createElement("div");
navbar.classList.add("navbar");

const weatherBtn = document.createElement("a");
weatherBtn.textContent = "Weather";
weatherBtn.href = "#";
weatherBtn.classList.add("navbar-button");
weatherBtn.addEventListener("click", showWeather);

const hotelsBtn = document.createElement("a");
hotelsBtn.textContent = "Hotels";
hotelsBtn.href = "#";
hotelsBtn.classList.add("navbar-button");
hotelsBtn.addEventListener("click", showHotels);

const flightsBtn = document.createElement("a");
flightsBtn.textContent = "Flights";
flightsBtn.href = "#";
flightsBtn.classList.add("navbar-button");
flightsBtn.addEventListener("click", showFlights);

navbar.appendChild(weatherBtn);
navbar.appendChild(hotelsBtn);
navbar.appendChild(flightsBtn);

document.body.insertBefore(navbar, document.body.firstChild);

function showWeather() {
  // Add logic to show weather data
  
}

function showHotels() {
  // Add logic to show hotels data
}

function showFlights() {
  // Add logic to show flights data
}
