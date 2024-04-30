// wheather app

const weatherForm = document.querySelector(`.weatherForm`);
const cityInput = document.querySelector(`.cityInput`);
const card = document.querySelector(`.card`);
const apikey = `ffb37fc7394e5c25c9f966389fa14af6`;

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getweatherData(city);
            displaygetweatherInfo(weatherData);
        }
        catch (error) {
            displayError(error);
        }

    }
    else {
        displayError.Error("Please enter a city")
    }

});

async function getweatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("could not fetch wheather data");
    }
    return await response.json();
}
function displaygetweatherInfo(data) {
    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }]} = data;

    card.textContent = "";
    card.style.display = "flex";
    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p')
    const humidityDisplay = document.createElement('p')
    const descDisplay = document.createElement('p')
    const weatherEmoj = document.createElement('p');

    cityDisplay.textContent = city;
    tempDisplay.textContent= `${(temp - 273.15).toFixed(0,1)}℃`;
    humidityDisplay.textContent = `humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoj.textContent = getweatherEmoj(id);


    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoj.classList.add("weatherEmoj");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoj);
}

function getweatherEmoj(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌦️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "☀️";
        case (weatherId === 800):
            return "🌁";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "❓"
    }
}


function displayError(message) {

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flew";
    card.appendChild(errorDisplay);
}