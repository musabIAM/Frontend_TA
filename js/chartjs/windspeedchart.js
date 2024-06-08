//chart wind
const xValues = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
let yValues = [4, 4, 5, 3, 2, 2, 2, 4, 7, 5, 6, 4, 4]; 

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
            callback: function(value) {
              return value + "°C";
            },
          },
          gridLines: {
            color: 'rgba(0, 0, 0, 1)',
            lineWidth: 1,
            borderDash: [3, 3],
          }
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
            color: 'rgba(0, 0, 0, 1)',
            lineWidth: 1,
            borderDash: [3, 3],
          },
          ticks: {
            fontColor: "black",
            callback: function(value, index) {
              if (value >= 6 && value <= 11) {
                return value + " a.m.";
              } else if (value == 12){
                return (value) + " p.m.";
              }
              else{
                return (value - 12) + " p.m."
              }
            },
          },
        },
      ],
    },
  },
});

//test api chart
// const apiUrl = "URL_API_MODEL_ML"; // Ganti dengan URL API model machine learning Anda

// // Fungsi untuk membuat permintaan ke API dan mendapatkan prediksi
// async function fetchPredictions() {
//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     return data.predictions; // Misalkan API mengembalikan prediksi dalam bentuk array
//   } catch (error) {
//     console.error("Error fetching predictions:", error);
//     return [];
//   }
// }

// // Inisialisasi chart setelah mendapatkan prediksi dari API
// async function initializeChart() {
//   const predictions = await fetchPredictions();
//   const xValues = predictions.map((_, i) => i + 1); // Contoh: 1, 2, 3, ...
//   const yValues = predictions;

//   new Chart("myChart", {
//     type: "line",
//     data: {
//       labels: xValues,
//       datasets: [
//         {
//           fill: false,
//           lineTension: 0,
//           backgroundColor: "rgba(0,0,255,1.0)",
//           borderColor: "rgba(0,0,255,0.1)",
//           data: yValues,
//         },
//       ],
//     },
//     options: {
//       legend: { display: false },
//       scales: {
//         yAxes: [
//           {
//             scaleLabel: {
//               display: true,
//               labelString: "Temperature (C)",
//             },
//           },
//         ],
//         xAxes: [
//           {
//             scaleLabel: {
//               display: true,
//               labelString: "Time (minutes)",
//             },
//           },
//         ],
//       },
//     },
//   });
// }

// // Panggil fungsi untuk inisialisasi chart setelah halaman dimuat
// initializeChart();
