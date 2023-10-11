// create map object
let map = L.map('map', {
    center: [45.52, -122.67],
    zoom: 4
});

// create tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', 
{foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
.addTo(map);

// use link to GeoJson data
let response = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// get GeoJSON data
d3.json(response).then (function(data){
    L.geoJSON(data, {style: function(feature){
        return{
            color : "000000",
            fillColor: depthColor(feature.geometry.coordinates[2]),
            radius: magRadius(feature.properties.mag),
        }
    },
    
        onEachFeature: function(feature, layer){
        layer.bindPopup(`<h3>${feature.properties.place}</h3> <h4>Magnitude : ${feature.properties.mag}</h4>`)
    }},
    {pointToLayer:function(feature){
        return L.circle([feature.geometry.coordinates[1],feature.geometry.coordinates[0]])
    }}).addTo(map)
});


// style function
function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: depthColor(feature.geometry.coordinates[2]),
      color: "#000000",
      radius: magRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }



// get color based on depth
function depthColor (depth){
    if (depth >= 1) return "a3f600";
    else if (depth >= 2) return "#dcf400";
    else if (depth >= 3) return "#f7db11";
    else if (depth >= 4) return "#fdb72a";
    else if (depth >= 5) return "#fca663";
    else return "#ff5f65";
}

// get size based on magnitude
function magRadius (mag){
    if (mag == 0) return 1;
    else return mag * 50
}