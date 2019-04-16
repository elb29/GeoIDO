nom = document.getElementById("input_thing");
valid = document.getElementById("val_thing");

valid.addEventListener("click", function() {
  envoiThing(nom.value)
});
ddd
function envoiThing(name) {


  var json = JSON.stringify({
    "name": name,
    "description": "Sensor system monitoring area temperature",
    "properties": {
      "Deployment Condition": "Deployed in a third floor balcony",
      "Case Used": "Radiation shield"
    }
  });


  var ajaxf = new XMLHttpRequest();
  ajaxf.open('POST', 'http://localhost:8080/FROST-Server/v1.0/Things', true);
  ajaxf.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  ajaxf.send(json);

}
