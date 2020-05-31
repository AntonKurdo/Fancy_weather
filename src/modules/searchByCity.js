import futureWeather from './futureWeatherControl';
import map from './map';

export default function (isCel = true) {
    const searchInp = document.querySelector('.search_inp');
    const searchBtn = document.querySelector('.btn-search');
    const loader = document.querySelector('.loader_search');
    const alert = document.querySelector('.alert');
    const cont1 = document.querySelector('.cont');
      
    function picWeather(par) {       
        switch(par) {
           case 'Clear':
               return 'sprite_clear';
            case 'Clouds':
                return 'sprite_clouds';
            case 'Rain':
                return 'sprite_rain';
       }      
    }

    searchBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        if (searchInp.value !== '') {
            loader.classList.add('_active')
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInp.value}&appid=c1ac0b127a2a6d7ca0ec20f24dbdae1a`
            fetch(url)
                .then(res => res.json())
                .then(res => {                   
                    if(res.cod === 200) {
                    futureWeather(res.coord.lat, res.coord.lon, isCel);
                    map(+res.coord.lat, +res.coord.lon);
                    const date = new Date();     
                    let result = `
                    <div class='city'>${res.name}, ${res.sys.country}</div>
                    <div class='date_time'> ${date}  </div>              
                    <div class='temp'><spaN> ${isCel ? Math.round(res.main.temp - 273) : Math.round(1.8 * (res.main.temp - 273) + 32)}</span>º
                    <div class=${ picWeather(res.weather[0].main) }></div>  
                    <div class='params'>              
                    <div class='weather_state'> ${res.weather[0].main}</div>
                   <div>FEELS LIKE: <span class='current_weather_fl'> ${isCel ? Math.round(res.main.feels_like - 273) : Math.round(1.8 * (res.main.feels_like - 273) + 32)}</span>º</div>
                   <div>WIND: ${res.wind.speed} m/s </div>
                   <div>HUMIDITY: ${res.main.humidity}%</div>
                 </div>
               </div> `         
                    cont1.innerHTML = result;
                    loader.classList.remove('_active');
                    searchInp.value = '';
                 
                    } else {
                        alert.textContent = `❗ ${res.message}`;
                        alert.classList.add('_active');
                        searchInp.value = '';
                        setTimeout(() => {
                            alert.classList.remove('_active')
                        }, 5000)
                        loader.classList.remove('_active');
                    }
                })
        } else {
            alert.classList.add('_active')
            setTimeout(() => {
                alert.classList.remove('_active')
            }, 5000)
        }
    })

}