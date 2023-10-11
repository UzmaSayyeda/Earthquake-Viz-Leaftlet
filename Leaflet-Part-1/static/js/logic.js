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
    
    // create geojson layer
    let geojson = L.geoJSON(data, {style: function(feature){
        return{
            opacity: 1,
            fillOpacity: 1,
            fillColor: depthColor(feature.geometry.coordinates[2]),
            color: "#000000",
            radius: magRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5,
        },
        L.circle([feature.geometry.coordinates[1],feature.geometry.coordinates[0]], 
            {radius : 500}).addTo(map);
    
    },
    
        // bind a popup to each layer
        onEachFeature: function(feature, layer){
            layer.bindPopup(`<h3>${feature.properties.place}</h3> <h4>Magnitude : ${feature.properties.mag}</h4>`)
            }},
            {pointToLayer:function(feature){
                return L.circle([feature.geometry.coordinates[1],feature.geometry.coordinates[0]])
            }}).addTo(map)
    
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
    // function depthColor (depth){
    //     if (depth >= 1) return "#a3f600";
    //     else if (depth >= 2) return "#dcf400";
    //     else if (depth >= 3) return "#f7db11";
    //     else if (depth >= 4) return "#fdb72a";
    //     else if (depth >= 5) return "#fca663";
    //     else return "#ff5f65";
    // }

    function depthColor(depth) {
        return depth > 70 ? '#a3f600' :
               depth > 50  ? '#dcf400' :
               depth > 30  ? '#f7db11' :
               depth > 10  ? '#fdb72a' :
               depth > -10   ? '#fca663' :
                               '#ff5f65';
    }

    // get size based on magnitude
    function magRadius (mag){
        if (mag == 0) return 1;
        else return mag * 50
    }

    let legend = L.control({position: "bottomright"});
    legend.onAdd = function(map){
        let div = L.DomUtil.create("div", "info legend");
        let grades = [-10,10,30,50,70,90];

        for(i=0; i < grades.length; i++){


            div.innerHTML +=
            '<i style="background:' + depthColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
        // div.innerHTML +=  '<i style = "background: #dcf400"></i><span>-10-30</span><br></br>';
        // div.innerHTML +=  '<i style = "background: #f7db11"></i><span>-30-50</span><br></br>';
        // div.innerHTML +=  '<i style = "background: #fdb72a"></i><span>-50-70</span><br></br>';
        // div.innerHTML +=  '<i style = "background: #fca663"></i><span>-70-90</span><br></br>';
        // div.innerHTML +=  '<i style = "background: #ff5f65"></i><span>-90+</span><br></br>';
        
        return div;
    };


    // Add legend to map https://codepen.io/haakseth/pen/KQbjdO
    legend.addTo(map);

   
});



    






