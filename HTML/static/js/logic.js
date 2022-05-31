// check to see if our code is working.
console.log("working");

const newLocal = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}';

// tile layer that will be the primary background of our map.
let streets = L.tileLayer(newLocal, {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// second tile layer that will be an optional background of our map.
let darkstreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// map object with center for Charlotte NC, zoom level for Charlotte and surrounding counties and default tile layer.
let map = L.map('mapid', {
	center: [35.2271, -80.8431],
	zoom: 9,
	layers: [streets]
});

// Test circle marker on map
// L.circle([35.2271, -80.8431], 2000).addTo(map);

// base layer that holds both tile layers
let baseMaps = {
  "Streets": streets,
  "Dark": darkstreets
};

// add data layers, including zip code boundaries
let allcookiesales = new L.LayerGroup();
let nineteen = new L.LayerGroup();
let twenty = new L.LayerGroup();
let twentyone = new L.LayerGroup();
let twentytwo = new L.LayerGroup();
let zips = new L.LayerGroup();

// create overlay objust with data layers
let overlays = {
  "Overall Sales": allcookiesales,
  "2019": nineteen,
  "2020": twenty,
  "2021": twentyone,
  "2022": twentytwo,
  "Zip Code Boundaries": zips
};

// control capability on layers shown
L.control.layers(baseMaps, overlays).addTo(map);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// import zip code geojson polygons
d3.json("https://raw.githubusercontent.com/sbooysen/Final-Project-Data/catshtml/HTML/resources/zipboundaries.json").then(function(data) {

  L.geoJSON(data, {
      color: "#8934CD",
      fillColor: "#34CD7C",
      weight: 1   
  }).addTo(zips);
  
  zips.addTo(map);
  });
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// Create All Sales overlay

// Bring in the cookie GeoJSON data.
d3.json("https://raw.githubusercontent.com/catsdata/catsdata.github.io/main/tempcook/sales.geojson").then(function(data) {

  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.allsales),
      color: "#000000",
      radius: 10,
      stroke: true,
      weight: 0.5
    };
  }

  // This function determines the color of the marker based on the quanity of cookie sales.
  function getColor(allsales) {
    if (allsales >= 40000) {
      return "#660000";
    }
    if (allsales >= 30000) {
      return "#ff6666";
    }
    if (allsales >= 20000) {
      return "#ffb366";
    }
    if (allsales >= 10000) {
      return "#ffff66";
    }
    if (allsales >= 5000) {
      return "#b3ff66";
    }
    if (allsales >= 2000) {
      return "#66ffb3";
    }
    if (allsales >= 500) {
      return "#66ffff";
    }
    return "#98ee00"
  };

  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
      },
    style: styleInfo,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Total Boxes Sold: " + feature.properties.allsales + "<br>Median Income: " + feature.properties.medianincome);
  }
}).addTo(allcookiesales);

allcookiesales.addTo(map);
});

