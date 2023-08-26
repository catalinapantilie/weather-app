const searchBox = document.querySelector(".input");
const searchBtn = document.querySelector(".btn");
const weatherIcon = document.querySelector(".weather-icon");
const card = document.querySelector(".card");

let city = searchBox.value;

async function getWeather() {
  const apiKey = "b9c7d4b56515a19e6d96d2e0b0cebe81";
  city = searchBox.value;

  console.log(city);

  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  console.log(data);

  if (response.status === 404) {
    const div = document.createElement("div");
    div.textContent = "Invalid city name";

    div.style.textAlign = "left";
    div.style.marginTop = "10px";
    card.appendChild(div);
  } else {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "images/mist.png";
        break;
      case "Snow":
        weatherIcon.src = "images/snow.png";
        break;
    }
  }
  document.querySelector(".weather").style.display = "block";
}

function clearSearch() {
  searchBox.value = " ";
}

searchBtn.addEventListener("click", () => {
  getWeather();
  clearSearch();
});
