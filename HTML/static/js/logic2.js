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
	center: [35.3015, -80.6438],
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

// create overlay object with data layers
let overlays = {
  "Overall Sales": allcookiesales,
  //"2019": nineteen,
  //"2020": twenty,
  //"2021": twentyone,
  //"2022": twentytwo,
  "Zip Code Boundaries": zips
};

// control capability on layers shown
L.control.layers(baseMaps, overlays).addTo(map);

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
      return "#ee3124";
    }
    if (allsales >= 30000) {
      return "#ff7818";
    }
    if (allsales >= 20000) {
      return "#f7be00";
    }
    if (allsales >= 10000) {
      return "#00b451";
    }
    if (allsales >= 5000) {
      return "#1496d4";
    }
    if (allsales >= 2000) {
      return "#9e5fd6";
    }
    if (allsales >= 500) {
      return "#fd329e";
    }
    return "#f3f3f3"
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
        "<br>Most Popular: " + feature.properties.popular +          
        "<br>Total Boxes Sold: " + feature.properties.allsales + 
        "<br>2019 Boxes Sold: " + feature.properties.sales2019 + 
        "<br>2020 Boxes Sold: " + feature.properties.sales2020 + 
        "<br>2021 Boxes Sold: " + feature.properties.sales2021 + 
        "<br>2022 Boxes Sold: " + feature.properties.sales2022);

        
  }
}).addTo(allcookiesales);

allcookiesales.addTo(map);
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// import zip code geojson polygons
d3.json("https://raw.githubusercontent.com/sbooysen/Final-Project-Data/catshtml/HTML/resources/zipboundaries.json").then(function(data) {

  function stylePoly(feature) {
    return {
      color: "#8934CD",
      fillOpacity: .33,
      fillColor: getFill(feature.properties.zipCode),
      weight: 1
    };
  }

  // This function determines the color of the marker based on the quanity of cookie sales.
  function getFill(zipCode) {
    if (zipCode == "28170") {return "#EF5350"};
    if (zipCode == "28135") {return "#EF5350"};
    if (zipCode == "28133") {return "#EF5350"};
    if (zipCode == "28119") {return "#EF5350"};
    if (zipCode == "28091") {return "#EF5350"};
    if (zipCode == "28007") {return "#EF5350"};
    if (zipCode == "28083") {return "#FFCA28"};
    if (zipCode == "28082") {return "#FFCA28"};
    if (zipCode == "28081") {return "#FFCA28"};
    if (zipCode == "28027") {return "#FFCA28"};
    if (zipCode == "28124") {return "#EC407A"}; 
    if (zipCode == "28107") {return "#EC407A"};
    if (zipCode == "28075") {return "#EC407A"};
    if (zipCode == "28026") {return "#EC407A"};
    if (zipCode == "28025") {return "#EC407A"};
    if (zipCode == "28078") {return "#42A5F5"};
    if (zipCode == "28070") {return "#42A5F5"};
    if (zipCode == "28036") {return "#42A5F5"};
    if (zipCode == "28035") {return "#42A5F5"};
    if (zipCode == "28031") {return "#42A5F5"};
    if (zipCode == "28280") {return "#FFEE58"};
    if (zipCode == "28216") {return "#FFEE58"};
    if (zipCode == "28215") {return "#FFEE58"};
    if (zipCode == "28214") {return "#FFEE58"};
    if (zipCode == "28208") {return "#FFEE58"};
    if (zipCode == "28202") {return "#FFEE58"};
    if (zipCode == "28130") {return "#FFEE58"};
    if (zipCode == "28269") {return "#66BB6A"};
    if (zipCode == "28262") {return "#66BB6A"};
    if (zipCode == "28213") {return "#66BB6A"};
    if (zipCode == "28206") {return "#66BB6A"};
    if (zipCode == "28227") {return "#9CCC65"};
    if (zipCode == "28212") {return "#9CCC65"};
    if (zipCode == "28205") {return "#9CCC65"};
    if (zipCode == "28270") {return "#D4E157"};
    if (zipCode == "28211") {return "#D4E157"};
    if (zipCode == "28105") {return "#D4E157"};
    if (zipCode == "28278") {return "#29B6F6"};
    if (zipCode == "28273") {return "#29B6F6"};
    if (zipCode == "28217") {return "#29B6F6"};
    if (zipCode == "28277") {return "#26C6DA"};
    if (zipCode == "28134") {return "#26C6DA"};
    if (zipCode == "28226") {return "#26A69A"};
    if (zipCode == "28210") {return "#26A69A"};
    if (zipCode == "28209") {return "#26A69A"};
    if (zipCode == "28207") {return "#26A69A"};
    if (zipCode == "28204") {return "#26A69A"};
    if (zipCode == "28203") {return "#26A69A"};
    if (zipCode == "27371") {return "#D4E157"};
    if (zipCode == "27356") {return "#D4E157"};
    if (zipCode == "27306") {return "#D4E157"};
    if (zipCode == "27229") {return "#D4E157"};
    if (zipCode == "27209") {return "#D4E157"};
    if (zipCode == "28159") {return "#5C6BC0"};
    if (zipCode == "28147") {return "#5C6BC0"};
    if (zipCode == "28146") {return "#5C6BC0"};
    if (zipCode == "28145") {return "#5C6BC0"};
    if (zipCode == "28144") {return "#5C6BC0"};
    if (zipCode == "28138") {return "#5C6BC0"};
    if (zipCode == "28125") {return "#5C6BC0"};
    if (zipCode == "28088") {return "#5C6BC0"};
    if (zipCode == "28072") {return "#5C6BC0"};
    if (zipCode == "28071") {return "#5C6BC0"};
    if (zipCode == "28041") {return "#5C6BC0"};
    if (zipCode == "28039") {return "#5C6BC0"};
    if (zipCode == "28023") {return "#5C6BC0"};
    if (zipCode == "27054") {return "#5C6BC0"};
    if (zipCode == "27013") {return "#5C6BC0"};
    if (zipCode == "28163") {return "#FFCA28"};
    if (zipCode == "28137") {return "#FFCA28"};
    if (zipCode == "28129") {return "#FFCA28"};
    if (zipCode == "28128") {return "#FFCA28"};
    if (zipCode == "28127") {return "#FFCA28"};
    if (zipCode == "28097") {return "#FFCA28"};
    if (zipCode == "28009") {return "#FFCA28"};
    if (zipCode == "28002") {return "#FFCA28"};
    if (zipCode == "28001") {return "#FFCA28"};
    if (zipCode == "28104") {return "#A1887F"};
    if (zipCode == "28079") {return "#A1887F"};
    if (zipCode == "28174") {return "#8D6E63"};
    if (zipCode == "28112") {return "#8D6E63"};
    if (zipCode == "28111") {return "#8D6E63"};
    if (zipCode == "28110") {return "#8D6E63"};
    if (zipCode == "28103") {return "#8D6E63"};
    if (zipCode == "28173") {return "#795548"};
    if (zipCode == "28108") {return "#795548"};
    if (zipCode == "28106") {return "#795548"};
    if (zipCode == "29745") {return "#BDBDBD"};
    if (zipCode == "29743") {return "#BDBDBD"};
    if (zipCode == "29742") {return "#BDBDBD"};
    if (zipCode == "29734") {return "#BDBDBD"};
    if (zipCode == "29733") {return "#BDBDBD"};
    if (zipCode == "29732") {return "#BDBDBD"};
    if (zipCode == "29731") {return "#BDBDBD"};
    if (zipCode == "29730") {return "#BDBDBD"};
    if (zipCode == "29726") {return "#BDBDBD"};
    if (zipCode == "29717") {return "#BDBDBD"};
    if (zipCode == "29704") {return "#BDBDBD"};
    if (zipCode == "29716") {return "#9E9E9E"};
    if (zipCode == "29715") {return "#9E9E9E"};
    if (zipCode == "29710") {return "#9E9E9E"};
    if (zipCode == "29708") {return "#9E9E9E"};
    return "#e7e7e7"
    };

  L.geoJSON(data, {
      style: stylePoly 
  }).addTo(zips);
  
zips.addTo(map);
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



// LEGEND

let legend = L.control({
  position: "bottomright"
});

legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

  const sales = ['0', '500', '2k', '5k', '10k', '20k', '30k', '40k'];
  const colors = [
    "#f3f3f3",
    "#fd329e",
    "#9e5fd6",
    "#1496d4",
    "#00b451",
    "#f7be00",
    "#ff7818",
    "#ee3124"
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