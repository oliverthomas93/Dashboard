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
    const apiQuote = 'https://quotes.rest/qod.json';

    fetch(apiQuote)
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

    let weatherDate = new Date();
        let hour = weatherDate.getHours();
    if (hour <=6 || hour >= 18) {
        weather.style.backgroundColor = 'rgb(36, 25, 46)';
    } else {
        weather.style.backgroundColor = 'rgb(0, 120, 189)';
    };

    navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const apiWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=b9d9898bab5284eed1f6817fefd38f63`;
        fetch(apiWeather)
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

    //News
    let item1 = document.querySelector('#item1');
    let item2 = document.querySelector('#item2');
    let item3 = document.querySelector('#item3');
    let item1Link = document.querySelector('#item1-link');
    let item2Link = document.querySelector('#item2-link');
    let item3Link = document.querySelector('#item3-link');
    const apiNews = `https://content.guardianapis.com/search?section=uk-news&order-by=newest&api-key=7f2c3fe6-a96e-4582-9b51-205c0159f541`;

    fetch(apiNews)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        let webTitle1 = data.response.results[0].webTitle;
        let webTitle2 = data.response.results[1].webTitle;
        let webTitle3 = data.response.results[2].webTitle;
        let webLink1 = data.response.results[0].webUrl;
        let webLink2 = data.response.results[1].webUrl;
        let webLink3 = data.response.results[2].webUrl;

        item1.textContent = '"' + webTitle1 + '."';
        item2.textContent = '"' + webTitle2 + '."';
        item3.textContent = '"' + webTitle3 + '."';
        item1Link.href = webLink1;
        item2Link.href = webLink2;
        item3Link.href = webLink3;
    })


});