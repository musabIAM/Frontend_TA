//chart wind
const xValues = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
let yValues = [22, 24, 24, 25, 27, 30, 33, 32, 31, 29, 27, 26, 25];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,0,1.0)",
        borderColor: "rgba(0,0,0,0.5)",
        data: yValues,
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
              return value + "°C";
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
