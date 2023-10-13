// create map object
let map = L.map('map', {
    center: [40.52, -94.67],
    zoom: 3
});

// create tile layer
let basemap = L.tileLayer(
    "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'",
    {
      attribution:
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// add "basemap" to tile layer
basemap.addTo(map);


// create layers
let tectonicplates = new L.LayerGroup();
let earthquakes = new L.LayerGroup();


// one layer at a time
let baseMaps = {
  "Earthquakes" : basemap,
};

let overlayMaps = {
  Tectonicplates : tectonicplates,
  Earthqaukes : earthquakes
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

// use link to get GeoJson data
let response = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// get GeoJson data
d3.json(response).then(function(data){

  // create a function for style
  function styleInfo(feature){
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.geometry.coordinates[2]),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  // create function to get colors based in depth
  function getColor(depth){
    if (depth > 90) return '#EA2C2C';
    else if (depth > 70) return '#EA822C';
    else if (depth > 50) return '#EE9C00';
    else if (depth > 30) return '#EECC00';
    else if (depth > 10) return '#D4EE00';
    else return  '#98EE00';
  }

  // create a function to get radius based on magnitude
  function getRadius(magnitude){
    if (magnitude === 0){
      return 1;
    } 
    return (magnitude)*4;
  }

  // create GeoJson layer
  L.geoJson(data, {
    pointToLayer : function(feature, latlng){
      return L.circleMarker(latlng)
    },
    style : styleInfo,

    onEachFeature : function(feature, layer){
      layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3> <h4>Magnitude : ${feature.properties.mag}<br>Depth : ${feature.geometry.coordinates[2]}</h4>`);
      }
    }).addTo(earthquakes);
  
    // set up legend
    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        let div = L.DomUtil.create('div', 'info legend');
            let grades = [-10, 10, 30, 50, 70, 90];
            
        // loop through our depth intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                "<i style='background:" + getColor(grades[i] + 1) + "'></i> " +
                grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }

        return div;
    };

    // add legend to the map
    legend.addTo(map);

    // add Tectonic plate GeoJson 

    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(tectData){

      // add GeoJson layer
      L.geoJson(tectData, {
        color: "orange", 
        weight : 2
      }).addTo(tectonicplates);

      tectonicplates.addTo(map);

    
    });
  });