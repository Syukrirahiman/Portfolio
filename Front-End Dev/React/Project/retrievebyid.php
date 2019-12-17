<?php

///start here again

require_once 'include/common.php';


$dao = new PlanDAO();

// $id = "P000039";
$id= $_GET['planid'];

$process_id = substr($id, 1,strlen($id));
$process_id = (int) $process_id;

// echo $process_id;

// $id = 3;

$result = $dao->retrieveById($process_id);

echo json_encode($result);
?>