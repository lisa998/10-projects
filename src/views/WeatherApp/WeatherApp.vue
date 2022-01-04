<template>
  <div class="body">
    <div class="container">
      <div class="weather">
        <div class="weather-gradient"></div>
        <div class="weather-location">
          <h2>{{ weatherInfo[selectDay].week }}</h2>
          <div>{{ weatherInfo[selectDay].date }}</div>
          <div>
            <i class="fas fa-map-marker-alt"></i>
            <span>{{ location }}</span>
          </div>
        </div>
        <div class="weather-data">
          <img class="weather-data-icon" :src="weatherInfo[selectDay].icon" alt="" />
          <div class="weather-data-deg">{{ weatherInfo[selectDay].temp.toFixed(1) }}°C</div>
          <div class="weather-data-description">{{ weatherInfo[selectDay].description }}</div>
        </div>
      </div>
      <div class="info">
        <div class="info-detail">
          <detail
            v-for="item in info"
            :key="item"
            class="info-detail-item"
            :item="item"
            :weatherInfo="weatherInfo[selectDay]"
          ></detail>
        </div>
        <div class="info-daily">
          <div class="info-daily-bg"></div>
          <daily
            v-for="(day, i) in weatherInfo"
            :key="i"
            :day="day"
            :select="i === selectDay"
            @click="setSelect(i)"
          ></daily>
        </div>
        <div class="info-alert">{{ alert }}</div>
        <change-location v-model:search="search" @searchLocation="searchLocation(search)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Daily from './daily.vue';
import Detail from './detail.vue';
import searchCityWeather from './utils';
import ChangeLocation from './changeLocation.vue';

interface Info {
  title: string;
  unit: string;
}

export default defineComponent({
  name: 'WeatherApp',
  components: { Daily, Detail, ChangeLocation },
  setup() {
    const info = [
      { title: 'pressure', unit: 'hPa' },
      { title: 'humidity', unit: '%' },
      { title: 'wind', unit: 'km/h' },
    ] as Info[];
    const location = ref('');
    const weatherInfo = ref([
      {
        date: '',
        temp: 0,
        description: '',
        pressure: 0,
        humidity: 0,
        wind: 0,
        icon: '',
        week: '',
        deg: 20,
      },
    ]);
    const selectDay = ref(0);
    const setSelect = (i: number) => {
      selectDay.value = i;
    };
    const search = ref('');
    const alert = ref('');
    const searchLocation = async (cityName: string) => {
      const result = await searchCityWeather(cityName);
      if (typeof result === 'string') {
        alert.value = result;
      } else {
        location.value = result.location;
        weatherInfo.value = result.weatherInfo;
      }
    };
    onMounted(async () => {
      searchLocation('taipei');
    });
    return {
      info,
      selectDay,
      setSelect,
      weatherInfo,
      location,
      search,
      searchLocation,
      alert,
    };
  },
});
</script>
<style scoped lang='scss'>
$gradient: linear-gradient(135deg, #72edf2 10%, #5151e5 100%);

* {
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}
.fa,
.fas {
  font-family: 'Font Awesome 5 Pro' !important;
}
.body {
  position: relative;
  height: 100vh;
}
.container {
  width: 650px;
  height: 390px;
  border-radius: 25px;
  color: #ffffff;
  background-color: #222831;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.weather {
  width: 310px;
  height: 400px;
  border-radius: 25px;
  position: relative;
  top: -5px;
  left: -20px;
  background-image: url('https://images.unsplash.com/photo-1559963110-71b394e7494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80');
  transition: 0.2s ease-in-out;
  text-align: left;
  float: left;
  &:hover {
    transform: perspective(400px) scale(1.05) rotateY(2deg);
  }
  &-gradient {
    background-image: $gradient;
    position: absolute;
    opacity: 0.8;
    width: 100%;
    height: 100%;
    border-radius: 25px;
  }
  &-location {
    position: relative;
    margin: 35px 25px;
    line-height: 1.25em;
    & h2 {
      font-weight: 900;
      letter-spacing: 0.1em;
    }
    & > div > span {
      margin-left: 5px;
    }
  }
  &-data {
    position: relative;
    margin: 25px;
    &-icon {
      top: 20px;
      left: -15px;
      position: relative;
    }
    &-deg {
      font-size: 4em;
      text-shadow: #ffff 1px 0, #ffff -1px 0, #ffff 0 -1px, #ffff 0 1px;
    }
  }
}
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px;
  position: relative;
  right: 10px;
  height: 100%;
  justify-content: space-between;
  &-detail {
    width: -webkit-fill-available;
  }
  &-daily {
    display: flex;
    border-radius: 25px;
    justify-content: center;
    position: relative;
    width: fit-content;
    &-bg {
      background-color: rgba($color: #ffffff, $alpha: 0.05);
      border-radius: 10px;
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
  &-alert {
    position: absolute;
    font-size: 0.2em;
    bottom: 75px;
  }
}
@media screen and (max-width: 670px) {
  .container {
    width: 100%;
    height: 100%;
    border-radius: 0;
    display: flex;
    flex-direction: column;
  }
  .weather {
    float: none;
    left: 0;
    top: 0;
    width: 100vw;
    height: 50vh;
    &-location {
      top: 25px;
      text-align: end;
    }
    &-data {
      bottom: 25px;
    }
  }
  .info {
    height: 50vh;
  }
}
@media screen and (max-height: 720px) {
  .weather {
    &-data {
      font-size: xx-small;
      bottom: 6em;
    }
  }
  .info {
    padding: 10px;
    right: 0;
  }
}
</style>
