const ui = new UI();
const storage = new Storage();

// Get storaged location data
const weatherLocation = storage.getLocationData();

// Initiate weather with storaged location data
const weather = new Weather(weatherLocation.city, weatherLocation.state);

// Get weather on DOM loa
document.addEventListener('DOMContentLoaded', getWeather);

// Change location event
document.getElementById('w-change-btn').addEventListener('click', (e) => {
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  // Get and display
  weather.changeLocation(city, state);
  // Change in storage
  storage.setLocationData(city, state);

  getWeather();
  // Close Modal
  $('#locModal').modal('hide');
})

function getWeather(){
  weather.getWeather()
    .then(results => {
      ui.paint(results);
    })
    .catch(err => console.log(err));
}