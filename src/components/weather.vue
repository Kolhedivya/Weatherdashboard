<template>
  <div class="weather-container" :style="{ background: currentTheme }">
    <div class="search-bar">
      <input v-model="city" placeholder="Enter city name" />
      <button @click="fetchWeather">Get Weather</button>
    </div>

    <div v-if="weather" class="card current-weather">
      <h2>{{ weather.name }}</h2>
      <p>🌡 Temp: {{ weather.main.temp }} °C</p>
      <p>💧 Humidity: {{ weather.main.humidity }}%</p>
      <p>🌬 Wind: {{ weather.wind.speed }} m/s</p>
    </div>

    <div v-if="forecast.length" class="forecast">
      <h3>5-Day Forecast🌩️</h3>
      <div class="forecast-grid">
        <div v-for="(day, i) in forecast" :key="i" class="card forecast-card">
          <h4>{{ day.date }}</h4>
          <img
            :src="`https://openweathermap.org/img/wn/${day.icon}@2x.png`"
            :alt="day.desc"
          />
          <p>🌡 {{ day.temp }} °C</p>
          <p>{{ day.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentWeather, getForecast } from "../services/weatherService";
import { weatherThemes } from "../services/themeMapper";

export default {
  name: "Weather",
  data() {
    return {
      city: "",
      weather: null,
      forecast: [],
      currentTheme: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", // default
    };
  },
  methods: {
    async fetchWeather() {
      try {
        this.weather = await getCurrentWeather(this.city);
        this.forecast = await getForecast(this.city);

        const condition = this.weather.weather[0].main;
        this.currentTheme = weatherThemes[condition] || this.currentTheme;
      } catch (err) {
        alert("⚠️ Could not fetch weather. Check city name or API key.");
      }
    },
  },
};
</script>

<style scoped>
.weather-container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}

.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

input {
  padding: 10px;
  border-radius: 8px;
  border: none;
  outline: none;
  width: 200px;
}

button {
  background: #ff9800;
  color: white;
  border: none;
  padding: 10px 16px;
  margin-left: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #e68900;
}

.card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  margin: 12px 0;
  box-shadow: 0 6px 12px rgba(0,0,0,0.2);
  backdrop-filter: blur(6px);
}

.current-weather {
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  color: #222;
}

.forecast {
  margin-top: 20px;
}

.forecast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
}

.forecast-card {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  text-align: center;
  color: #222;
  transition: transform 0.2s ease;
}

.forecast-card:hover {
  transform: translateY(-5px);
}

.forecast-card img {
  width: 70px;
  height: 70px;
  margin: 8px auto;
  display: block;
}
</style>