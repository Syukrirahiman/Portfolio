<?php

class PlanDAO {

    public  function retrieveAll() {
        $sql = 'SELECT * FROM plan';
        
            
        $connMgr = new ConnectionManager();      
        $conn = $connMgr->getConnection();

        $stmt = $conn->prepare($sql);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $stmt->execute();

        $result = array();

        while($row = $stmt->fetch()) {
            $result[] = new Plan($row['showtime'], $row['id'],$row['cinema'], $row['movie'], $row['counter']);
        }
            
                 
        return $result;
    }
  
    public function retrieveByShowtimeId($showtime, $id) {
        $sql = 'select showtime, id, cinema, movie, counter from plan where id=:id and showtime=:showtime';
        $result = array();
        
        $connMgr = new ConnectionManager();
        $conn = $connMgr->getConnection();
        
        $stmt = $conn->prepare($sql);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $stmt->bindParam(':showtime', $showtime, PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        if($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $result = new Plan($row['showtime'], $row['id'], $row['cinema'],$row['movie'],$row['counter']);
        }
        
        return $result;
    }

    public function retrieveById($id) {
        $sql = 'select showtime, id, cinema, movie, counter from plan where id=:id';
        $result = array();
        
        $connMgr = new ConnectionManager();
        $conn = $connMgr->getConnection();
        
        $stmt = $conn->prepare($sql);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        
        $result = array();

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $result[] = new Plan($row['showtime'], $row['id'], $row['cinema'],$row['movie'],$row['counter']);
        }
        
        return $result;
    }


    public function getlatest() {
        $sql = 'select max(id) from plan';
        $connMgr = new ConnectionManager();
        $conn = $connMgr->getConnection();

        $stmt = $conn->prepare($sql);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $stmt->execute();

        $result = null;

        if($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $result = $row['max(id)'];
        }
        
        return $result;

        
    }
  
  
    public function add($plan) {
        $sql = 'insert into plan (showtime, id,  cinema, movie, counter) values (:showtime, :id, :cinema, :movie, :counter)';
        
        $connMgr = new ConnectionManager();       
        $conn = $connMgr->getConnection();
         
        $stmt = $conn->prepare($sql); 

        $stmt->bindParam(':showtime', $plan->showtime, PDO::PARAM_STR);
        $stmt->bindParam(':id', $plan->id, PDO::PARAM_INT);
        $stmt->bindParam(':cinema', $plan->cinema, PDO::PARAM_STR);
        $stmt->bindParam(':movie', $plan->movie, PDO::PARAM_STR);
        $stmt->bindParam(':counter', $plan->counter, PDO::PARAM_INT);
        
        $isAddOK = False;
        if ($stmt->execute()) {
            $isAddOK = True;
        }

        return $isAddOK;
    }
    
    public function modifyCounter($plan) {
        $sql = 'update plan set counter=:counter where id=:id and showtime=:showtime';      
        
        $connMgr = new ConnectionManager();           
        $conn = $connMgr->getConnection();
         
        $stmt = $conn->prepare($sql);
       
        $stmt->bindParam(':showtime', $plan->showtime, PDO::PARAM_STR);
        $stmt->bindParam(':id', $plan->id, PDO::PARAM_INT);
        $stmt->bindParam(':counter', $plan->counter, PDO::PARAM_INT);
        
        $stmt->execute();
        
    }
    
        
    public function remove($id, $showtime) {
        $sql = 'delete from plan where id=:id and $showtime=:showtime';
        
        $connMgr = new ConnectionManager();
        $conn = $connMgr->getConnection();
        
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':showtime', $showtime, PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        
        $stmt->execute();
        $count = $stmt->rowCount();
    }


  

    // public function search($keyword,$search,$from,$to) {
    //     $sql = "SELECT * FROM book where title LIKE :keyword AND $search >= :a AND $search <= :b";
    //     $connMgr = new ConnectionManager();
    //     $conn = $connMgr->getConnection();
    //     $keyword = '%'.$keyword.'%';
    //     $stmt = $conn->prepare($sql);
    //     $stmt->bindParam(':keyword', $keyword, PDO::PARAM_STR);
    //     $stmt->bindParam(':a', $from, PDO::PARAM_STR);
    //     $stmt->bindParam(':b', $to, PDO::PARAM_STR);
    //     $stmt->execute();
    //     while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    //         $result[] = new Book($row['title'], $row['isbn13'], $row['price'],$row['availability']);
    //     }
    //     return $result;
    // }
}


?>