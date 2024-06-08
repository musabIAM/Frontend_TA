// Inisialisasi peta
var map = L.map("map").setView([-6.8245, 107.5615], 18);

// Layer OSM
var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});
osm.addTo(map);

// Layer satelit
var googleSat = L.tileLayer("http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
});
googleSat.addTo(map);

var myStyle = {
  color: "#ff0000",
  weight: 4,
  opacity: 1,
};

// GeoJSON
L.geoJSON(mapgeoJSON, {
  style: myStyle,
}).addTo(map);

// Fungsi fuzzy logic
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

// Data contoh
var alat1 = {
  alat: 1,
  LAT: -6.82435,
  LONG: 107.5615,
  n: 150, 
  p: 55,
  k: 50,
  ph: 6,
  moisture: 20
};

var alat2 = {
  alat: 2,
  LAT: -6.82442,
  LONG: 107.56175,
  n: 250,
  p: 155,
  k: 200,
  ph: 7,
  moisture: 75,
};


// Tambahkan marker untuk setiap titik
var tambahkanMarker = function(data) {
  const category = categorizeValues(data.n, data.p, data.k, data.ph, data.moisture);

  var iconColor;
  if (category === 'poor') {
    iconColor = "red";
  } else if (category === 'moderate') {
    iconColor = "yellow";
  } else {
    iconColor = "green";
  }

  L.marker([data.LAT, data.LONG], {
    icon: L.divIcon({
      className: "custom-icon " + iconColor,
      iconSize: [40, 40],
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
};

tambahkanMarker(alat1);
tambahkanMarker(alat2);
tambahkanMarker(alat3);
