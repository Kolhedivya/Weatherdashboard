import axios from "axios";


const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Replace with OpenWeatherMap API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getCurrentWeather(city) {
    const res = await axios.get(
        `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    return res.data;
}

export async function getForecast(city) {
    const res = await axios.get(
        `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    const daily = [];
    const list = res.data.list;
    for (let i = 0; i < list.length; i += 8) {
        daily.push({
            date: new Date(list[i].dt_txt).toLocaleDateString(),
            temp: list[i].main.temp,
            desc: list[i].weather[0].description,
            icon: list[i].weather[0].icon, // 👈 add icon code
        });
    }
    return daily;
}
