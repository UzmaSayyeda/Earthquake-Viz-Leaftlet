let response = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(response).then(function(data){
    createFeatures(data.features); // need to make a function to do this
});





function createFeatures(earthquakeData){
    function onEachFeature(feature, layer){
        
        layer.bindPopup(`<h3>${feature.properties.place}</h3> <h4>Magnitude : ${feature.properties.mag}</h4>`);
    }

    let earthquakes = L.geoJson(earthquakeData, {
        onEachFeature : onEachFeature
    });

  
    
    createMap(earthquakes);
}


function depthColor (depth){
    if (depth >= 1) return ""
    else if (depth >= 2) return "#a3f600"
    else if (depth >= 3) return "#dcf400"
    else if (depth >= 4) return "#f7db11"
    else if (depth >= 5) return "#fdb72a"
    else if (depth >= 6) return "#fca663"
    else return "#ff5f65";
}

function magSize(magnitude){
    return magnitude;
}

function createMap(earthquakesLayer){
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// only one layer to show at a time
let baseMaps = {
    Street : street,
    Topography : topo
}

let overlayMaps = {
    Earthquakes : earthquakesLayer
}

let map = L.map("map", {
    center : [37.09, -95.71],
    zoom : 5,
    layers : [street, earthquakesLayer]
});

L.control.layers(baseMaps, overlayMaps).addTo(map);
}



    



