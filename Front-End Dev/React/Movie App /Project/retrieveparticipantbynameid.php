<?php
require_once 'include/common.php';


$dao = new ParticipantDAO();

// $planid = 5;
// $name = "Mary";
$planid = $_GET['planid'];
$name = $_GET['name'];

$process_id = substr($planid, 1,strlen($planid));
$process_id = (int) $process_id;

$participant = $dao->retrieve($name, $process_id);

$participant = json_encode($participant);

echo $participant;
?>