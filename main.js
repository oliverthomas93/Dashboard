window.addEventListener('load', () => {

    //Random Photo Generator
    let welcome = document.querySelector('#welcome');
    let randNum = Math.ceil(Math.random() * 17);
    welcome.style.backgroundImage = `url(./${randNum}.jpg)`;

    //Greeting Generator
    let greetingMessage = document.querySelector('#greeting-message');
    let time = new Date();
    if (time.getHours() < 12) {
        greetingMessage.textContent = 'Good Morning Oliver.';
    } else if (time.getHours() < 17) {
        greetingMessage.textContent = 'Good Afternoon Oliver.';
    } else {
        greetingMessage.textContent = 'Good Evening Oliver.';
    };

    //Date and Time 
    
    function dateTime() {
        let date = new Date();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;
        let liveTime = `${h}:${m}:${s}`;
        document.querySelector('#date').textContent = date.toDateString();
        document.querySelector('#live-time').textContent = liveTime;
        setTimeout(dateTime, 1000);
    }
    dateTime();

    //Quote Generator
    let liveQuote = document.querySelector('#quote');
    let liveAuthor = document.querySelector('#author');
    fetch('https://quotes.rest/qod.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        const {quote, author} = data.contents.quotes[0];
        liveQuote.textContent = `"${quote}"`;
        liveAuthor.textContent = author;
    })

    //Weather
    let long;
    let lat;
    let weather = document.querySelector('#weather');
    let weatherLocation = document.querySelector('#weather-location');
    let weatherTemp = document.querySelector('#weather-temp');
    let weatherSummary = document.querySelector('#weather-summary');
    let weatherIcon = document.querySelector('#weather-icon');
    let feelsLike = document.querySelector('#feels-like');
    let wind = document.querySelector('#weather-wind')
;
    let weatherDate = new Date();
        let hour = weatherDate.getHours();
    if (hour <=6 || hour >= 18) {
        weather.style.backgroundColor = 'rgb(36, 25, 46)';
    } else {
        weather.style.backgroundColor = 'rgb(53, 181, 255)';
    };

    navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=b9d9898bab5284eed1f6817fefd38f63`;
        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const {name} = data;
            const temp = Math.round(data.main.temp);
            const {description} = data.weather[0];
            const {icon} = data.weather[0];
            const feels_like = Math.round(data.main.feels_like);
            const {deg, speed} = data.wind;
            let windDirection; 
            
            if (deg > 315 || deg < 45) {
                windDirection = 'N';
            } else if (deg >= 45 && deg <= 135) {
                windDirection = 'E';
            } else if (deg > 135 && deg < 225) {
                windDirection = 'S';
            } else {
                windDirection = 'W';
            };
            
            weatherLocation.textContent = name;
            weatherTemp.textContent = `${temp}°`;
            weatherSummary.textContent = description;
            weatherIcon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${icon}@2x.png)`;
            feelsLike.textContent = `FEELS LIKE: ${feels_like}°`;
            wind.textContent = `${windDirection} ${speed} m/s`;
        });
    });
});