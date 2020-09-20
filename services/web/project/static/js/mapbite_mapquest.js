//  Solo muestra el mapa y debugeando lo de los pins, pero se comenta para usar google maps
L.mapquest.key = '8byM6IEA97GjNQXtwszG8VlHSb53Bsu3';

var map = L.mapquest.map('map', {
    center: [ 32.2103, -110.9306],
    layers: L.mapquest.tileLayer('map'),
    zoom: 14
});
map.addControl(L.mapquest.control());

fetch('/locations/14')
    .then(response => response.json())
    .then(data => {
        // var marker = L.marker([ 32.2103, -110.9306]).addTo(map);
        // marker.bindPopup('<b> Casa Ilse </b>');
        data.forEach( element => {
            L.marker(element.slice(1,3))
                .bindPopup(`<p> ${element[3]} </p>`)
                .addTo(map)
        })
        // data.foreach( element => console.log(element.slice(1,3)));
    });