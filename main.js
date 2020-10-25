window.addEventListener('load', () => {

    //Random Photo Generator
    let welcome = document.querySelector('#welcome');
    let pics = ["url('./clay-banks-W02d-kJXO5I-unsplash.jpg')", "url('./daniel-sessler-4r3iFXolFec-unsplash.jpg')", "url('./de-an-sun-JWh255yVuhM-unsplash.jpg')", "url('./deglee-degi-SQoH2ZQd80E-unsplash.jpg')", "url('./egor-myznik-EQl-Gjg-rx4-unsplash.jpg')", "url('./fabrizio-conti-E2GXbvCJc58-unsplash.jpg')", "url('./ingmar-i0qX9Y5z2dE-unsplash.jpg')", "url('./ingmar-nW1HHttYIEg-unsplash.jpg')", "url('./kristaps-ungurs-DW8plOVYzbo-unsplash.jpg')", "url('./kristjan-kotar-6vTtNeq9BWk-unsplash.jpg')", "url('./leon-skibitzki-xzQvrNFMZuw-unsplash.jpg')", "url('./massimiliano-morosinotto-k1nok6_4uq8-unsplash.jpg')", "url('./nikolay-vorobyev-f9lFoW_EL1I-unsplash.jpg')", "url('./xandro-vandewalle-yzGPcKZXeks-unsplash.jpg')"];
    let randNum = Math.floor(Math.random() * pics.length);
    welcome.style.backgroundImage = pics[randNum];

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
});
