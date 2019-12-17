<?php

class Participant {
    // property declaration
    public $name;
    public $planid;
    public $showtimeVoted;
    
    public function __construct($name='', $planid='', $showtimeVoted= '') {
        $this->name = $name;
        $this->planid = $planid;
        $this->showtimeVoted = $showtimeVoted;

    }
    
}

?>