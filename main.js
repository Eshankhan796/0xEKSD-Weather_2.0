// Variable

const KEY = process.env.API_KEY;
const Search_elm = document.getElementById('search_elm');
const Clear_btn = document.querySelector('ion-icon[name="close"]')
const Search_results = document.querySelector('.search_results');

// Variable Function 

Search_elm.addEventListener('input', () => {
  if (Search_elm.value.length > 0) {
    Clear_btn.style.display = "block";
    Search_results.style.display = "block";
    Geocode_API_Func(Search_elm.value.trim());
    Loading_Spinner(true);
  } else {
    Clear_btn.style.display = "none";
    Search_results.style.display = "none";
  }
});

Search_elm.addEventListener('click', () => {
  if (Search_elm.value.length > 0) {
    Clear_btn.style.display = "block";
    Search_results.style.display = "block";
  };
});

Clear_btn.addEventListener('click', () => {
  Search_elm.value = '';
  Search_elm.focus();
  Clear_btn.style.display = "none";
  Search_results.style.display = "none";
});

navigator.geolocation.getCurrentPosition(Get_Current_Position_Success_Handler, Get_Current_Position_Error_Handler);

// Functions 

function Loading_Spinner(spinner_mode) {
  if (spinner_mode) {
    Search_results.innerHTML = '';
    const loading_div_elm = document.createElement('div');
    loading_div_elm.classList.add('spinner');
    Search_results.append(loading_div_elm);
  } else {
    const loading_div_elm = Search_results.querySelector('.spinner');
    if (loading_div_elm) {
      Search_results.removeChild(loading_div_elm);
    };
  };
};

function Unit_Converter(unit) {
  const temperature_in_c = unit - 273.15;
  const temperature_in_f = (9 / 5) * temperature_in_c + 32;
  return {
    Temp_C: temperature_in_c.toFixed(1),
    Temp_F: temperature_in_f.toFixed(1)
  };
}

function Icon_Selector(icon_code) {
  switch (icon_code) {
    case "thunderstorm with light rain":
    case "thunderstorm with rain":
    case "thunderstorm with heavy rain":
    case "thunderstorm with light drizzle":
      return '/assets/icons/1.png';
    case "light thunderstorm":
    case "thunderstorm":
      return '/assets/icons/2.png';
    case "heavy thunderstorm":
    case "ragged thunderstorm":
    case "thunderstorm with drizzle":
    case "thunderstorm with heavy drizzle":
      return '/assets/icons/3.png';
    case "light intensity drizzle":
    case "drizzle":
    case "light intensity drizzle rain":
    case "drizzle rain":
    case "shower drizzle":
      return '/assets/icons/4.png';
    case "heavy intensity drizzle":
    case "heavy intensity drizzle rain":
    case "shower rain and drizzle":
    case "heavy shower rain and drizzle":
      return '/assets/icons/5.png';
    case "light rain":
      return '/assets/icons/6.png';
    case "moderate rain":
    case "light intensity shower rain":
    case "shower rain":
      return '/assets/icons/7.png';
    case "heavy intensity rain":
    case "very heavy rain":
    case "extreme rain":
    case "heavy intensity shower rain":
    case "ragged shower rain":
      return '/assets/icons/8.png';
    case "light rain and snow":
    case "rain and snow":
    case "freezing rain":
      return '/assets/icons/9.png';
    case "light snow":
    case "light shower sleet":
    case "light shower snow":
    case "shower snow":
      return '/assets/icons/10.png';
    case "snow":
    case "sleet":
    case "shower sleet":
      return '/assets/icons/11.png';
    case "heavy shower snow":
    case "heavy snow":
      return '/assets/icons/12.png';
    case "mist":
    case "smoke":
      return '/assets/icons/13.png';
    case "dust":
    case "sand":
      return '/assets/icons/14.png';
    case "haze":
    case "fog":
      return '/assets/icons/15.png';
    case "volcanic ash":
      return '/assets/icons/16.png';
    case "squalls":
      return '/assets/icons/17.png';
    case "tornado":
      return '/assets/icons/18.png';
    case "few clouds":
      return '/assets/icons/19.png';
    case "scattered clouds":
      return '/assets/icons/20.png';
    case "broken clouds":
      return '/assets/icons/21.png';
    case "overcast clouds":
      return '/assets/icons/22.png';
    case "clear sky":
      return '/assets/icons/23.png';
  };
};

function Date_and_UTC_Formatter(timestamp, timezone) {
  const totalMinutes = timezone / 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const sign = hours >= 0 ? '+' : '-';
  const date = new Date(timestamp * 1000);
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  const formattedTimezone = `${sign}${String(Math.abs(hours)).padStart(2, '0')}:${String(Math.abs(minutes)).padStart(2, '0')}`;
  return formattedDate + ' ' + formattedTimezone + 'UTC';
};

function Air_Quality_Index_Detector(aqi) {
  const air_quality = document.querySelector('.air_quality');
  switch (aqi) {
    case 1:
      air_quality.innerText = 'Good';
      air_quality.style.background = '#28a745';
      break;
    case 2:
      air_quality.innerText = 'Fair';
      air_quality.style.background = '#f7d038';
      break;
    case 3:
      air_quality.innerText = 'Moderate';
      air_quality.style.background = '#f89c1c';
      break;
    case 4:
      air_quality.innerText = 'Poor';
      air_quality.style.background = '#dc3545';
      break;
    case 5:
      air_quality.innerText = 'Very Poor';
      air_quality.style.background = '#7d1d3f';
      break;
  }
}

function Air_Pollution_Components_Updater(air_components) {
  const carbon_monoxide = document.getElementById('co');
  const nitrogen_monoxide = document.getElementById('no');
  const nitrogen_dioxide = document.getElementById('no2');
  const ozone = document.getElementById('o3');
  const sulphur_dioxide = document.getElementById('so2');
  const ammonia = document.getElementById('nh3');

  carbon_monoxide.innerText = air_components.co;
  nitrogen_monoxide.innerText = air_components.no;
  nitrogen_dioxide.innerText = air_components.no2;
  ozone.innerText = air_components.o3;
  sulphur_dioxide.innerText = air_components.so2;
  ammonia.innerText = air_components.nh3;

  if (air_components.no2 >= 0 && air_components.no2 <= 40) {
    nitrogen_dioxide.style.outlineColor = "#28a745";
  } else if (air_components.no2 > 40 && air_components.no2 <= 70) {
    nitrogen_dioxide.style.outlineColor = "#f7d038";
  } else if (air_components.no2 > 70 && air_components.no2 <= 150) {
    nitrogen_dioxide.style.outlineColor = "#f89c1c";
  } else if (air_components.no2 > 150 && air_components.no2 <= 200) {
    nitrogen_dioxide.style.outlineColor = "#dc3545";
  } else if (air_components.no2 > 200) {
    nitrogen_dioxide.style.outlineColor = "#7d1d3f";
  } else {
    nitrogen_dioxide.style.outlineColor = "#42445A";
  };

  if (air_components.o3 >= 0 && air_components.o3 <= 20) {
    ozone.style.outlineColor = "#28a745";
  } else if (air_components.o3 > 20 && air_components.o3 <= 80) {
    ozone.style.outlineColor = "#f7d038";
  } else if (air_components.o3 > 80 && air_components.o3 <= 250) {
    ozone.style.outlineColor = "#f89c1c";
  } else if (air_components.o3 > 250 && air_components.o3 <= 350) {
    ozone.style.outlineColor = "#dc3545";
  } else if (air_components.o3 > 350) {
    ozone.style.outlineColor = "#7d1d3f";
  } else {
    ozone.style.outlineColor = "#42445A";
  };

  if (air_components.so2 >= 0 && air_components.so2 <= 60) {
    sulphur_dioxide.style.outlineColor = "#28a745";
  } else if (air_components.so2 > 60 && air_components.so2 <= 100) {
    sulphur_dioxide.style.outlineColor = "#f7d038";
  } else if (air_components.so2 > 100 && air_components.so2 <= 140) {
    sulphur_dioxide.style.outlineColor = "#f89c1c";
  } else if (air_components.so2 > 140 && air_components.so2 <= 180) {
    sulphur_dioxide.style.outlineColor = "#dc3545";
  } else if (air_components.so2 > 180) {
    sulphur_dioxide.style.outlineColor = "#7d1d3f";
  } else {
    sulphur_dioxide.style.outlineColor = "#42445A";
  };

};

function Get_Current_Position_Success_Handler(success) {
  const latitude = success.coords.latitude;
  const longitude = success.coords.longitude;
  const weather_full_location = document.querySelector('.weather_full_location');
  const full_location = `${latitude.toFixed(2)}:${longitude.toFixed(2)}`;
  weather_full_location.innerHTML = '<ion-icon name="location-outline"></ion-icon>' + full_location;
  Master_API_Caller_Func(latitude, longitude);
}

function Get_Current_Position_Error_Handler(error) {
  let errorMessage;
  switch (error.code) {
    case error.PERMISSION_DENIED:
      errorMessage = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      errorMessage = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      errorMessage = "The request to get the user's location timed out.";
      break;
    default:
      errorMessage = "An unknown error occurred.";
      break;
  };
  window.confirm(`Sorry, ${errorMessage} Please try again.`);
}

// Openweathermap API Functions

function Master_API_Caller_Func(latitude, longitude) {
  Current_Weather_API_Func(latitude, longitude);
  Air_Pollution_API_Func(latitude, longitude);
  Forecast_API_Func(latitude, longitude);
};

function Geocode_API_Func(search_input_value) {
  axios.get('http://api.openweathermap.org/geo/1.0/direct', {
      params: {
        q: search_input_value,
        limit: 5,
        appid: KEY
      }
    })
    .then(res => {
      Search_Results_Layout_Builder(res.data);
      Loading_Spinner(false);
    })
    .catch(err => { console.log(err) })
};

function Current_Weather_API_Func(latitude, longitude) {
  axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: latitude,
        lon: longitude,
        appid: KEY
      }
    })
    .then(res => {
      Current_Weather_Layout_Builder(res.data);
      Sun_Layout_Builder(res.data);
      Atmosphere_Layout_Builder(res.data);
    })
    .catch(err => { console.log(err) })
};

function Air_Pollution_API_Func(latitude, longitude) {
  axios.get('http://api.openweathermap.org/data/2.5/air_pollution', {
      params: {
        lat: latitude,
        lon: longitude,
        appid: KEY
      }
    })
    .then(res => { Air_Pollution_Layout_Builder(res.data) })
    .catch(err => { console.log(err) })
};

function Forecast_API_Func(latitude, longitude) {
  axios.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        lat: latitude,
        lon: longitude,
        cnt: 8,
        appid: KEY
      }
    })
    .then(res => { Forecast_Layout_Builder(res.data); })
    .catch(err => { console.log(err) })
};

// Layout Building Functions 

function Search_Results_Layout_Builder(build) {
  Search_results.innerHTML = '';
  if (build.length === 0) {
    const not_found_img_elm = document.createElement('img');
    const not_found_msg_elm = document.createElement('p');
    not_found_img_elm.src = '/assets/icons/404.png';
    not_found_msg_elm.innerText = `Sorry, \"${Search_elm.value}\" City not found. Try to refine or full name instead.`;
    not_found_img_elm.classList.add('not_found_404_img');
    not_found_msg_elm.classList.add('not_found_404_msg');
    Search_results.append(not_found_img_elm, not_found_msg_elm);
  } else {
    const ul_elm = document.createElement('ul');
    ul_elm.classList.add('search_result_city_list');
    build.forEach(city => {
      const li_elm = document.createElement('li');
      li_elm.innerHTML = '<ion-icon name="pin"></ion-icon>' + `<p>${city.name}</p>` + `<p>${city.state || city.lat.toFixed(2) + ':' + city.lon.toFixed(2)}, ${city.country}</p>`;
      li_elm.setAttribute('data-lat', city.lat);
      li_elm.setAttribute('data-lon', city.lon);
      li_elm.setAttribute('data-city', city.name);
      ul_elm.append(li_elm);
      Search_results.append(ul_elm);
      li_elm.addEventListener('click', () => {
        const latitude = li_elm.getAttribute('data-lat');
        const longitude = li_elm.getAttribute('data-lon');
        const city_name = li_elm.getAttribute('data-city');
        const weather_full_location = document.querySelector('.weather_full_location');
        const full_location = `${city_name}, ` + `${city.state || city.lat.toFixed(2) + ":" + city.lon.toFixed(2)}, ` + `${city.country}`;
        weather_full_location.innerHTML = '<ion-icon name="location-outline"></ion-icon>' + full_location;
        Search_results.style.display = 'none';
        Search_elm.value = city_name;
        Master_API_Caller_Func(latitude, longitude);
      });
    });
  };
};

function Current_Weather_Layout_Builder(build) {
  document.querySelector('.weather_card').style.backgroundImage = `url("/assets/backgrounds/${build.weather[0].main}.png")`;
  document.querySelector('.weather_icon').src = Icon_Selector(build.weather[0].description);
  document.querySelector('.weather_description').innerText = build.weather[0].description;
  document.querySelector('.weather_temperature_in_c').innerText = `${Unit_Converter(build.main.feels_like).Temp_C} °C`;
  document.querySelector('.weather_temperature_in_f').innerText = `${Unit_Converter(build.main.feels_like).Temp_F} °F`;
  document.querySelector('.weather_date_n_utc').innerHTML = `<ion-icon name="calendar"></ion-icon>${Date_and_UTC_Formatter(build.dt, build.timezone)}`;
};

function Air_Pollution_Layout_Builder(build) {
  Air_Quality_Index_Detector(build.list[0].main.aqi);
  Air_Pollution_Components_Updater(build.list[0].components);
};

function Sun_Layout_Builder(build) {
  const sunset_elm = document.querySelector('.sunset_box p');
  const sunrise_elm = document.querySelector('.sunrise_box p');
  const sunrise_time = new Date(build.sys.sunrise * 1000);
  const sunset_time = new Date(build.sys.sunset * 1000);

  const options = { hour: '2-digit', minute: '2-digit', hour12: true };

  sunset_elm.innerText = sunset_time.toLocaleTimeString('en-US', options);
  sunrise_elm.innerText = sunrise_time.toLocaleTimeString('en-US', options);
};

function Atmosphere_Layout_Builder(build) {
  document.getElementById('humidity').innerHTML = `${build.main.humidity}<span>%</span>`;
  document.getElementById('visibility').innerHTML = `${build.visibility / 1000}<span>km</span>`;
  document.getElementById('cloudiness').innerHTML = `${build.clouds.all}<span>%</span>`;
  document.getElementById('wind_speed').innerHTML = `${build.wind.speed}<span>Miles/h</span>`;
  document.getElementById('max_temp').innerHTML = `${Unit_Converter(build.main.temp_max).Temp_C}<span>°C</span>`;
  document.getElementById('min_temp').innerHTML = `${Unit_Converter(build.main.temp_min).Temp_C}<span>°C</span>`;
};

function Forecast_Layout_Builder(build) {
  build.list.forEach((card, index) => {
    const card_element = document.getElementById(`mini_forecast_card_${index + 1}`);
    const card_icon = document.getElementById(`card_icon_${index + 1}`);
    const card_description = document.getElementById(`card_description_${index + 1}`);
    const card_temperature = document.getElementById(`card_temperature_${index + 1}`);
    card_temperature.innerHTML = `${Unit_Converter(card.main.feels_like).Temp_C}<span>°C</span>`;
    card_element.style.backgroundImage = `url("/assets/backgrounds/${card.weather[0].main}.png")`;
    card_icon.src = Icon_Selector(card.weather[0].description);
    card_description.innerText = card.weather[0].main;
  });
};

// Initiate Evil Mission 

window.onload = () => {

};