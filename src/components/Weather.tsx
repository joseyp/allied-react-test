import { useState } from "react";

interface WeatherData {
  name: string;
  weather: Array<{
    main: string;
  }>;
  main: {
    temp: number;
  };
  clouds: {
    all: number;
  };
}

export default function Weather() {
  const [city, setCity] = useState<string>("Jakarta");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = "4f67872133c0ff12e5bf3b6ce49bd9b0";

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCity(event.target.value);
  }

  const fetchCoordinates = async (
    cityName: string
  ): Promise<{ lat: number; lon: number }> => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch coordinates");
    }
    return { lat: data.coord.lat, lon: data.coord.lon };
  };

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  function handleSearch() {
    if (city === "") {
      alert("City cannot be empty");
      return;
    }

    const getWeather = async () => {
      try {
        setLoading(true);
        setWeather(null);
        setError(null);
        const { lat, lon } = await fetchCoordinates(city);
        fetchWeather(lat, lon);
      } catch (err) {
        setError("Could not fetch weather data");
        setLoading(false);
      }
    };

    getWeather();
  }

  return (
    <div>
      <h3>Search city</h3>
      <input type="text" onChange={handleChange} value={city} />
      <button onClick={handleSearch} style={{ marginLeft: "0.5rem" }}>
        Check
      </button>
      {loading && <p>Loading data...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <p>City name: {weather.name}</p>
          <p>Temp. : {weather.main.temp} &deg;F</p>
          <p>Weather: {weather.weather[0].main}</p>
        </div>
      )}
    </div>
  );
}
