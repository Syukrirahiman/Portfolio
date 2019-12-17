<?php

require_once 'include/common.php';



$dao = new PlanDAO();


$showtimes = $_GET['showtimes'];
$movie = $_GET['movieTitle'];
$movie = urldecode($movie);

$cinema = $_GET['cinema'];
$cinema = urldecode($cinema);

$latest_id = (int) $dao->getLatest();
$id = $latest_id + 1;


// var_dump($latest_id);
// echo $id;

// $try = $dao->retrieveAll();
// var_dump($try);


for($i=0; $i<sizeof($showtimes); $i++){
    $plan = new Plan();
    // echo $showtimes[$i];

    $plan->showtime = preg_replace('/\s+/', '+', $showtimes[$i]); 
    $plan->id = $id;
    $plan->cinema = $cinema;
    $plan->movie = $movie;
    $plan->counter = 0;
    // var_dump($plan);
    $dao->add($plan);

}

$max_length = 6;
$lengthof0 = $max_length - strlen($id);


for($i=0; $i< $lengthof0; $i++){
    $id = "0" . $id;
}

$id = "P" . $id;


echo $id;
?>