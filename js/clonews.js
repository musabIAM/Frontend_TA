let rainfallChart;
let temperatureChart;
let windspeedChart;
// change value

tampil_weather();
// tampil_weather_forcast();

async function tampil_weather(){
  var data_weather = await getWeather()

  
  var icon = data_weather.daily.weather_code[0]

  if(icon == 0){
    var str = "<i class=\"fas fa-sun\"></i>"
  }else if(icon == 80){
    var str = "<i class=\"fas fa-cloud-sun\"></i>"
  }

  var winds = "<p id=\"windDataS\">Wind Speed: "+data_weather.current.wind_speed_10m+"km/h</p>"
  winds += "<p id=\"windDataD\">Wind Direction: "+data_weather.current.wind_direction_10m+"°</p>"
  winds += "<p id=\"tempData\">Temperature: "+data_weather.current.temperature_2m+"°C</p>"
  winds += "<p id=\"rainfData\">Rainfall: "+data_weather.current.rain+"mm</p>"
  
  document.getElementById("weather_now").innerHTML = str;
  
  document.getElementById("winds").innerHTML = winds;
}

async function tampil_weather_forcast(){
  var data_weather = await getWeather()
  var icon = data_weather.daily.weather_code
  var str1 = ""
  for(let i = 1; i<=1; i++){
  console.log(icon[i])
  str1 += "<div class=\"card\"> <div class=\"content_data\"> <div class=\"info_data\"> <h3 id=\"nextDay"+i+"\"></h3> </div> <div class=\"info_time\">"
  if(icon[i] == 0){
    str1 += "<i class=\"fas fa-sun\"></i>"
  }else if(icon[i] == 45){
    str1 += "<i class=\"fas fa-cloud\"></i>"
  }
  }
  str1+="</div> </div> <button>View All</button> </div>"

  var str = "<div class=\"card\"> <div class=\"content_data\"> <div class=\"info_data\"> <h3 id=\"nextDay1\"></h3> </div> <div class=\"info_time\"> <i class=\"fas fa-cloud-rain\"></i> </div> </div> <button>View All</button> </div>"
  document.getElementById("weather_forcast").innerHTML = str;
}



async function getWeather(){
  const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-6.9222&longitude=107.6069&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code&timezone=Asia%2FBangkok");
  const data = await response.json();
  return data
}




function showInfo(type) {
  const infoListItem = document.querySelectorAll("#infoList li");
  infoListItem.forEach((item) => item.classList.remove("active"));

  const clickedItem = document.getElementById(type);
  clickedItem.classList.add("active");

  const icon = document.getElementById("icon");
  const infoValue = document.getElementById("infoValue");
  const data1 = document.getElementById("emoji-data1");
  const data2 = document.getElementById("emoji-data2");
  const data3 = document.getElementById("emoji-data3");

  if (type === "temperature") {
    icon.className = "fa-solid fa-temperature-quarter";
    infoValue.textContent = "__°C";
    data1.innerHTML =
      '<span style="font-weight: normal; font-family: Poppins, sans-serif; text-transform: lowercase"> > 26°C </span> <span>High</span>';
    data2.innerHTML =
      '<span style="font-weight: normal; font-family: Poppins, sans-serif; text-transform: lowercase"> 24°C - 26°C </span> <span>Normal</span>';
    data3.innerHTML =
      '<span style="font-weight: normal; font-family: Poppins, sans-serif; text-transform: lowercase"> < 24°C </span> <span>Low</span>';
    // chart
    const HourTime = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    const DataTemp = [22, 24, 24, 25, 27, 30, 33, 32, 31, 29, 27, 26, 25];

    // Create canvas element
    const canvas = document.createElement("canvas");
    canvas.id = "myChart";
    canvas.style.width = "100%";
    canvas.style.maxWidth = "400px";

    if (temperatureChart) {
      temperatureChart.destroy();
    }

    // Append canvas to chart-wrapper
    const chartWrapper = document.querySelector(".chart-wrapper");
    chartWrapper.innerHTML = '';
    chartWrapper.appendChild(canvas);

    // Create chart
    temperatureChart = new Chart("myChart", {
      type: "line",
      data: {
        labels: HourTime,
        datasets: [
          {
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,0,1.0)",
            borderColor: "rgba(0,0,0,0.5)",
            data: DataTemp,
            borderWidth: 5,
            borderDash: [5, 2],
          },
        ],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Weather Station (Temperature Sensors)",
          fontFamily: "Poppins",
          fontSize: 8,
          fontStyle: "italic",
          fontColor: "black",
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Temperature (C)",
                fontFamily: "Poppins",
                fontSize: 8,
                fontStyle: "italic",
                fontColor: "black",
              },
              ticks: {
                min: 22,
                max: 34,
                fontColor: "black",
                callback: function (value) {
                  return value + " °C";
                },
              },
              gridLines: {
                color: "rgba(0, 0, 0, 1)",
                lineWidth: 1,
                borderDash: [3, 3],
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Time (Hour)",
                fontFamily: "Poppins",
                fontSize: 8,
                fontStyle: "italic",
                fontColor: "black",
              },
              gridLines: {
                color: "rgba(0, 0, 0, 1)",
                lineWidth: 1,
                borderDash: [3, 3],
              },
              ticks: {
                fontColor: "black",
                callback: function (value, index) {
                  if (value >= 6 && value <= 11) {
                    return value + " a.m.";
                  } else if (value == 12) {
                    return value + " p.m.";
                  } else {
                    return value - 12 + " p.m.";
                  }
                },
              },
            },
          ],
        },
      },
    });

    //update data
    const Temperature = 22;
    document.getElementById("infoValue").textContent = Temperature + " °C";
    const emojiElement = document.querySelector(".emoji-berubah");
    function updateEmojiClass(Temperature) {
      if (Temperature < 24) {
        emojiElement.classList.remove("fa-regular", "fa-face-smile");
        emojiElement.classList.add("fa-regular", "fa-face-sad-cry");
        emojiElement.style.color = "#c2a346";
      } else if (Temperature > 26) {
        emojiElement.classList.remove("fa-regular", "fa-face-smile");
        emojiElement.classList.add("fa-regular", "fa-face-tired");
        emojiElement.style.color = "#D24545";
      } else {
        emojiElement.classList.remove(
          "fa-regular",
          "fa-face-sad-cry",
          "fa-face-tired"
        );
        emojiElement.classList.add("fa-regular", "fa-face-smile");
        emojiElement.style.color = "#337357";
      }
    }
    updateEmojiClass(Temperature);
  } else if (type === "rainfall") {
    icon.className = "fa-solid fa-cloud-rain";
    infoValue.textContent = "__ mm";
    data1.innerHTML =
      '<span style="font-weight: normal; font-family: Poppins, sans-serif; text-transform: lowercase">> 8 mm </span> <span>High</span>';
    data2.innerHTML =
      '<span style="font-weight: normal; font-family: Poppins, sans-serif; text-transform: lowercase"> 2 mm - 8 mm </span> <span>Normal</span>';
    data3.innerHTML =
      '<span style="font-weight: normal; font-family: Poppins, sans-serif; text-transform: lowercase"> < 2 mm </span> <span>Low</span>';
    // chart
    const HourTime = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    const DataRain = [2, 2, 3, 2, 2, 3, 4, 4, 5, 2, 1, 2, 2];

    // Create canvas element
    const canvas = document.createElement("canvas");
    canvas.id = "myChart";
    canvas.style.width = "100%";
    canvas.style.maxWidth = "400px";

    if (rainfallChart) {
      rainfallChart.destroy();
    }

    // Append canvas to chart-wrapper
    const chartWrapper = document.querySelector(".chart-wrapper");
    chartWrapper.innerHTML = '';
    chartWrapper.appendChild(canvas);

    // Create chart
    rainfallChart = new Chart("myChart", {
      type: "line",
      data: {
        labels: HourTime,
        datasets: [
          {
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,0,1.0)",
            borderColor: "rgba(0,0,0,0.5)",
            data: DataRain,
            borderWidth: 5,
            borderDash: [5, 2],
          },
        ],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Weather Station (Rainfall Sensors)",
          fontFamily: "Poppins",
          fontSize: 8,
          fontStyle: "italic",
          fontColor: "black",
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Rainfall (mm)",
                fontFamily: "Poppins",
                fontSize: 8,
                fontStyle: "italic",
                fontColor: "black",
              },
              ticks: {
                min: 0,
                max: 9,
                fontColor: "black",
                callback: function (value) {
                  return value + " mm";
                },
              },
              gridLines: {
                color: "rgba(0, 0, 0, 1)",
                lineWidth: 1,
                borderDash: [3, 3],
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Time (Hour)",
                fontFamily: "Poppins",
                fontSize: 8,
                fontStyle: "italic",
                fontColor: "black",
              },
              gridLines: {
                color: "rgba(0, 0, 0, 1)",
                lineWidth: 1,
                borderDash: [3, 3],
              },
              ticks: {
                fontColor: "black",
                callback: function (value, index) {
                  if (value >= 6 && value <= 11) {
                    return value + " a.m.";
                  } else if (value == 12) {
                    return value + " p.m.";
                  } else {
                    return value - 12 + " p.m.";
                  }
                },
              },
            },
          ],
        },
      },
    });

    //update data
    const rainFall = 4;
    document.getElementById("infoValue").textContent = rainFall + " mm";
    const emojiElement = document.querySelector(".emoji-berubah");
    function updateEmojiClass(rainFall) {
      if (rainFall < 2) {
        emojiElement.classList.remove("fa-regular", "fa-face-smile");
        emojiElement.classList.add("fa-regular", "fa-face-sad-cry");
        emojiElement.style.color = "#c2a346";
      } else if (rainFall > 8) {
        emojiElement.classList.remove("fa-regular", "fa-face-smile");
        emojiElement.classList.add("fa-regular", "fa-face-tired");
        emojiElement.style.color = "#D24545";
      } else {
        emojiElement.classList.remove(
          "fa-regular",
          "fa-face-sad-cry",
          "fa-face-tired"
        );
        emojiElement.classList.add("fa-regular", "fa-face-smile");
        emojiElement.style.color = "#337357";
      }
    }
    updateEmojiClass(rainFall);
  } else if (type === "windSpeed") {
    icon.className = "fa-solid fa-fan";
    infoValue.textContent = "__ m/s";
    infoValue.style.textTransform = "lowercase";
    data1.innerHTML =
      '<span style="font-weight: normal; font-family: Poppins, sans-serif; text-transform: lowercase">> 9 m/s </span> <span>High</span>';
    data2.innerHTML =
      '<span style="font-weight: normal; font-family: Poppins, sans-serif; text-transform: lowercase"> 4 m/s - 9 m/s </span> <span>Normal</span>';
    data3.innerHTML =
      '<span style="font-weight: normal; font-family: Poppins, sans-serif; text-transform: lowercase"> < 4 m/s </span> <span>Low</span>';
    // chart
    // chart
    const HourTime = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    const DataWinds = [4, 4, 5, 3, 2, 2, 2, 4, 7, 5, 6, 4, 4];

    // Create canvas element
    const canvas = document.createElement("canvas");
    canvas.id = "myChart";
    canvas.style.width = "100%";
    canvas.style.maxWidth = "400px";

    if (windspeedChart) {
      windspeedChart.destroy();
    }

    // Append canvas to chart-wrapper
    const chartWrapper = document.querySelector(".chart-wrapper");
    chartWrapper.innerHTML = '';
    chartWrapper.appendChild(canvas);

    // Create chart
    windspeedChart = new Chart("myChart", {
      type: "line",
      data: {
        labels: HourTime,
        datasets: [
          {
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,0,1.0)",
            borderColor: "rgba(0,0,0,0.5)",
            data: DataWinds,
            borderWidth: 5,
            borderDash: [5, 2],
          },
        ],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Weather Station (WindSpeed Sensors)",
          fontFamily: "Poppins",
          fontSize: 8,
          fontStyle: "italic",
          fontColor: "black",
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "WindSpeed (m/s)",
                fontFamily: "Poppins",
                fontSize: 8,
                fontStyle: "italic",
                fontColor: "black",
              },
              ticks: {
                min: 0,
                max: 7,
                fontColor: "black",
                callback: function (value) {
                  return value + " m/s";
                },
              },
              gridLines: {
                color: "rgba(0, 0, 0, 1)",
                lineWidth: 1,
                borderDash: [3, 3],
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Time (Hour)",
                fontFamily: "Poppins",
                fontSize: 8,
                fontStyle: "italic",
                fontColor: "black",
              },
              gridLines: {
                color: "rgba(0, 0, 0, 1)",
                lineWidth: 1,
                borderDash: [3, 3],
              },
              ticks: {
                fontColor: "black",
                callback: function (value, index) {
                  if (value >= 6 && value <= 11) {
                    return value + " a.m.";
                  } else if (value == 12) {
                    return value + " p.m.";
                  } else {
                    return value - 12 + " p.m.";
                  }
                },
              },
            },
          ],
        },
      },
    });
    //update data
    const windspeed = 20;
    document.getElementById("infoValue").textContent = windspeed + " m/s";
    const emojiElement = document.querySelector(".emoji-berubah");
    function updateEmojiClass(windspeed) {
      if (windspeed < 4) {
        emojiElement.classList.remove("fa-regular", "fa-face-smile");
        emojiElement.classList.add("fa-regular", "fa-face-sad-cry");
        emojiElement.style.color = "#c2a346";
      } else if (windspeed > 9) {
        emojiElement.classList.remove("fa-regular", "fa-face-smile");
        emojiElement.classList.add("fa-regular", "fa-face-tired");
        emojiElement.style.color = "#D24545";
      } else {
        emojiElement.classList.remove(
          "fa-regular",
          "fa-face-sad-cry",
          "fa-face-tired"
        );
        emojiElement.classList.add("fa-regular", "fa-face-smile");
        emojiElement.style.color = "#337357";
      }
    }
    updateEmojiClass(windspeed);
  } else if (type === "windDirection") {
    icon.className = "fa-solid fa-wind";
    infoValue.textContent = "__";
    data1.innerHTML =
      '<span style="font-weight: normal; font-family: Poppins, sans-serif; text-transform: lowercase"> -- </span> <span>High</span>';
    data2.innerHTML =
      '<span style="font-weight: normal; font-family: Poppins, sans-serif; text-transform: lowercase"> -- </span> <span>Normal</span>';
    data3.innerHTML =
      '<span style="font-weight: normal; font-family: Poppins, sans-serif; text-transform: lowercase"> -- </span> <span>Low</span>';

    //update data
    // const winddirection = 'Barat';
    //   document.getElementById('infoValue').textContent = temperature + "";
    //   const emojiElement = document.querySelector(".emoji-berubah");
    //   function updateEmojiClass(winddirection) {
    //     if (temperature < 24) {
    //       emojiElement.classList.remove("fa-regular", "fa-face-smile");
    //       emojiElement.classList.add("fa-regular", "fa-face-sad-cry");
    //       emojiElement.style.color = "#c2a346;";
    //     } else if (temperature > 26) {
    //       emojiElement.classList.remove("fa-regular", "fa-face-smile");
    //       emojiElement.classList.add("fa-regular", "fa-face-tired");
    //       emojiElement.style.color = "#D24545";
    //     } else {
    //       emojiElement.classList.remove(
    //         "fa-regular",
    //         "fa-face-sad-cry",
    //         "fa-face-tired"
    //       );
    //       emojiElement.classList.add("fa-regular", "fa-face-smile");
    //       emojiElement.style.color = "#337357";
    //     }
    //   }
    //   updateEmojiClass(temperature);
  }
}

// navbar
function toggleActiveClass(element) {
  var myList = document.getElementById("myList");
  var listItems = myList.getElementsByTagName("li");

  // Menonaktifkan class "active" dari semua elemen <li>
  for (var i = 0; i < listItems.length; i++) {
    listItems[i].getElementsByTagName("a")[0].classList.remove("active");
  }

  // Mengaktifkan class "active" pada elemen yang diklik
  element.classList.add("active");
}
