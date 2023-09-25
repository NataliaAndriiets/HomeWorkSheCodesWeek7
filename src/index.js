let defoultTempType = true;
const now = new Date();
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const tempValue = document.getElementById("tempValue");
const emojiIcon = document.getElementById("emoji");
const humidityValue = document.getElementById("humidity");
const descriptionValue = document.getElementById("description");
const windValue = document.getElementById("wind");
const cityInputForm = document.getElementById("city-input-form");
const cityName = document.getElementById("city-name");
const cel = document.getElementById("cel");
const far = document.getElementById("far");
const day = document.getElementById("day");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");

day.innerHTML = dayNames[now.getDay()];
hours.innerHTML = now.getHours().toString();
minutes.innerHTML = now.getMinutes().toString();

function celToFar(temp) {
  return ((temp * 9) / 5 + 32).toFixed(0);
}

cel.addEventListener("click", function () {
  if (!defoultTempType) {
    tempValue.innerHTML = tempShow.toString();
    defoultTempType = !defoultTempType;
  }
});

far.addEventListener("click", function () {
  if (defoultTempType) {
    tempValue.innerHTML = celToFar(tempShow).toString();
    defoultTempType = !defoultTempType;
  }
});

cityInputForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const cityInput = document.getElementById("city-input");
  handleCity(cityInput);
});

function handleCity(city) {
  const apiKey = "3f6be1c407b0d9d1933561808db358ba";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&&units=metric`;

  axios
    .get(url)
    .then(function (response) {
      cityName.innerHTML = city.value;
      createRealData(response);
      cityInputForm.reset();
    })
    .catch(function (error) {
      console.log(error);
      cityName.innerHTML = "City is not correct";
      cityInputForm.reset();
    });
}

function createRealData(response) {
  const responseTemp = response.data.main.temp;
  tempShow = responseTemp.toFixed(0).toString();
  tempValue.innerHTML = tempShow;
  defoultTempType = true;
  emojiIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" alt="">`;
  humidityValue.innerHTML = response.data.main.humidity;
  descriptionValue.innerHTML = response.data.weather[0].description;
  windValue.innerHTML = response.data.wind.speed;
}

handleCity({ value: "Sydney" });
