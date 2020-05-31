import fetchFutureWeather from './futureWeatherControl';
import searchByCity from './searchByCity';
import map from './map'
export default function () {
    let isCel = true;
    let cont = document.querySelector('.cont')
    const tempButton = document.querySelector('.btn_temp');

    searchByCity();
    navigator
        .geolocation
        .getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchCurrentWeather(latitude, longitude);
            fetchFutureWeather(latitude, longitude, isCel);
            map(latitude, longitude)
            tempButton.addEventListener('change', (e) => {
                if (e.target.value === 'f') {
                    isCel = false;

                    let degreesMain = document.querySelector('.temp span').textContent;
                    document.querySelector('.temp span').textContent = Math.round(1.8 * (+degreesMain) + 32);

                    let degreesFL = document.querySelector('.current_weather_fl').textContent;
                    document.querySelector('.current_weather_fl').textContent = Math.round(1.8 * (+degreesFL) + 32);

                    let degreesFuture = document.querySelectorAll('.futureWeather_temp span')
                    degreesFuture.forEach(item => {
                        item.textContent = Math.round(1.8 * (+item.textContent) + 32);
                    })

                } else {
                    isCel = true;
                    let degreesMain = document.querySelector('.temp span').textContent;
                    document.querySelector('.temp span').textContent = Math.round((degreesMain - 32) / 1.8);

                    let degreesFL = document.querySelector('.current_weather_fl').textContent;
                    document.querySelector('.current_weather_fl').textContent = Math.round((degreesFL - 32) / 1.8);

                    let degreesFuture = document.querySelectorAll('.futureWeather_temp span')
                    degreesFuture.forEach(item => {
                        item.textContent = Math.round((item.textContent - 32) / 1.8);
                    })

                }
            })
        })

    function picWeather(par) {
        switch (par) {
            case 'Clear':
                return 'sprite_clear';
            case 'Clouds':
                return 'sprite_clouds';
            case 'Rain':
                return 'sprite_rain';
        }
    }

    function fetchCurrentWeather(lat, long) {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=c1ac0b127a2a6d7ca0ec20f24dbdae1a`;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                const date = new Date();
                let params = `
               <div class='city'>${res.name}, ${res.sys.country}</div>
               <div class='date_time'> ${date}  </div>              
               <div class='temp'><spaN> ${isCel
                    ? Math.round(res.main.temp - 273)
                    : Math.round(1.8 * (res.main.temp - 273) + 32)}</span>º
               <div class=${picWeather(res.weather[0].main)}></div>  
               <div class='params'>              
               <div class='weather_state'> ${res.weather[0].main}</div>
              <div>FEELS LIKE: <span class='current_weather_fl'> ${isCel
                        ? Math.round(res.main.feels_like - 273)
                        : Math.round(1.8 * (res.main.feels_like - 273) + 32)} </span>º</div>
              <div>WIND: ${res.wind.speed} m/s </div>
              <div>HUMIDITY: ${res.main.humidity}%</div>
            </div>
          </div>
               `
                cont.innerHTML = params;
            })
    }
}