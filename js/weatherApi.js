const apiKey = "WEATHER_API_KEY";

export function fetchWeather(latitude, longitude) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.main && data.main.temp) {
        const temperature = data.main.temp;
        const weather = data.weather[0].main;
        const weatherTranslations = {
          Clouds: "Nuvens",
          Rain: "Chuva",
          Clear: "Tempo limpo",
          Snow: "Neve",
          Thunderstorm: "Tempestade",
          Drizzle: "Garoa",
        };

        const translatedWeather = weatherTranslations[weather] || weather;
        const weatherItemContainer = document.querySelector(".weather-item");
        weatherItemContainer.innerHTML = `<p>${translatedWeather}   ${temperature}°C </p>`;
        weatherItemContainer.style.fontSize = "1.5rem";
        weatherItemContainer.style.color = "var(--clock-primary)";

        return { temperature, weather };
      } else {
        throw new Error("Não foi possível obter os dados meteorológicos.");
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar dados da API:", error);
      throw error;
    });
}

export function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  return fetchWeather(latitude, longitude);
}

export function error() {
  console.log("Localização inválida");
}
