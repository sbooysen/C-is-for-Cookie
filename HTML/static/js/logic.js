// check to see if our code is working.
console.log("working");

// tile layer that will be the primary background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
	zoom: 11,
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
// REQUIRES FIX
// import zip code geojson polygons
d3.json("https://raw.githubusercontent.com/sbooysen/Final-Project-Data/catshtml/HTML/resources/zipboundaries.json").then(function(data) {

  L.geoJSON(data, {
      color: "#0000FF",
      fillColor: "#FFFF00",
      weight: 2
  }).addTo(zips);
  
  zips.addTo(map);
  });
// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Create All Sales overlay
// Bring in the cookie GeoJSON data.
d3.json("https://raw.githubusercontent.com/catsdata/GSDC/f97948f631014c04cdb0b31f2379f44432c03325/json/cookiesales.geojson?token=GHSAT0AAAAAABPXKKWDDQEYPYO7BPHDJFZ2YUOZSCQ").then(function(data) {

  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.allsales),
      color: "#000000",
      radius: getRadius(feature.properties.allsales),
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
    return "#98ee00";
  }

  // This function determines the radius of sales marker based on quantity of sales
  function getRadius(allsales) {
    if (allsales === 0) {
      return 1;
    }
    return allsales / 30;
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    	// We turn each feature into a circleMarker on the map.
    	pointToLayer: function(feature, latlng) {
      		console.log(data);
      		return L.circleMarker(latlng);
        },
      // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
     // We create a popup for each circleMarker to display the magnitude and location of the earthquake
     //  after the marker has been created and styled.
     onEachFeature: function(feature, layer) {
      layer.bindPopup("Total Boxes Sold: " + features.properties.allsales + "<br>Median Income: " + features.properties.medianincome);
    }
  }).addTo(allcookiesales);

  // Then we add the earthquake layer to our map.
  allcookiesales.addTo(map);
})

// // DELIVERABLE 2 - Step 3: Retrieve the major earthquake GeoJSON data >4.5 mag for the week.
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then(function(data) {

//   // DELIVERABLE 2 - Step 4: Use the same style as the earthquake data.
//   function styleInfo(feature) {
//     return {
//       opacity: 1,
//       fillOpacity: 1,
//       fillColor: getColor(feature.properties.mag),
//       color: "#000000",
//       radius: getRadius(feature.properties.mag),
//       stroke: true,
//       weight: 0.5
//     };
//   }
  
//   // DELIVERABLE 2 - Step 5: Change the color function to use three colors for the major earthquakes based on the magnitude of the earthquake.
//   function getColor(magnitude) {
//     if (magnitude > 6) {
//       return "#DC143C";
//     }
//     if (magnitude > 5) {
//       return "#FF8C00";
//     }
//     if (magnitude >= 4.5) {
//       return "#FFD700";
//     }
//     return "#F0E68C";
//   }
  
//   // DELIVERABLE 2 - Step 6: Use the function that determines the radius of the earthquake marker based on its magnitude.
//   function getRadius(magnitude) {
//     if (magnitude === 0) {
//       return 1;
//     }
//     return magnitude * 4;
//   }
  
//   // DELIVERABLE 2 - Step 7: Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
//   // sets the style of the circle, and displays the magnitude and location of the earthquake
//   //  after the marker has been created and styled.
//   // DELIVERABLE 2 - Step 8: Add the major earthquakes layer to the map.
//   // DELIVERABLE 2 - Step 9: Close the braces and parentheses for the major earthquake data.
//   L.geoJson(data, {
//     pointToLayer: function(feature, latlng) {
//       console.log(data);
//       return L.circleMarker(latlng);
//     },
//   style: styleInfo,
//   onEachFeature: function(feature, layer) {
//     layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
//   }
//   }).addTo(majorQuake);

//   majorQuake.addTo(map);
//   });


//   // Here we create a legend control object.
// let legend = L.control({
//   position: "bottomright"
// });

// // Then add all the details for the legend
// legend.onAdd = function() {
//   let div = L.DomUtil.create("div", "info legend");

//   const magnitudes = [0, 1, 2, 3, 4, 5];
//   const colors = [
//     "#98ee00",
//     "#d4ee00",
//     "#eecc00",
//     "#ee9c00",
//     "#ea822c",
//     "#ea2c2c"
//   ];

// // Looping through our intervals to generate a label with a colored square for each interval.
//   for (var i = 0; i < magnitudes.length; i++) {
//     console.log(colors[i]);
//     div.innerHTML +=
//       "<i style='background: " + colors[i] + "'></i> " +
//       magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
//     }
//     return div;
//   };

//   // Finally, we our legend to the map.
//   legend.addTo(map);


// // DELIVERABLE 1 - Step 3: Use d3.json to make a call to get our Tectonic Plate geoJSON data.
  
//   // Style the lines with a color and weight that will make it stand out on all maps.
//   // Add the tectonic layer group variable you created in Step 1 to the map, i.e., .addTo(tectonicPlates) and close the geoJSON() layer.
//   // Next, add the tectonic layer group variable to the map, i.e, tectonicPlates.addTo(map).
//   // Finally, close the d3.json() callback.

// d3.json("../../resources/zipboundaries2.json").then(function(data) {
//   console.log(data);
//   L.geoJSON(data, {
//     color: "#0000FF",
//     fillColor: "#FFFF00",
//     weight: 2
//   }).addTo(zips);
// });

// zips.addTo(map);

// });

