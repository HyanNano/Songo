<?php

/*     
    $coteJoueur1 = array_push($_POST["coteJoueur1[0]"]);
    $coteJoueur1 = array_push($_POST["coteJoueur1[1]"]);
    $coteJoueur1 = array_push($_POST["coteJoueur1[2]"]);
    $coteJoueur1 = array_push($_POST["coteJoueur1[3]"]);
    $coteJoueur1 = array_push($_POST["coteJoueur1[4]"]);
    $coteJoueur1 = array_push($_POST["coteJoueur1[5]"]);
    $coteJoueur1 = array_push($_POST["coteJoueur1[6]"]);

    $coteJoueur2 = array_push($_POST["coteJoueur2[0]"]);
    $coteJoueur2 = array_push($_POST["coteJoueur2[1]"]);
    $coteJoueur2 = array_push($_POST["coteJoueur2[2]"]);
    $coteJoueur2 = array_push($_POST["coteJoueur2[3]"]);
    $coteJoueur2 = array_push($_POST["coteJoueur2[4]"]);
    $coteJoueur2 = array_push($_POST["coteJoueur2[5]"]);
    $coteJoueur2 = array_push($_POST["coteJoueur2[6]"]);

    $pointJoueur1 = $_POST["pointJoueur1"];

    $pointJoueur2 = $_POST["pointJoueur2"];
*/

    $t1 = $_POST["coteJoueur1"];
    $t2 = $_POST["coteJoueur2"];

    $coteJoueur1 = explode('|',$t1);
    $coteJoueur2 = explode('|',$t2);

    $pointJoueur1 = $_POST["pointJoueur1"];
    $pointJoueur2 = $_POST["pointJoueur2"];
   

    $donnees = array("coteJoueur1" => $coteJoueur1, "coteJoueur2" => $coteJoueur2, "pointJoueur1" => $pointJoueur1, "pointJoueur2" => $pointJoueur2 );

    $data = json_encode($donnees);

    /* $json = fopen('my_data.json',"w");
    fwrite($json,$data); */

    file_put_contents('my_data.json',$data);// Aiming to overwrite the file
    
    echo $data;
?>