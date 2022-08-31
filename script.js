 // Hava surumu verilerinin çekildiği apiler
const api = {
    key: "28fd15358cdecbc1a1dfef367e71acef",
    base: "https://api.openweathermap.org/data/2.5/"
}

// arama butonu verilerini çekme kodları

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
btn.addEventListener("click", getInput);

// varsayılan event  yerine  tıklandığında arama değerlerini getiren kodlar
function getInput (event) {
    event.preventDefault();
    if (event.type == "click") {
        getData(search.value);
        console.log(search.value);
    }
}

// api bağlantısını gerçekleştiren kodlar
function getData () {
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
        .then(response => {
            return response.json();
        }).then(displayData);
        
}

function displayData (response) {

    // arama kutucuğu uyarı ve hata kodları

    if (response.cod === "404") {
        const error = document.querySelector(".error");
        error.textContent = "Lütfen Şehir İsmi Yazınız";
        search.value = "";
    } else {
        const city = document.querySelector(".city");
        city.innerText = `${response.name}, ${response.sys.country}`;

        // tarih verilerini çekme kodları

        const today = new Date();
        const date = document.querySelector(".date");
        date.innerText = dateFunction(today);

        // sıcaklık verilerini çekme kodları
        const temp = document.querySelector(".temp");
        temp.innerHTML = `Sıcaklık: ${Math.round(response.main.temp)} <span>°C</span>`;

        // hava durumunu çekme kodları

        const weather = document.querySelector(".weather");
        weather.innerText = `Hava Durumu: ${response.weather[0].main}`;

        // sıcaklık aralığı verileini çekme kodları

        const tempRange = document.querySelector(".temp-range");
        tempRange.innerText = `Sıcaklık Aralığı: ${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.temp_max)}°C`;

        // hava durumu ikonlarınnı çekme kodları

        const weatherIcon = document.querySelector(".weather-icon");
        const iconURL = "http://openweathermap.org/img/w/";
        weatherIcon.src = iconURL + response.weather[0].icon + ".png";

        search.value = "";
    }
}
       // gün ve ay verilerini çekme kodları
function dateFunction (d) {
    let months = ["Ocak", "Şubat", "Mart", "Mayıs", "Nisan", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    let days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}