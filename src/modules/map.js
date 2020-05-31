var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
mapboxgl.accessToken = 'pk.eyJ1IjoiYW50b25rdXJkbyIsImEiOiJja2FzMGUzdzgwZmRlMnNvNTc2dm51bjR2In0.4BC6RAl-6fNN0Ge2HlQgug';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',   
    zoom: 10
});
map.addControl(new mapboxgl.NavigationControl());

export default function (lat, long) {
    map.flyTo({
        center: [long, lat]
    })
}