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
      return "#ff0000";
    }
    if (allsales >= 30000) {
      return "#ffa500";
    }
    if (allsales >= 20000) {
      return "#ffff00";
    }
    if (allsales >= 10000) {
      return "#008000";
    }
    if (allsales >= 5000) {
      return "#0000ff";
    }
    if (allsales >= 2000) {
      return "#4b0082";
    }
    if (allsales >= 500) {
      return "#ee82ee";
    }
    return "#f5f5f5"
  };

  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
      },
    style: styleInfo,
    onEachFeature: function(feature, layer) {
      layer.bindPopup(
        "Zip Code: " + feature.properties.zip + 
        "<br>Primary Service Unit: " + feature.properties.serviceunitname + 
        "<br>Median Income: $" + feature.properties.medianincome + 
        "<br>Total Boxes Sold: " + feature.properties.allsales + 
        "<br>2019 Boxes Sold: " + feature.properties.sales2019 + 
        "<br>2020 Boxes Sold: " + feature.properties.sales2020 + 
        "<br>2021 Boxes Sold: " + feature.properties.sales2021 + 
        "<br>2022 Boxes Sold: " + feature.properties.sales2022);
  }
}).addTo(allcookiesales);

allcookiesales.addTo(map);
});

// LEGEND
// NEED TO FLIP LEGEND CODE

let legend = L.control({
  position: "bottomright"
});

legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

  const sales = ['0', '500', '2k', '5k', '10k', '20k', '30k', '40k'];
  const colors = [
    "#D3D3D3",
    "#ee82ee",
    "#4b0082",
    "#0000ff",
    "#008000",
    "#ffff00",
    "#ffa500",
    "#ff0000"
  ];

  for (var i = 0; i < sales.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      sales[i] + (sales[i + 1] ? "&ndash;" + sales[i + 1] + "<br>" : "+");
    }
    return div;
  };

  legend.addTo(map);

;