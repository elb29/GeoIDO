// Les variables
var b1 = document.getElementById('b1');
var b2 = document.getElementById('b2');
var maison = L.icon({
    iconUrl: 'maison.png',
    iconSize: [15, 45],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});



var etablissement = L.icon({
    iconUrl: 'etablissement.png',
    iconSize: [30, 90],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});


// Les event-listeners
b1.addEventListener('click', menu_1)
b2.addEventListener('click', menu_2)

// Création de la carte
var map = L.map('mapid').setView([44.8, 0.8], 13);



L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var popup = L.popup();
// Afficher les données sur la carte
var data = "id=afficher";
var ajax = new XMLHttpRequest();
ajax.open('POST', 'dataviz.php');
ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
var marker_maison = [];
var marker_etablissement = [];
ajax.addEventListener('load',  function () {


    var jsonObj = JSON.parse(ajax.response);
    for(i=0;i<jsonObj.length;i++){
                var latitude_school = jsonObj[i].latitude_school;
                var longitude_school = jsonObj[i].longitude_school;
                var latitude_prof = jsonObj[i].latitude_prof;
                var longitude_prof = jsonObj[i].longitude_prof;
                
                
                var marker_e = L.marker([latitude_school, longitude_school],{icon: etablissement}).addTo(map);
                marker_etablissement.push(marker_e)


                var marker_m = L.marker([latitude_prof, longitude_prof], {icon: maison}).addTo(map);
                marker_maison.push(marker_m)
                
                
              }
            //   console.log(marker_etablissement)
            //   for(var i=0;i<marker_maison.length;i++){
            //     marker_maison[i].on("click",function(ev){
            //         var e=ev.target;
            // //         console.log(ev);
            //            popup
            //              .setLatLng(e.latlng)
            //              .setContent("You clicked the map at " + e.latlng.toString())
            //              .openOn(mymap);
               
            //     });
            // }




});
ajax.send(data);


function menu_1(){


}

function menu_2(){
    console.log("tata")
}

