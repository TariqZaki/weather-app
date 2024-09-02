"use stric";
//!<--- global variables ---->
const myInput = document.querySelector(".inputSearch");
const myBtn = document.querySelector(".find");
let rowData = document.querySelector("#rowData");
let alertMsg = document.querySelector(".alertMsg");
let emptyMsg = document.querySelector('.emptyMsg');
let region = document.querySelector('.logoContent');
const apiKey = "be3e591eea314eccae4193453242006";
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let daysNum = 7;
//!<--- global variables ---->


getApi("cairo");
//?<--- async api function ----> 
async function getApi(city) {
  try {
    let res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${daysNum}`
    );

    cities = await res.json();
    displayData()

    alertMsg.classList.add("d-none");
  } catch (error) {
    alertMsg.classList.remove("d-none");
  }
}
//?<--- async api function ----> 

//?<--- if the browser support geolocation? ---->
if (navigator.geolocation) {
  let nowPosition = navigator.geolocation.getCurrentPosition(
    function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let coordinates = `${latitude},${longitude}`;
      getApi(coordinates);
    },
    function (error) {
      getApi("cairo");
    }
  );
} else {
  getApi("cairo");
}
//?<--- if the browser support geolocation? ---->


//?<--- global condition ---->
if (myInput.value == "") {
  getApi("cairo");
  alertMsg.classList.add("d-none");
} 
//?<--- global condition ---->

//?<--- elements events ---->
myInput.addEventListener("keyup", (e) => {
  let term = myInput.value.trim().toLowerCase();
  getApi(term);
});

myBtn.addEventListener("click", (e) => {
  let term = myInput.value.trim().toLowerCase();
  getApi(term);
  clearData;
});

myBtn.addEventListener("enter", (e) => {
  let term = myInput.value.trim().toLowerCase();
  getApi(term);
  clearData;
});
//?<--- elements events ---->


//?<--- clear data function ---->
function clearData() {
  myInput.value = null;
}
//?<--- clear data function ---->

//?<--- display weather function ---->
function displayData() {
  var cartona = ``;
  for (let i = 0; i < cities.forecast.forecastday.length; i++) {
    let date = new Date(cities.forecast.forecastday[i].date);
    if (i == 0) {
      cartona += `
     <div class="col-md-6 my-5">
                    <div class="mainCard mt-2 rounded-4 p-3 text-white">
                          <div class="mainDate pb-2 d-flex justify-content-between align-items-center border-dark border-1 border-bottom shadow-lg">
                            <div class="mainDay">
                                <span>${days[date.getDay()]}</span>
                            </div>
                            <div class="mainMonth">
                                <span>${date.getDate()}</span>
                                <span>${monthNames[date.getMonth()]}</span>
                            </div>
                          </div>
                          <div class="nameCity text-center pt-3 d-flex flex-column">
                            <span>${cities.location.name}</span>
                            <small>${cities.location.region}</small>
                          </div>
                          <div class="temp text-center">
                            <span>${Math.floor(cities.current.temp_c)}<sup>o</sup>C</span>
                          </div>
                          <div class="condation d-flex justify-content-between align-items-center">
                            <div class="statusText">
                                <p>${cities.current.condition.text}</p>
                            </div>
                            <div class="statusIcon">
                                <img src="https:${cities.current.condition.icon}" alt="">
                            </div>
                          </div>
                          <div class="weatherData rounded-2 d-flex justify-content-around align-items-center">
                            <div class="rain">
                                <img src="images/1.png" alt="">
                                <span>${cities.current.humidity}%</span>
                            </div>
                            <div class="wind">
                                <img src="images/2.png" alt="">
                                <span>${cities.current.wind_kph}</span>
                            </div>
                            <div class="direction">
                                <img src="images/3.png" alt="">
                                <span>${cities.current.wind_dir}</span>
                            </div>
                          </div>
                    </div>
                </div>
            `;
    } else {
      cartona += `
                  <div class="col-md-3 mt-5">
                    <div class="secondCard d-flex flex-column justify-content-start align-items-center rounded-4 text-white my-5  p-5 shadow-lg">
                        <div class="dayName border-1 border-bottom border-dark p-2">
                            <span>${days[date.getDay()]}</span>
                        </div>
                        <div class="statusIcon">
                            <img src="https:${cities.forecast.forecastday[i].day.condition.icon}">
                        </div>
                        <div class="maxTemp">
                            <span>${Math.floor(cities.forecast.forecastday[i].day.maxtemp_c)}<sup>o</sup>C</span>
                        </div>
                        <div class="minTemp">
                            <span>${cities.forecast.forecastday[i].day.mintemp_c}<sup>o</sup>C</span>
                        </div>
                        <div class="status">
                            <span>${cities.forecast.forecastday[i].day.condition.text}</span>
                        </div>
                    </div>
                </div>
            `;
    }
  }
  rowData.innerHTML = cartona;
}
//?<--- display weather function ---->

