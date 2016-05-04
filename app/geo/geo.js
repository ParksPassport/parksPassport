mapboxgl.accessToken = 'pk.eyJ1IjoicGFya3NhcHAiLCJhIjoiY2lubTlubWw1MHpyN3U4a2pmcDgydXZ1byJ9.fLLOyWgTQ7gMfdCXtEmUAQ';

var map = new mapboxgl.Map({
  container: 'mapid',
  // style: 'mapbox://styles/mapbox/dark-v8',
  style: 'mapbox://styles/mapbox/emerald-v8',
  center: [-103.59179687498357, 40.66995747013945],
  zoom: 3
});

function addMapData(mapDataArr) {
  map.on('load', function(){
    map.addSource('earthquakes', {
      type: 'geojson',
      data: {
        'type': 'FeatureCollection',
        'crs': { 'type': 'name', 'properties': { 'name': 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
        'features': mapDataArr
      }
    });
    map.addLayer({
      'id': 'non-cluster-markers',
      'type': 'symbol',
      'source': 'earthquakes',
      'layout': {
        'icon-image': 'marker-15'
      }
    });
  });
}
