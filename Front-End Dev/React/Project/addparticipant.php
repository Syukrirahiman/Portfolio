<?php

require_once 'include/common.php';


$dao = new ParticipantDAO();

// $planid = 2;
// $name = "gg@gmail.com";

$planid = $_GET['planid'];
$name = $_GET['name'];

$process_id = substr($planid, 1,strlen($planid));
$process_id = (int) $process_id;

$participant = new Participant();

$participant->planid =$process_id;
$participant->name = $name;
$participant->showtimeVoted = null;

if($dao->retrieve($name,$process_id) == null){
    $dao->create($participant);
    $participant = json_encode($participant);
}else{
    $participant = json_encode($dao->retrieve($name,$process_id));
}



echo $participant;

?>