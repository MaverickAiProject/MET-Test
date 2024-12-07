let userTab = document.querySelector(".your-weather");
let searchTab = document.querySelector(".search-weather");
let searchForm = document.querySelector(".search-form");
let grantAccessContainer = document.querySelector(".grant-access-container");
let userinfoContainer = document.querySelector(".user-info-container");
let loadingContaienr = document.querySelector(".loading-container");
let API_KEY = "b5ebc7282ef6ae324626d74584260279";

let errorImage = document.querySelector("[error-img]");

//Tab on which we are currently
let currentTab = userTab;

// for changing the background of the tab
currentTab.classList.add("current-tab");

//if the user has already granted access then the app will auto fetch the details and display if not then grant access container will be displayed again
checkSessionStorage();

//for switching tabs
function tabSwitch(clickedTab) {
  errorImage.classList.remove("error-active");

  // the tab that is clicked is different from the tab we are currently on then it will switch else there will be no change
  if (currentTab != clickedTab) {
    // ab jis tab main hm the usko show mt kro
    currentTab.classList.remove("current-tab");

    // ab current tab main jis tab ko hmne click kara hai usko daal do
    currentTab = clickedTab;

    // aur ab us tab ko show krdo
    currentTab.classList.add("current-tab");

    //ab agar hamara clicked tab search tab ke equal hai aur hmne search form ko display nhi kiya toh use display kro ab aur jo grant your weather ke jitne bhi tabs hai unka display hata do
    if (!searchForm.classList.contains("active")) {
      grantAccessContainer.classList.remove("active");
      userinfoContainer.classList.remove("active");
      searchForm.classList.add("active");
      console.log("search form active");
    }

    // agar clicked tab user tab ke equal hai toh search tab wale saare conatiner ko hata do aur session storge main jao check kro ki grant access diya hua hai ki nhi user ne
    else {
      console.log("your weather clicked");
      userinfoContainer.classList.remove("active");
      searchForm.classList.remove("active");
      checkSessionStorage();
    }
  }
}

userTab.addEventListener("click", (e) => {
  let element = e.target;
  tabSwitch(element);
});

searchTab.addEventListener("click", (e) => {
  let element = e.target;
  tabSwitch(element);
});

function checkSessionStorage() {
  //ab idhar hmne coordinates search krke object ko local coordinates main dala
  let localCoordinates = sessionStorage.getItem("user-coordinates");

  // ab agar access nhi mila hua toh mtlb coordinates nhi save honge session storage main aur local coordinates main null store ho jayega
  if (!localCoordinates) {
    // ab agar access nhi mila hua location ka toh grant access container show kro
    grantAccessContainer.classList.add("active");
  }

  // agar access diya hua hai toh ab user location ka weather data show kro usse pehle coordinates object ko as a json object store kro instead of json string
  else {
    const coordinates = JSON.parse(localCoordinates);

    // ab info ko render krdo weather info ko
    fetchUserWeatherInfo(coordinates);
  }
}

// ye idhar hm user ke current cordinates jo bhi hai uske hisab se weatherinfo fetch kr rhe hain
async function fetchUserWeatherInfo(coordinates) {
  console.log("fetch called");
  const { lat, lon } = coordinates;
  console.log(lat, lon);
  try {
    errorImage.classList.remove("active")
    grantAccessContainer.classList.remove("active")
    loadingContaienr.classList.add("active");
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    let data = await response.json();
    loadingContaienr.classList.remove("active");
    userinfoContainer.classList.add("active")
    // console.log(data);
    //agar fetch ho jata hai data toh screen pr render kro
    renderData(data);
  } catch (e) {
    //nhi toh error catch kro
    alert(`not fetchede ${e}`);
  }
}

//calback function for grant access location container access btn
function getLocation() {
  try {
    navigator.geolocation.getCurrentPosition(showPosition);
    console.log("accessing");
  } catch (e) {
    // alert(`Access Denied ${e}`);
  }
}

// call back function for geolocation api to fetch current location of user with the current coordinates accessed by geolocation api
function showPosition(position) {
  const coordinates = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };

  //before fetching the location we are storing the coordinates fetched in browser session storage and this storage gets cleared when the browser or the webpage is closed.
  sessionStorage.setItem("user-coordinates", JSON.stringify(coordinates));
  fetchUserWeatherInfo(coordinates);
}

let grantAccessButton = document.querySelector(".access-btn");

grantAccessButton.addEventListener("click", getLocation);

// idhar jo bhi data fetch hua hai use screen pr render kro
function renderData(weatherInfo) {
  const cityName = document.querySelector("[data-city-name]");
  const countryIcon = document.querySelector("[data-countryIcon]");
  const weather = document.querySelector("[data-weather]")
  const weatherIcon = document.querySelector("[data-weather-icon]")
  const temp = document.querySelector("[data-temp]")
  const windspeed = document.querySelector("[data-windspeed]")
  const humidity = document.querySelector("[data-humidity]")
  const cloudiness = document.querySelector("[data-cloudiness]")

  cityName.innerText = weatherInfo?.name;
  countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
  weather.innerText = weatherInfo?.weather?.[0].main;
  weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`
  temp.innerText = `${weatherInfo?.main?.temp} °C`;
  windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
  humidity.innerText = `${weatherInfo?.main?.humidity}%`;
  cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}

//seach krne pr ye wala fetch function call hoga kyonki ye city name se search kr rha hai
async function fetchSearchWeatherInfo(city) {
  try {
    errorImage.classList.remove("active")
    loadingContaienr.classList.add("active");
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    loadingContaienr.classList.remove("active");
    
    //fetch successful hota hai toh render kro data
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      userinfoContainer.classList.add("active")
      renderData(data)
    } 
    
    else {
      errorImage.classList.add("active");
      throw "something Went wrong";
    }
  } catch (e) {
    console.log(e);
  }
}

let searchInput = document.querySelector("[search-input]");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let city = searchInput.value;
  if (city !== "") {
    userinfoContainer.classList.remove("active")
    fetchSearchWeatherInfo(city);
  }
});