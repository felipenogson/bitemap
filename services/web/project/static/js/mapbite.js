let map, infoWindow;
var buttons = [];
var markers = [];
var current= {};

function initMap() {
    var robinson_lab= {lat: 32.2518933, lng: -110.8329961};
    var map = new google.maps.Map(document.getElementById('map'), {zoom: 11, center: robinson_lab});
    infoWindow = new google.maps.InfoWindow();

    // Intento de geolocalización con HTML5
    if( navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            position => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                infoWindow.setPosition(pos);
                infoWindow.setContent("Location found");
                infoWindow.open(map);
                map.setCenter(pos);
            },
            () => {
                handleLocationError(true, infoWindow, map.setCenter());
            }
        );
    }else {
        // browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    

    function create_button(marker, ele){
        // marker es el objeto de googlemaps para un marcador y ele es el id de el elemento del template html donde 
        // hubicar el boton
        var menu = document.getElementById(ele);
        var button = document.createElement('a');
        button.textContent = marker.title;
        button.setAttribute('class', 'collapse-item');
        button.setAttribute('href', '#');
        button.addEventListener('click', function(){
            if(button.classList.contains('pinned')){
                marker.setMap(null)
            }
            else{
                marker.setMap(map);
            };
            button.classList.toggle('pinned');
            });
        buttons.push(button);
        menu.appendChild(button);
    }

    // Busca los 5 datos en el api local, y genera los botones
    fetch('/doctors/5')
        .then(response => response.json())
        .then(data => {
            data.forEach( element => {
            var mark = {lat: parseFloat(element[1]), lng: parseFloat(element[2])};
            var marker = new google.maps.Marker({
                position: mark, 
                title: element[3],
                animation: google.maps.Animation.DROP,
                map: null});
            markers.push(marker);
            create_button(marker, 'Dentists');
                });
    });
    // Busca los 5 datos en el api local, y genera los botones
    fetch('/last-locs/5')
        .then(response => response.json())
        .then(data => {
            data.forEach( element => {
            var mark = {lat: parseFloat(element[1]), lng: parseFloat(element[2])};
            var marker = new google.maps.Marker({
                position: mark, 
                title: element[3],
                animation: google.maps.Animation.DROP,
                map: null});
            markers.push(marker);
            create_button(marker, 'last-locations');
                });
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos){
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
        ? "Error: The Geolocation service failed"
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}