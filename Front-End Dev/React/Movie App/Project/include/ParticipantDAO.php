<?php
class ParticipantDAO {
    
    public  function retrieve($name, $planid) {
        $sql = 'select name, planid, showtimeVoted from participants where name=:name and planid=:planid';
        
        $connMgr = new ConnectionManager();
        $conn = $connMgr->getConnection();
        
            
        $stmt = $conn->prepare($sql);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':planid', $planid, PDO::PARAM_INT);
        $stmt->execute();
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            return new Participant($row['name'], $row['planid'],$row['showtimeVoted']);
        }

        return null;
    }

    public  function retrieveByPlanId($planid) {
        $sql = 'select name, planid, showtimeVoted from participants where planid=:planid';
        
        $connMgr = new ConnectionManager();
        $conn = $connMgr->getConnection();
        
            
        $stmt = $conn->prepare($sql);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $stmt->bindParam(':planid', $planid, PDO::PARAM_INT);
        $stmt->execute();

        $result = array();

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $result[] = new Participant($row['name'], $row['planid'],$row['showtimeVoted']);
        }

        return $result;
    }
    public  function retrieveAll() {
        $sql = 'select * from participants';
        
        $connMgr = new ConnectionManager();      
        $conn = $connMgr->getConnection();
        $stmt = $conn->prepare($sql);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $stmt->execute();
        $result = array();
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $result[] = new Participant($row['name'], $row['planid'],$row['showtimeVoted']);
        }
        return $result;
    }

    public function create($participant) {
        $sql = "INSERT IGNORE INTO participants (name, planid, showtimeVoted) VALUES (:name, :planid, :showtimeVoted)";
        $connMgr = new ConnectionManager();      
        $conn = $connMgr->getConnection();
        $stmt = $conn->prepare($sql);
        
        $stmt->bindParam(':name', $participant->name, PDO::PARAM_STR);
        $stmt->bindParam(':planid', $participant->planid, PDO::PARAM_INT);
        $stmt->bindParam(':showtimeVoted', $participant->showtimeVoted, PDO::PARAM_STR);
      
        $isAddOK = False;
        if ($stmt->execute()) {
            $isAddOK = True;
        }
        return $isAddOK;
    }

     public function updateVoted($participant) {
        $sql = 'UPDATE participants SET showtimeVoted=:showtimeVoted WHERE name=:name and planid=:planid';      
        
        $connMgr = new ConnectionManager();           
        $conn = $connMgr->getConnection();
        $stmt = $conn->prepare($sql);
    
        $stmt->bindParam(':showtimeVoted', $participant->showtimeVoted, PDO::PARAM_STR);
        $stmt->bindParam(':name', $participant->name, PDO::PARAM_STR);
        $stmt->bindParam(':planid', $participant->planid, PDO::PARAM_INT);
    
        $isUpdateOk = False;
        if ($stmt->execute()) {
            $isUpdateOk = True;
        }
        return $isUpdateOk;
    }
}