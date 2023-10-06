// create a map object

let myMap = L.map("map",{
    center : [45.52, -122.67],
    zoom : 4.5
});

// add tile layer

let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(myMap);

let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"



// plot all earthquakes based on lon and lat

d3.json(geoData).then(function(response){
    let features = (response.features);

// let earthquakeData = [];

// for (i=0; i < features.length; i++){

//     let location = features[i].geometry
//     if (location){
//         earthquakeData.push([location.coordinates[1], location.coordinates[0]])
//     }
// }

// let earthquake = L.map(earthquakeData).addTo(myMap)

});

function createFeatures(earthquakeData){
    function onEachFeature(feature, layer){
        layer.bindPopup(`<h3>${feature.properties.mag}</h3> <p>${new Date(location.coordinates[3])}</p>`)
    }

    let earthquakes = L.geoJson(earthquakeData, {
        onEachFeature : onEachFeature
    });

    createMap(earthquakes);
}

function createMap(earthquakesLayer){
   


L.control.layer(earthquakesLayer).addTo(myMap);
}

// data marker is mag  of earthquake by size
// depth by color - 3rd coord
// L.circle(city.location, {
//     // radius: city.population/50,
//     radius : Math.sqrt(city.population)*50,
//     fillColor : "red",
//     fillOpacity:0.2,
//     color : "blue"}
// ).bindPopup(`<h1>City is ${city.name}</h1>  <h3>Population is ${city.population}</h3>`)
// .addTo(map);

// include pops with add info assoc when marker is clicked

// create a legend


