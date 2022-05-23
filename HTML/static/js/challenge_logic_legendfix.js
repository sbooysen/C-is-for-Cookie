// Check to see if code is working.
console.log("working");

// Streets tile layer map background.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Satellite tile layer map background.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Topographic tile layer map background.
let outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [20.6, -8.8],
	zoom: 2,
	layers: [streets]
});

// Base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Topographic": outdoors
};

// Leaflet Layer Groups defined.
let allEarthquakes = new L.LayerGroup();
let tectonic = new L.LayerGroup();
let majorQuake = new L.LayerGroup();

// Overlay Objects defined.
let overlays = {
  "Earthquakes": allEarthquakes,
  "Tectonic Plates": tectonic,
  "Major Earthquakes": majorQuake
};

// Map Visibility Control
L.control.layers(baseMaps, overlays).addTo(map);



// TECTONIC OVERLAY

d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(data) {

  L.geoJSON(data, {
      color: "#0000FF",
      fillColor: "#FFFF00",
      weight: 2
  }).addTo(tectonic);
  
  tectonic.addTo(map);
  });


  
// EARTHQUAKE OVERLAY

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  function getColor(magnitude) {
    if (magnitude >= 6) {
      return "#660000";
    }
    if (magnitude >= 5) {
      return "#ff6666";
    }
    if (magnitude >= 4.5) {
      return "#ffb366";
    }
    if (magnitude >= 4) {
      return "#ffff66";
    }
    if (magnitude >= 3) {
      return "#b3ff66";
    }
    if (magnitude >= 2) {
      return "#66ffb3";
    }
    if (magnitude >= 1) {
      return "#66ffff";
    }
    return "#98ee00";
  }

  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

  L.geoJson(data, {
    	pointToLayer: function(feature, latlng) {
      		console.log(data);
      		return L.circleMarker(latlng);
        },
      style: styleInfo,
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(allEarthquakes);

  allEarthquakes.addTo(map);



// MAJOR EARTHQUAKE OVERLAY

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then(function(data) {

  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
  
  function getColor(magnitude) {
    if (magnitude >= 6) {
      return "#660000";
    }
    if (magnitude >= 5) {
      return "#ff6666";
    }
    if (magnitude >= 4.5) {
      return "#ffb366";
    }
    return "#ffff66";
  }
  
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }
  
  L.geoJson(data, {
      pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
      },
      style: styleInfo,
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(majorQuake);

  majorQuake.addTo(map);
  });


// LEGEND

let legend = L.control({
  position: "bottomright"
});

legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

  const magnitudes = [0, 1, 2, 3, 4, 4.5, 5, 6];
  const colors = [
    "#66b3ff",
    "#66ffff",
    "#66ffb3",
    "#b3ff66",
    "#ffff66",
    "#ffb366",
    "#ff6666",
    "#660000"
  ];

  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
  };

  legend.addTo(map);

});


