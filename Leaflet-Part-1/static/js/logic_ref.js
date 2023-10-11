// let response = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// d3.json(response).then(function(data){
//     createFeatures(data.features);
    
// });


// style info function - 
function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: depthColor(feature.geometry.coordinates[2]),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

// function createFeatures(earthquakeData){


        
//     // d3.json(response).then(createMarkers);
    

//     function onEachFeature(feature, layer){
        
//         layer.bindPopup(`<h3>${feature.properties.place}</h3> <h4>Magnitude : ${feature.properties.mag}</h4>`);
//     }

//     let earthquakes = L.geoJson(earthquakeData, {
//         onEachFeature : onEachFeature
//     });

//     function depthColor (depth){
//         if (depth >= 1) return ""
//         else if (depth >= 2) return "#a3f600"
//         else if (depth >= 3) return "#dcf400"
//         else if (depth >= 4) return "#f7db11"
//         else if (depth >= 5) return "#fdb72a"
//         else if (depth >= 6) return "#fca663"
//         else return "#ff5f65";
//     }
    
// //     function magSize(magnitude){
// //         return magnitude;
// //     }
    
//    createMap(earthquakes, );
// // }


// function createMap(earthquakesLayer){
//     let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// })



// let baseMaps = {
//     Street : street
    
// }

// let overlayMaps = {
//     Earthquakes : earthquakesLayer
// }

// let map = L.map("map", {
//     center : [37.09, -95.71],
//     zoom : 5,
//     layers : [street, earthquakesLayer]
// });

// L.control.layers(baseMaps, overlayMaps).addTo(map);
// }



// function createMarkers(response){

//     let locations  = response.features.geometry

//     let circleMarkers = []

//     for (let i = 0; i < location.length; i++){

//             let location = locations[i];
//             let circleMarkers = L.Circle([location.coordinates[1], location.coordinates[0]],{radius : magSize(feature.properties.mag)}).bindPopup(`<h3>${feature.properties.place}</h3> <h4>Magnitude : ${feature.properties.mag}</h4>`)

//             circleMarkers.push(circleMarkers);
//     }

//     createMap(L.layerGroup(circleMarkers))

}

