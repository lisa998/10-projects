/* eslint-disable comma-dangle */
import axios, { AxiosResponse } from 'axios';
import { Ref, ref } from 'vue';
import moment from 'moment';
import { LatNLonResponse, WeatherResponse, WeatherInfo } from './interface';

const OpenweatherAPI = 'https://api.openweathermap.org/data/2.5/';
async function getLatNLon(city: string) {
  const api = `${OpenweatherAPI}weather?q=${city}&appid=2141046a37bed154fc6c5579dfddeee3&units=metric`;

  const result: AxiosResponse<LatNLonResponse> = await axios(api);
  return result.data.coord;
}

// eslint-disable-next-line consistent-return
export async function getWeather(city: string): Promise<WeatherResponse | string> {
  try {
    const { lat, lon } = await getLatNLon(city);
    const api = `${OpenweatherAPI}onecall?exclude=current,minutely,hourly,alerts&appid=2141046a37bed154fc6c5579dfddeee3&units=metric&lat=${lat}&lon=${lon}`;
    const result: AxiosResponse<WeatherResponse> = await axios(api);
    return result.data;
  } catch (err) {
    const str = 'Not a city name';
    return str;
  }
}

// eslint-disable-next-line consistent-return
export default async function searchCityWeather(
  city: string
): Promise<{ location: string; weatherInfo: WeatherInfo[] } | string> {
  const url = (icon: string) => `http://openweathermap.org/img/wn/${icon}@2x.png`;
  try {
    const result = await getWeather(city);
    if (typeof result === 'string') {
      return result;
    }
    const place = result.timezone.split('/');
    const location = `${place[1]}, ${place[0]}`;
    const weatherInfo = result.daily
      .filter((_, i) => i < 4)
      .map((ele) => ({
        date: moment(ele.dt.toString(), 'X').format('ll'),
        temp: ele.temp.day,
        description: ele.weather[0].description,
        pressure: ele.pressure,
        humidity: ele.humidity,
        wind: ele.wind_speed,
        icon: url(ele.weather[0].icon),
        week: moment(ele.dt.toString(), 'X').format('dddd'),
        deg: ele.temp.day,
      }));
    return { location, weatherInfo };
  } catch (err) {
    const str = 'Something wrong...';
    return str;
  }
}
