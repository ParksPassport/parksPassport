var mymap = L.map('mapid').setView([40.669, -103.591], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/parksapp/cint5xilc00azbvm1sp1no0uj/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGFya3NhcHAiLCJhIjoiY2lubTlubWw1MHpyN3U4a2pmcDgydXZ1byJ9.fLLOyWgTQ7gMfdCXtEmUAQ', {
  attribution: 'Map data &copy;Visit Your Parks | Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 11,
  // id: 'your.mapbox.project.id',
  accessToken: 'pk.eyJ1IjoicGFya3NhcHAiLCJhIjoiY2lubTlubWw1MHpyN3U4a2pmcDgydXZ1byJ9.fLLOyWgTQ7gMfdCXtEmUAQ'
}).addTo(mymap);

function addMapData(mapDataArr) {
  mapDataArr.forEach((park)=>{
    var marker = L.marker([park.geometry.coordinates[1],park.geometry.coordinates[0]])
    .bindPopup(park.properties.UNIT_NAME)
    .addTo(mymap);
  });
}

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');
  L.marker([crd.latitude, crd.longitude])
  .bindPopup('My Location')
  .addTo(mymap);
  // L.map('mapid').setView([crd.latitude, crd.longitude], 10);
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

navigator.geolocation.getCurrentPosition(success, error, options);
