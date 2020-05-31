export default function(lat, long, isCel) {
const cont = document.querySelector('.futureWeather');

   
function getNameOfDay(num) {
        switch(num) {
            case 1:
                return 'Monday'
            case 2: 
                return 'Tuesday '
            case 3: 
                return 'Wednesday'
            case 4: 
                return 'Thursday'
            case 5: 
                return 'Friday'
            case 6: 
                return 'Saturday'
            case 0: 
                return 'Sunday'
        }

}
function picWeather(par) {       
    switch(par) {
       case 'Clear':
           return 'sprite_mini_clear';
        case 'Clouds':
            return 'sprite_mini_clouds';
        case 'Rain':
            return 'sprite_mini_rain';
   }      
}
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly&appid=c1ac0b127a2a6d7ca0ec20f24dbdae1a`;
    fetch(url)
    .then(res => res.json())
    .then(res => {
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var tomorrowNext = new Date();
        tomorrowNext.setDate(tomorrowNext.getDate() + 2);
        var tomorrowNextNext = new Date();
        tomorrowNextNext.setDate(tomorrowNextNext.getDate() + 3);
        
        let result = `
        <div class="futureWeather_item">            
            <div class="futureWeather_day">${getNameOfDay(tomorrow.getDay())}</div>
            <div class="futureWeather_temp"> <span>${isCel ? Math.round(res.daily[1].temp.day - 273) : Math.round(1.8 * (res.daily[1].temp.day - 273) + 32)}</span>º</div>
            <div class=${picWeather(res.daily[1].weather[0].main)}></div>  
        </div>       
        <div class="futureWeather_item">            
            <div class="futureWeather_day">${getNameOfDay(tomorrowNext.getDay())}</div>
            <div class="futureWeather_temp"> <span>${isCel ? Math.round(res.daily[2].temp.day - 273) : Math.round(1.8 * (res.daily[2].temp.day - 273) + 32)}</span>º</div>
            <div class=${picWeather(res.daily[2].weather[0].main)}></div>  
        </div>       
        <div class="futureWeather_item">            
            <div class="futureWeather_day">${getNameOfDay(tomorrowNextNext.getDay())}</div>
            <div class="futureWeather_temp"> <span>${isCel ? Math.round(res.daily[3].temp.day - 273) : Math.round(1.8 * (res.daily[3].temp.day - 273) + 32)}</span>º</div>
            <div class=${picWeather(res.daily[3].weather[0].main)}></div>  
        </div>       
        `
        cont.innerHTML = result;        
    })
}   

