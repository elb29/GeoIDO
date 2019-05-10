
var valid = document.getElementById("val_thing");
var monfichier = document.getElementById("files")
var inputType = "local";
var stepped = 0;

var csvInJson = {} ;

valid.addEventListener("click", function(){cleanOrNot(0)});

function cleanOrNot(numClean){
	if(document.getElementById("clean").checked) {
		if (numClean == 0) {
			$.ajax({
	  		url: "http://localhost:8080/FROST-Server/v1.0/Things",
	  		type: "DELETE",
			  contentType: "application/json; charset=utf-8",
			  success: function(data){
					cleanOrNot(1);

			  },
			  error: function(response, status){
			    console.log(response);
			    console.log(status);
	  		}
			});
		}
		else if (numClean == 1) {
			$.ajax({
	  		url: "http://localhost:8080/FROST-Server/v1.0/Observations",
	  		type: "DELETE",
			  contentType: "application/json; charset=utf-8",
			  success: function(data){
			    console.log(data);
					cleanOrNot(2);
			  },
			  error: function(response, status){
			    console.log(response);
			    console.log(status);
	  		}
			});
		}
		else if (numClean == 2) {
			$.ajax({
	  		url: "http://localhost:8080/FROST-Server/v1.0/Datastreams",
	  		type: "DELETE",
			  contentType: "application/json; charset=utf-8",
			  success: function(data){
			    console.log(data);
					cleanOrNot(3);
			  },
			  error: function(response, status){
			    console.log(response);
			    console.log(status);
	  		}
			});
		}
		else if (numClean == 3) {
			$.ajax({
	  		url: "http://localhost:8080/FROST-Server/v1.0/FeaturesOfInterest",
	  		type: "DELETE",
			  contentType: "application/json; charset=utf-8",
			  success: function(data){
			    console.log(data);
					cleanOrNot(4);
			  },
			  error: function(response, status){
			    console.log(response);
			    console.log(status);
	  		}
			});
		}
		else if (numClean == 4) {
			$.ajax({
	  		url: "http://localhost:8080/FROST-Server/v1.0/Locations",
	  		type: "DELETE",
			  contentType: "application/json; charset=utf-8",
			  success: function(data){
			    console.log(data);
					cleanOrNot(5);
			  },
			  error: function(response, status){
			    console.log(response);
			    console.log(status);
	  		}
			});
		}
		else if (numClean == 5) {
			$.ajax({
	  		url: "http://localhost:8080/FROST-Server/v1.0/ObservedProperties",
	  		type: "DELETE",
			  contentType: "application/json; charset=utf-8",
			  success: function(data){
			    console.log(data);
					cleanOrNot(6);
			  },
			  error: function(response, status){
			    console.log(response);
			    console.log(status);
	  		}
			});
		}
		else{
			$.ajax({
	  		url: "http://localhost:8080/FROST-Server/v1.0/Sensors",
	  		type: "DELETE",
			  contentType: "application/json; charset=utf-8",
			  success: function(data){
			    console.log(data);
					csvParse();
			  },
			  error: function(response, status){
			    console.log(response);
			    console.log(status);
	  		}
			});
		}
	}

	else {
		csvParse();
	}
}


function csvParse() {

	var config = buildConfig();
	var parse = $('#files').parse({
				config : config,
				before: function(file, inputElem)
				{
					start = now();
					console.log("Parsing file...", file);
				},
				error: function(err, file)
				{
					console.log("ERROR:", err, file);
					firstError = firstError || err;
					errorCount++;
				},
				complete: function()
				{
					end = now();
					console.log("CSV to JSON fini.");
					toFROST(csvInJson,0);
				}
			});
}

function toFROST(csv,i){

		console.log(csv[1]);
		var obj = csv[i];
		console.log(obj);

		var json = JSON.stringify({
	    "name": obj.Station,
	    "description": "",
	    "properties": {
	      "Deployment Condition": "",
	      "Case Used": ""
	    },

			// Création du lien entre le thing et sa location :
	    "Locations": [{
	      "name": obj.Station,
	      "description": "",
	      "encodingType": "",
	      "location": '' +obj.lat+ ',' +obj.long //{
	        //"type": "Point",
	        //"coordinates": [obj.lat, obj.long]
	      //}
	    }],

			// Pour lier le thing a une location déjà existante :
			//  "Locations": [
	    // {"@iot.id":1} ]

			"Datastreams": [{
	    "name": obj.Polluant,
	    "description": "",
	    "observationType": "",
	    "unitOfMeasurement": {
	      "name": obj.Mesure,
	      "symbol": obj.Unité,
	      "definition": ""
	    },

	    "ObservedProperty": {
	      "name": obj.Polluant,
	      "description": "",
	      "definition": ""
	    },

	    "Sensor": {
	      "name": obj.Mesure,
	      "description": "",
	      "encodingType": "",
	      "metadata": ""
	    }
			}

	  ]
	  });

		$.ajax({
	    url: "http://localhost:8080/FROST-Server/v1.0/Things",
	    type: "POST",
	    data: json,
	    contentType: "application/json; charset=utf-8",
	    success: function(data){
	        console.log("reussite");
					locationToFROST(csv,i,6);
	    },
	    error: function(response, status){
	        console.log(response);
	        console.log(status);
	    }
	});

}

function locationToFROST(listObj,i,j){

	var obj = listObj[i]
	var id_datastream = 0;

	$.get("http://localhost:8080/FROST-Server/v1.0/Datastreams", function(response, status) {
	  id_datastream = response.value[response.value.length-1]["@iot.id"] ;

		console.log("id_datastream = " + id_datastream);

		k = j
		l = 0
		for (var prop in obj) {
			if (l<k){
				l=l+1;
			}
			else if (l==k) {
				console.log("coucouc " + l );
				l = l+1;
				var json = JSON.stringify({
				  "resultTime": "2017-02-07T18:02:00.000Z",
				  "result": obj[prop],
					"Datastream": {
				    "@iot.id": id_datastream
				  },

					"FeatureOfInterest": {
						"feature" : "",
			      "name": obj.Mesure,
						"description" : "",
						"encodingType" : ""
			    }
				});

				$.ajax({
				  url: "http://localhost:8080/FROST-Server/v1.0/Observations",
				  type: "POST",
				  data: json,
				  contentType: "application/json; charset=utf-8",
				  success: function(data) {
						if (j == 35) {
							toFROST(listObj,i+1);
						}
						else {
							j = j+1;
							console.log("i = " + i);
							console.log("j = " + j);
							locationToFROST(listObj,i,j);
						}

				  },
				  error: function(response, status) {
				    console.log(response);
				    console.log(status);
				  }
				});
			}
		}
	});
}

function buildConfig()
{
	return {
		delimiter: $('#delimiter').val(),
		header: true,
		dynamicTyping: $('#dynamicTyping').prop('checked'),
		skipEmptyLines: $('#skipEmptyLines').prop('checked'),
		preview: parseInt($('#preview').val() || 0),
		step: $('#stream').prop('checked') ? stepFn : undefined,
		encoding: $('#encoding').val(),
		worker: $('#worker').prop('checked'),
		comments: $('#comments').val(),
		complete: completeFn,
		error: errorFn,
		download: inputType == "remote"
	};
}

function now()
{
	return typeof window.performance !== 'undefined'
			? window.performance.now()
			: 0;
}

function completeFn(results)
{
	end = now();

	if (results && results.errors)
	{
		if (results.errors)
		{
			errorCount = results.errors.length;
			firstError = results.errors[0];
		}
		if (results.data && results.data.length > 0)
			rowCount = results.data.length;
	}

	printStats("Parse complete");
	console.log("    Results:", results);
	csvInJson = results.data;

	// icky hack
	setTimeout(enableButton, 100);
}

function errorFn(err, file)
{
	end = now();
	console.log("ERROR:", err, file);
	enableButton();
}

function enableButton()
{
	$('#submit').prop('disabled', false);
}

function printStats(msg)
{
	if (msg)
		console.log(msg);
	console.log("       Time:", (end-start || "(Unknown; your browser does not support the Performance API)"), "ms");
	console.log("  Row count:", rowCount);
	if (stepped)
		console.log("    Stepped:", stepped);
	console.log("     Errors:", errorCount);
	if (errorCount)
		console.log("First error:", firstError);
}
