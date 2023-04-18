const apiKeyGoogle = window.Google_API;


function initAutocomplete() {
  // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);

  // Bias the SearchBox results towards current map's viewport.
  searchBox.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // For each place, get the name.
    places.forEach((place) => {
      if (!place.name) {
        console.log("Returned place contains no name");
        return;
      }

      // Set the value of the search input to the place name
      input.value = place.name;
    });
  });
}

// Add your API key to the script source below
// Replace YOUR_API_KEY with your actual API key
const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKeyGoogle}&libraries=places&callback=initAutocomplete`;
script.defer = true;
document.head.appendChild(script);
