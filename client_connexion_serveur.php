<?php
	$link = mysqli_connect('localhost', 'root', 'root', 'DataViz');
	mysqli_set_charset($link, "utf8");
	

	if (!$link) {
		die('Erreur de connexion');
	} else {


	}
	
	if (isset($_GET['id'])) {

	}

	if($id="afficher"){
		$r = "SELECT latitude_school, longitude_school, latitude_prof, longitude_prof  FROM Etablissements";
	// solution préconisee: extraire des tableaux associatifs.
		if ($result = mysqli_query($link, $r)) {
 			while ($ligne = mysqli_fetch_assoc($result)) {
    // $ligne est un tableau associatif
	// contient par exemple $ligne["id"], $ligne["nom"], etc.
				$objets[] = $ligne;

		}  echo json_encode($objets,JSON_NUMERIC_CHECK);


		}

	}

?>
