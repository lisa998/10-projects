interface Weather {
  main: string;
  description: string;
  icon: string;
}
interface Daily {
  dt: number;
  temp: {
    day: number;
  };
  pressure: number;
  humidity: number;
  ['wind_speed']: number;
  weather: Weather[];
}

export interface WeatherResponse {
  timezone: string;
  ['timezone_offset']: number;
  daily: Daily[];
}

export interface LatNLonResponse {
  coord: {
    lon: number;
    lat: number;
  };
}

export interface WeatherInfo {
  date: string;
  temp: number;
  description: string;
  pressure: number;
  humidity: number;
  wind: number;
  icon: string;
  week: string;
  deg: number;
}
