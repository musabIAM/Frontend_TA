var map = L.map("map").setView([-6.8245, 107.5615], 18);

// OSM layer
var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});
osm.addTo(map);

// map satelit
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