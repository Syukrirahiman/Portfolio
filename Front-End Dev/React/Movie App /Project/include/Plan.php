<?php

class Plan {
    // property declaration
    public $showtime;
    public $id;   
    public $cinema;
    public $movie;
    public $counter;
    
    public function __construct($showtime='', $id='', $cinema='', $movie='', $counter='') {
        $this->showtime = $showtime;
        $this->id = $id;
        $this->cinema = $cinema;
        $this->movie = $movie;
        $this->counter = $counter;
    }
    
}

?>