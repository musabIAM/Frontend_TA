tampilSoil();
var data_soil;
async function tampilSoil(){

data_soil = await getDataSoil();

var silede = Object.keys(data_soil);
var str = '<ul id="infoList">';
var count = 1;

silede.forEach(function(slide) {
  str += '<li id="'+slide+'" onclick="showInfo(\''+slide+'\')"> Soil Test '+count+ '</li>';
  count++;
})

str += '</ul>';
document.getElementById("TampilSoil").innerHTML = str;

}

async function getDataSoil(){
  const response = await fetch("http://localhost:8080/router/tampil_soil");
  const data = await response.json();
  return data.data;
}

async function getHistorySoil(id_alat){
  const response = await fetch("http://localhost:8080/router/tampil_history_soil",{
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: id_alat}),
  });
  const data = await response.json();
  return data.data.data;
}



// Fuzzy Logic Function
function fuzzyMembership(value, min, max) {
  if (value <= min || value >= max) {
      return 0;
  }
  let mid = (min + max) / 2;
  if (value <= mid) {
      return (value - min) / (mid - min);
  } else {
      return (max - value) / (max - mid);
  }
}

function categorizeValues(nitrogen, phosphorous, potassium, ph, moisture) {
  const categories = {
      'poor': {
          nitrogen: { min: 0, max: 150 },
          phosphorous: { min: 160, max: 200 },
          potassium: { min: 200, max: 250 },
          ph: { min: 0, max: 6 },
          moisture: { min: 0, max: 20 }
      },
      'moderate': {
          nitrogen: { min: 151, max: 200 },
          phosphorous: { min: 201, max: 350 },
          potassium: { min: 251, max: 400 },
          ph: { min: 6, max: 7.5 },
          moisture: { min: 20, max: 60 }
      },
      'good': {
          nitrogen: { min: 201, max: 250 },
          phosphorous: { min: 351, max: 500 },
          potassium: { min: 401, max: 600 },
          ph: { min: 7.5, max: 14 },
          moisture: { min: 61, max: 80 }
      }
  };

  let scores = {
      'poor': 0,
      'moderate': 0,
      'good': 0
  };

  for (const category in categories) {
      let nitrogenRange = categories[category].nitrogen;
      let phosphorousRange = categories[category].phosphorous;
      let potassiumRange = categories[category].potassium;
      let phRange = categories[category].ph;
      let moistureRange = categories[category].moisture;

      let nitrogenMembership = fuzzyMembership(nitrogen, nitrogenRange.min, nitrogenRange.max);
      let phosphorousMembership = fuzzyMembership(phosphorous, phosphorousRange.min, phosphorousRange.max);
      let potassiumMembership = fuzzyMembership(potassium, potassiumRange.min, potassiumRange.max);
      let phMembership = fuzzyMembership(ph, phRange.min, phRange.max);
      let moistureMembership = fuzzyMembership(moisture, moistureRange.min, moistureRange.max);

      scores[category] += (nitrogenMembership + phosphorousMembership + potassiumMembership + phMembership + moistureMembership) / 5;
  }

  let maxScore = -1;
  let chosenCategory = 'unknown';

  for (const category in scores) {
      if (scores[category] > maxScore) {
          maxScore = scores[category];
          chosenCategory = category;
      }
  }

  return chosenCategory;
}

// Define global variables to store markers for each soil type
var markers;

// Function to add marker for soil1
function addMarkerSoil1(data) {
removeMarkers();
markers = tambahkanMarker(data);
}
// Function to remove markers for all soil types
function removeMarkers() {
if (markers) {
  console.log('masuk')
  map.removeLayer(markers);
  markers = null;
}
}

// Function to add marker with popup
function tambahkanMarker(data) {
// Determine soil category using fuzzy logic
const category = categorizeValues(data.n, data.p, data.k, data.ph, data.moisture);

// Tentukan warna ikon berdasarkan kategori tanah
var iconColor;
if (category === 'poor') {
  iconColor = "red";
} else if (category === 'moderate') {
  iconColor = "yellow";
} else {
  iconColor = "green";
}

// Create marker with popup
var marker = L.marker([data.LAT, data.LONG], {
  icon: L.divIcon({
    className: "custom-icon " + iconColor,
    iconSize: [10, 10],
  }),
})
.bindPopup(
  `
  <b>Alat ${data.alat}</b><br>
  N: ${data.n}<br>
  P: ${data.p}<br>
  K: ${data.k}<br>
  pH: ${data.ph}<br>
  Moisture: ${data.moisture}`
)
.addTo(map);

// Return the created marker
return marker;
}

// change value
async function showInfo(type) {

var data_history = await getHistorySoil(type)
data_history = data_history[data_history.length-1]
console.log(data_soil[type])


const infoListItem = document.querySelectorAll("#infoList li");
infoListItem.forEach((item) => item.classList.remove("active"));

const clickedItem = document.getElementById(type);
clickedItem.classList.add("active");

  var alat = {
    alat: data_soil[type].jenis_iot,
    LAT: data_soil[type].lat,
    LONG: data_soil[type].long,
    n: data_history.N, 
    p: data_history.P,
    k: data_history.K,
    ph: data_history.PH,
    moisture: data_history.mosit  
  };   
  document.getElementById("infoMoisture").textContent = alat.moisture + " %";
  document.getElementById("infopH").textContent = alat.ph;
  document.getElementById("infoN").textContent = alat.n;
  document.getElementById("infoP").textContent = alat.p;
  document.getElementById("infoK").textContent = alat.k ;
  document.getElementById("coordinateLat").textContent = alat.LAT;
  document.getElementById("coordinateLong").textContent = alat.LONG;
  addMarkerSoil1(alat);
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

// pop up data
function myFunction(event) {
var popup = event.currentTarget.querySelector(".popuptext");
popup.classList.toggle("show");
}

// pop up map
function movemap(){
window.location.href = "map_ta.html";
}

