
// Création de la carte
var map = L.map('mapid').setView([46.0333300,4.0666700], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
// récupérer les éléments du code html
var graph = document.getElementById('graph');
var date = document.getElementById('date');
// Afficher les données sur la carte
var lay = L.featureGroup().addTo(map);


var obsli2 = [];
var xAbs2 =[];
var data = [];

$.ajax({
  url: 'http://localhost:8080/FROST-Server/v1.0/Datastreams',
  type: "GET",
  contentType: "application/json; charset=utf-8",
  success: function(data){
    datastream(0,data);

  },
  /**
   * fonction retourné si erreur dans la requette ajax
   *
   *
   */
  error: function(response, status){
    console.log(response);
    console.log(status);
  }
});

/**
 * fonction appelée lors de la première requette ajax sur le serveur FROST (Datastream), elle implémente plusieurs requettes ajax permettant
 d'accéder aux différentes parties du serveur. Elle permet l'affichage des "things" du serveur sur une cartes
(des différents capteurs et de leurs descriptions )
 et la création d'un graphique relié aux observations des capteurs reliés aux things.
 *
 * @param {int} i le nombre de "Things" qu'il y a dans le serveur
 * @param {string} datast réponse de la fonction ajax sur Datastream du serveur
 *
 *
 *
 *
 */

function datastream(i,datast) {



  /**
   * @type {String}
   */
  var datasens = datast.value[i]["Sensor@iot.navigationLink"];


  var ajax4 = new XMLHttpRequest();
  ajax4.open('GET', datast.value[i]["Observations@iot.navigationLink"]);
  ajax4.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  ajax4.send();

  /**
   * fonction appelée lors de la deuxième requette ajax sur le serveur FROST (Observations), permet de récupérer et d'afficher les observations dans un grpahique
   *
   *
   */
  ajax4.addEventListener('load',  function () {

    var obs = JSON.parse(ajax4.response);
    var obsli = [];
    var xAbs = [];

    for(j=0;j<obs.value.length;j++){
      obsli.push(obs.value[j].result);
      xAbs.push(j);
    };

    m = i+1
    date.innerHTML = "<br> date de début : " + obs.value[0].resultTime.substr(0,10) + "   date de fin : " + obs.value[obs.value.length-1].resultTime.substr(0,10) +"<br>" ;
    xAbs2.push(xAbs);
    obsli2.push(obsli);

    if(obsli2.length== datast.value.length){
      for (k=0;k<obsli2.length;k++){
        var trace1 = {
          x: xAbs2[k],
          y: obsli2[k],
          type: 'scatter'
        };
        data.push(trace1);
      }
      Plotly.newPlot(graph, data);
    }

  });

  var ajax1 = new XMLHttpRequest();
  ajax1.open('GET', datast.value[i]["Thing@iot.navigationLink"]);
  ajax1.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  ajax1.send();
  /**
   * fonction appelée lors de la troisième requette ajax sur le serveur FROST (Thing), elle va permettre l'accès à d'autres données
   *
   *
   */
  ajax1.addEventListener('load',  function () {
    var things = JSON.parse(ajax1.response);
    var ajax2 = new XMLHttpRequest();

    ajax2.open('GET', things["Locations@iot.navigationLink"]);
    ajax2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    ajax2.send();
    /**
     * fonction appelée lors de la quatrième requette ajax sur le serveur FROST (Location), permet de récupérer les coordonnées de chaque
     "things"
     *
     *
     */
    ajax2.addEventListener('load',  function () {
      var loca = JSON.parse(ajax2.response);
      var location = loca.value[0].location;

      location2 = location.substr(1,18);
      listLoc.push(location2.split(","));

      var ajax3 = new XMLHttpRequest();
      ajax3.open('GET', datasens);
      ajax3.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      ajax3.send();
      /**
       * fonction appelée lors de la cinquième requette ajax sur le serveur FROST (Sensor), permet de récupérer le nom du sensor associée et
       d'afficher les markers correspondant.
       *
       *
       */
      ajax3.addEventListener('load',  function () {
        var sensor = JSON.parse(ajax3.response);
        var marker = L.marker([parseFloat(listLoc[i][0]), parseFloat(listLoc[i][1])]);

        lay.addLayer(marker);
        marker.on('click', function() {
          marker.bindPopup("<b>"+things.name+"</b>"+"<br> capteurs :"+sensor.name+'<br><a href="data.html" target="_blank">Plus de detail</a>');
          });

          if(i+1 < datast.value.length){
              datastream(i+1,datast);
            }
      });
    });


  });

  };
