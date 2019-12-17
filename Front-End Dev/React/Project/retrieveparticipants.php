<?php
require_once 'include/common.php';


$dao = new ParticipantDAO();

// $planid = 8;
$planid = $_GET['planid'];

$process_id = substr($planid, 1,strlen($planid));
$process_id = (int) $process_id;

// echo $process_id;

// $id = 3;

$participants = $dao->retrieveByPlanId($process_id);

$participants = json_encode($participants);

echo $participants;
?>