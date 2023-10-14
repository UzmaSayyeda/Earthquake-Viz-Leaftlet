// create map object
let map = L.map('map', {
    center: [45.52, -110.67],
    zoom: 4
});

// create tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', 
{foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

// use link to get GeoJson data
let response = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"



// get GeoJson data
d3.json(response).then(function(data){
    
    // style info function - 
    function styleInfo(feature) {
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
    
    // create function to get color based on depth
    function getColor(depth) {
        if (depth > 90) return '#EA2C2C';
        else if (depth > 70) return '#EA822C';
        else if (depth > 50) return '#EE9C00';
        else if (depth > 30) return '#EECC00';
        else if (depth > 10) return '#D4EE00';
        else return  '#98EE00';
         
    }

    // create function to get radius based on magnitude
    function getRadius(magnitude){
        if (magnitude === 0){
            return 1;
        } 
        return (magnitude)*4;
    }
    
    // create geojson layer
    L.geoJson(data, {
        // add circleMarker to map
        pointToLayer : function (feature, latlng){
            return L.circleMarker(latlng)
        },
        // use styleInfo function to style circleMarkers
        style: styleInfo,
       
        // bind a popup to each layer
        onEachFeature : function(feature, layer){
            layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><h4>Magnitude : ${feature.properties.mag}<br>Depth : ${feature.geometry.coordinates[2]}</h4><br>Time : ${new Date(feature.properties.time)}`);
        }
    }).addTo(map);
    


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

});