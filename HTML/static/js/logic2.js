var map = L.map("map").setView([35.2271, -80.8431], 9);

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);