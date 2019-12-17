<?php

require_once 'include/common.php';


$dao = new ParticipantDAO();
$dao2 = new PlanDao();

// $planid = 6;
// $name = "syukrirahiman@gmail.com";
// $selectedShowtime = "2019-11-04T16:25:00+08:00";

$planid = $_GET['planid'];
$name = $_GET['name'];
$selectedShowtime = urldecode($_GET['selectedShowtime']);
$selectedShowtime = preg_replace('/\s+/', '+', $selectedShowtime); 

$process_id = substr($planid, 1,strlen($planid));
$process_id = (int) $process_id;

$participant = new Participant();

$participant->planid =$process_id;
$participant->name = $name;
$participant->showtimeVoted = $selectedShowtime;

//check if participant has alr voted before
$existing_participant = $dao->retrieve($name, $process_id);

//decrease vote if exist
if($existing_participant != null){
    $oldShowtimeVoted = $existing_participant->showtimeVoted;
    $plan = $dao2->retrieveByShowtimeId($oldShowtimeVoted, $process_id);
    $plan->counter -= 1;
    $dao2->modifyCounter($plan);
}

$dao->updateVoted($participant);

//update plan dao with new showtime vote
$plan = new Plan();



$plan = $dao2->retrieveByShowtimeId($selectedShowtime, $process_id);
$plan->counter += 1;
$dao2->modifyCounter($plan);


echo json_encode($participant);

?>
